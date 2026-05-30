import { linkify } from "./linkify";

const SECTION_HEADINGS = [
  "summary", "profile", "objective", "about",
  "experience", "work experience", "professional experience", "employment", "employment history",
  "education", "academic", "qualifications",
  "skills", "technical skills", "core skills", "competencies",
  "projects", "personal projects",
  "certifications", "certificates", "licenses",
  "languages",
  "awards", "achievements", "honors",
  "publications",
  "volunteer", "volunteering",
  "interests", "hobbies",
  "references",
  "contact", "contact information", "personal details",
];

const HEADING_RE = new RegExp(
  `^\\s*(${SECTION_HEADINGS.map((h) => h.replace(/\s/g, "\\s")).join("|")})\\s*:?\\s*$`,
  "i",
);

type Section = { title: string; body: string };

function splitSections(text: string): { header: string; sections: Section[] } {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;
  let headerLines: string[] = [];
  let seenAny = false;

  const isHeading = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 60) return false;
    if (HEADING_RE.test(trimmed)) return true;
    // ALL CAPS short line = heading
    const letters = trimmed.replace(/[^a-zA-Z]/g, "");
    if (letters.length >= 3 && letters === letters.toUpperCase() && trimmed.split(/\s+/).length <= 5) {
      return true;
    }
    return false;
  };

  for (const line of lines) {
    if (isHeading(line)) {
      if (current) sections.push(current);
      current = { title: line.trim().replace(/:$/, ""), body: "" };
      seenAny = true;
    } else if (!seenAny) {
      headerLines.push(line);
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) sections.push(current);

  return {
    header: headerLines.join("\n").trim(),
    sections: sections
      .map((s) => ({ ...s, body: s.body.trim() }))
      .filter((s) => s.body.length > 0 || s.title.length > 0),
  };
}

function renderBody(body: string) {
  // Split into bullet-style lines if many begin with • - *
  const lines = body.split("\n");
  const bulletCount = lines.filter((l) => /^\s*[•\-*·]\s+/.test(l)).length;
  if (bulletCount >= 2 && bulletCount / lines.filter((l) => l.trim()).length > 0.4) {
    const items: string[] = [];
    let buf = "";
    for (const l of lines) {
      if (/^\s*[•\-*·]\s+/.test(l)) {
        if (buf) items.push(buf);
        buf = l.replace(/^\s*[•\-*·]\s+/, "");
      } else if (l.trim()) {
        buf += (buf ? " " : "") + l.trim();
      } else if (buf) {
        items.push(buf);
        buf = "";
      }
    }
    if (buf) items.push(buf);
    return (
      <ul className="ml-4 list-disc space-y-1.5 text-sm leading-relaxed text-foreground/90 marker:text-gold/70">
        {items.map((it, i) => (
          <li key={i}>{linkify(it)}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
      {linkify(body)}
    </div>
  );
}

export function ParsedCvView({ text, fallbackName, fallbackEmail }: { text: string; fallbackName?: string; fallbackEmail?: string }) {
  const { header, sections } = splitSections(text);

  return (
    <div className="mx-auto max-w-3xl bg-background/40 px-8 py-10">
      <header className="mb-8 border-b border-border/60 pb-6">
        {fallbackName ? (
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{fallbackName}</h1>
        ) : null}
        {header ? (
          <div className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
            {linkify(header)}
          </div>
        ) : fallbackEmail ? (
          <p className="mt-2 text-xs text-muted-foreground">{fallbackEmail}</p>
        ) : null}
      </header>

      {sections.length === 0 ? (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{linkify(text)}</div>
      ) : (
        <div className="space-y-7">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                {s.title}
              </h2>
              <div className="border-l border-border/40 pl-4">{renderBody(s.body)}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
