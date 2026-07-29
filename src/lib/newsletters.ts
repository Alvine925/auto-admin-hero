// Newsletter content + email HTML renderer.
// Design: no cards, no boxes — a hero image, then type sitting directly on the
// email background, with a single accent-underlined action link.

export const NEWSLETTER_SENDER = "noreply@tellusjobs.site";
export const APP_DOMAIN = "https://myjobs.tellusjobs.site";

export type NewsletterBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface Newsletter {
  id: string;
  title: string;
  subject: string;
  preheader: string;
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  headline: string;
  blocks: NewsletterBlock[];
  ctaLabel: string;
  ctaPath: string;
}

export const NEWSLETTERS: Newsletter[] = [
  {
    id: "welcome-to-tellus",
    title: "Welcome to Tellus Jobs",
    subject: "Welcome to Tellus Jobs — your job search just got lighter",
    preheader: "One profile, one CV, and thousands of live openings matched to you.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A team collaborating around a table",
    eyebrow: "Welcome aboard",
    headline: "Your job search, finally organised",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, thanks for joining Tellus Jobs. We built this platform for one reason: applying for work should not feel like a second job.",
      },
      {
        type: "paragraph",
        text: "Upload your CV once and we read it, understand your experience, and start surfacing roles that genuinely fit — pulled fresh every day from Kenya's biggest job boards and company career pages.",
      },
      { type: "heading", text: "What you can do today" },
      {
        type: "list",
        items: [
          "Upload your CV and let us build your professional profile automatically",
          "Browse a live marketplace of openings matched to your experience and county",
          "Save the roles you like and track every application in one place",
        ],
      },
      {
        type: "paragraph",
        text: "Take two minutes to finish your profile — the more we know, the sharper your matches become.",
      },
    ],
    ctaLabel: "Complete your profile",
    ctaPath: "/dashboard",
  },
  {
    id: "how-tellus-works",
    title: "How Tellus Jobs works",
    subject: "From CV to application in minutes — here's how Tellus works",
    preheader: "Matching, tailored cover letters, auto-apply and interview prep, explained.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person planning work on a desk",
    eyebrow: "How it works",
    headline: "Four steps between you and your next role",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, here is the short version of what happens behind the scenes when you use Tellus Jobs.",
      },
      { type: "heading", text: "1. We read your CV" },
      {
        type: "paragraph",
        text: "Your CV is parsed into skills, roles, industries and seniority — the foundation of every match we make for you.",
      },
      { type: "heading", text: "2. We scan the market for you" },
      {
        type: "paragraph",
        text: "Every day we collect new openings from multiple job boards and career pages, remove duplicates, and score them against your profile.",
      },
      { type: "heading", text: "3. We write the application" },
      {
        type: "paragraph",
        text: "For any role you pick, Tellus drafts a tailored cover letter and application email that reference the actual job description — never a generic template.",
      },
      { type: "heading", text: "4. We help you prepare" },
      {
        type: "paragraph",
        text: "Practise with role-specific interview questions, get feedback on your answers, and chat with the AI job coach whenever you are stuck.",
      },
    ],
    ctaLabel: "See your matches",
    ctaPath: "/jobs",
  },
  {
    id: "get-more-out-of-tellus",
    title: "Get more out of Tellus Jobs",
    subject: "5 things most people miss on Tellus Jobs",
    preheader: "Auto-apply, job monitors, referrals and the AI coach — the features worth using.",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two people shaking hands after an interview",
    eyebrow: "Tips",
    headline: "Five features worth switching on",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, you are already searching and applying. These are the features that quietly do the heavy lifting.",
      },
      { type: "heading", text: "Job monitors" },
      {
        type: "paragraph",
        text: "Tell us the roles and locations you care about and we will watch for them around the clock, alerting you the moment something new lands.",
      },
      { type: "heading", text: "Auto-apply" },
      {
        type: "paragraph",
        text: "Approve a workflow once and Tellus submits tailored applications on your behalf, logging every send so nothing is lost.",
      },
      { type: "heading", text: "The AI job coach" },
      {
        type: "paragraph",
        text: "Ask about salary expectations, career changes or how to explain a gap — it answers with your CV in context.",
      },
      { type: "heading", text: "Interview practice" },
      {
        type: "paragraph",
        text: "Rehearse likely questions for a specific role and get written feedback on what to tighten.",
      },
      { type: "heading", text: "Refer a friend" },
      {
        type: "paragraph",
        text: "Invite ten friends who verify their email and your account is upgraded for a month — every ten after that adds another month.",
      },
    ],
    ctaLabel: "Open your dashboard",
    ctaPath: "/dashboard",
  },
];

export function getNewsletter(id: string) {
  return NEWSLETTERS.find((n) => n.id === id);
}

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

// Keep the merge tag intact so the edge function can personalise it.
const escKeepTags = (s: string) => esc(s).replaceAll("{{FIRST_NAME}}", "{{FIRST_NAME}}");

export function renderNewsletterHtml(n: Newsletter): string {
  const bg = "#faf9f5";
  const ink = "#132a22";
  const soft = "#4c6259";
  const accent = "#1d5c46";

  const blocks = n.blocks
    .map((b) => {
      if (b.type === "heading") {
        return `<h2 style="margin:34px 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.35;font-weight:600;color:${ink};">${escKeepTags(b.text)}</h2>`;
      }
      if (b.type === "list") {
        const items = b.items
          .map(
            (i) =>
              `<li style="margin:0 0 10px;padding:0;font-size:16px;line-height:1.7;color:${soft};">${escKeepTags(i)}</li>`,
          )
          .join("");
        return `<ul style="margin:16px 0 0;padding:0 0 0 20px;">${items}</ul>`;
      }
      return `<p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:${soft};">${escKeepTags(b.text)}</p>`;
    })
    .join("");

  const ctaUrl = `${APP_DOMAIN}${n.ctaPath}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(n.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${bg};">${esc(n.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};">
  <tr>
    <td align="center" style="padding:40px 20px 56px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <tr>
          <td style="padding-bottom:28px;font-family:Georgia,'Times New Roman',serif;font-size:17px;letter-spacing:0.02em;color:${accent};">
            Tellus&nbsp;Jobs
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:30px;">
            <img src="${esc(n.heroImage)}" alt="${esc(n.heroAlt)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;" />
          </td>
        </tr>
        <tr>
          <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${accent};margin-bottom:12px;">${esc(n.eyebrow)}</div>
            <h1 style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.25;font-weight:600;color:${ink};">${esc(n.headline)}</h1>
            ${blocks}
            <div style="margin:38px 0 0;">
              <a href="${esc(ctaUrl)}" style="font-size:16px;font-weight:600;color:${accent};text-decoration:none;border-bottom:2px solid ${accent};padding-bottom:4px;">${esc(n.ctaLabel)} &rarr;</a>
            </div>
            <div style="margin:48px 0 0;font-size:13px;line-height:1.7;color:#8b9a93;">
              You are receiving this because you have a Tellus Jobs account.<br />
              <a href="${esc(APP_DOMAIN)}" style="color:#8b9a93;text-decoration:underline;">myjobs.tellusjobs.site</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
