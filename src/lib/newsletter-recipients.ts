/** Max recipients per single server call. */
export const MAX_NEWSLETTER_RECIPIENTS = 100;
/** Max recipients for one bulk send (sent in batches of MAX_NEWSLETTER_RECIPIENTS). */
export const MAX_BULK_RECIPIENTS = 2000;
export const DEFAULT_RECIPIENT_NAME = "There";

export type BulkNewsletterRecipient = {
  id: string;
  email: string;
  name: string;
};

export type BulkNewsletterRecipientParseResult = {
  recipients: BulkNewsletterRecipient[];
  errors: string[];
  entryCount: number;
};

const EMAIL_RE = /[^\s,;|<>"']+@[^\s,;|<>"']+\.[^\s,;|<>"']+/g;
const VALID_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Accepts "Name, email", "Name <email>", tab rows, or raw emails separated by
 * spaces/commas/newlines. Missing names default to "There". Output is
 * de-duplicated and sorted by email.
 */
export function parseBulkNewsletterRecipients(value: string): BulkNewsletterRecipientParseResult {
  const lines = value
    .split(/\r?\n/)
    .map((text, index) => ({ text: text.trim(), number: index + 1 }))
    .filter((line) => line.text.length > 0);
  const errors: string[] = [];
  const byEmail = new Map<string, BulkNewsletterRecipient>();
  let duplicates = 0;

  const add = (email: string, name: string, lineNo: number) => {
    const clean = email.replace(/[.,;]+$/, "");
    if (clean.length > 255 || !VALID_RE.test(clean)) {
      errors.push(`Line ${lineNo}: "${clean.slice(0, 60)}" is not a valid email.`);
      return;
    }
    const key = clean.toLowerCase();
    if (byEmail.has(key)) {
      duplicates += 1;
      return;
    }
    byEmail.set(key, { id: "", email: key, name: name.slice(0, 100) || DEFAULT_RECIPIENT_NAME });
  };

  for (const line of lines) {
    const matches = [...line.text.matchAll(EMAIL_RE)];
    if (matches.length === 0) {
      errors.push(`Line ${line.number}: no email address found.`);
      continue;
    }
    if (matches.length === 1) {
      const m = matches[0];
      const name = line.text
        .slice(0, m.index)
        .replace(/^[\s"'|<]+|[\s,"'|;><\t]+$/g, "")
        .trim();
      add(m[0], name, line.number);
    } else {
      for (const m of matches) add(m[0], "", line.number);
    }
  }

  const recipients = [...byEmail.values()].sort((a, b) => a.email.localeCompare(b.email));
  if (recipients.length > MAX_BULK_RECIPIENTS) {
    errors.push(
      `This list has ${recipients.length} recipients. Bulk sends are limited to ${MAX_BULK_RECIPIENTS}.`,
    );
  }
  void duplicates;
  return { recipients, errors, entryCount: recipients.length };
}
