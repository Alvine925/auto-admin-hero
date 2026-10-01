export const MAX_NEWSLETTER_RECIPIENTS = 100;

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

export function parseBulkNewsletterRecipients(value: string): BulkNewsletterRecipientParseResult {
  const lines = value
    .split(/\r?\n/)
    .map((text, index) => ({ text: text.trim(), number: index + 1 }))
    .filter((line) => line.text.length > 0);
  const errors: string[] = [];
  const recipients: BulkNewsletterRecipient[] = [];
  const seenEmails = new Set<string>();

  if (lines.length > MAX_NEWSLETTER_RECIPIENTS) {
    errors.push(
      `This list has ${lines.length} recipients. A send is limited to ${MAX_NEWSLETTER_RECIPIENTS}; remove ${lines.length - MAX_NEWSLETTER_RECIPIENTS}.`,
    );
  }

  for (const line of lines.slice(0, MAX_NEWSLETTER_RECIPIENTS)) {
    const emailMatches = [...line.text.matchAll(/[^\s,;|<>]+@[^\s,;|<>]+\.[^\s,;|<>]+/g)];
    if (emailMatches.length !== 1) {
      errors.push(`Line ${line.number}: enter one name and one valid email address.`);
      continue;
    }

    const match = emailMatches[0];
    const email = match[0].replace(/[.,;]+$/, "");
    const name = line.text
      .slice(0, match.index)
      .replace(/^[\s"'|<]+|[\s,"'|;><]+$/g, "")
      .trim();

    if (!name || name.length > 100) {
      errors.push(`Line ${line.number}: enter a name of 1–100 characters before the email.`);
      continue;
    }
    if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(`Line ${line.number}: enter a valid email address (up to 255 characters).`);
      continue;
    }

    const normalizedEmail = email.toLowerCase();
    if (seenEmails.has(normalizedEmail)) {
      errors.push(`Line ${line.number}: ${email} is listed more than once.`);
      continue;
    }

    seenEmails.add(normalizedEmail);
    recipients.push({ id: "", email, name });
  }

  return { recipients, errors, entryCount: lines.length };
}
