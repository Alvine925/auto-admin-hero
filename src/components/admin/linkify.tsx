import React from "react";

const URL_RE = /(https?:\/\/[^\s<]+)/gi;
const EMAIL_RE = /([^\s@]+@[^\s@]+\.[^\s@]+)/gi;

export function linkify(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(`${URL_RE.source}|${EMAIL_RE.source}`, "gi");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const val = match[0];
    if (val.startsWith("http")) {
      parts.push(
        <a key={match.index} href={val} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
          {val}
        </a>,
      );
    } else {
      parts.push(
        <a key={match.index} href={`mailto:${val}`} className="text-primary underline underline-offset-2 hover:text-primary/80">
          {val}
        </a>,
      );
    }
    lastIndex = match.index + val.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
