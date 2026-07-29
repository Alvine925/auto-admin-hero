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
  // ── 1. Welcome ────────────────────────────────────────────────────────────
  {
    id: "welcome-to-tellus",
    title: "Welcome to Tellus Jobs",
    subject: "Welcome to Tellus Jobs — your job search just got a whole lot lighter",
    preheader: "One profile, one CV, and thousands of live openings matched directly to you.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A team collaborating around a bright office table",
    eyebrow: "Welcome aboard",
    headline: "Your job search, finally organised",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, thank you for joining Tellus Jobs. We built this platform because applying for work should not feel like a second job. We wanted something smarter, faster, and genuinely useful for job seekers across Kenya.",
      },
      {
        type: "paragraph",
        text: "The moment you upload your CV, our system reads it carefully, understands your experience, and begins surfacing roles that genuinely fit your background. We pull fresh openings every single day from Kenya's biggest job boards, company career pages, and recruitment agencies, then score each one against your profile so the best matches always float to the top.",
      },
      { type: "heading", text: "Here is what you can do right now" },
      {
        type: "list",
        items: [
          "Upload your CV and let Tellus build your full professional profile automatically",
          "Browse a live marketplace of matched openings filtered by your skills, seniority, and county",
          "Save the roles you like and track every single application in one clean dashboard",
          "Set up job monitors so you never miss a new posting in your field",
          "Practice interview questions tailored to any role you are targeting",
        ],
      },
      {
        type: "paragraph",
        text: "The more complete your profile is, the sharper your matches become. It only takes about two minutes to finish the setup, and the difference in match quality is significant. We recommend doing it today while you are still excited about the platform.",
      },
      {
        type: "paragraph",
        text: "If you ever get stuck or have a question, the AI job coach is right inside your dashboard. It knows your CV and can help you think through career decisions, salary questions, or anything else on your mind.",
      },
    ],
    ctaLabel: "Complete your profile",
    ctaPath: "/dashboard",
  },

  // ── 2. How it works ───────────────────────────────────────────────────────
  {
    id: "how-tellus-works",
    title: "How Tellus Jobs works",
    subject: "From CV upload to application sent in minutes — here is exactly how Tellus works",
    preheader: "Matching, tailored cover letters, auto-apply, and interview prep, all explained.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person reviewing a plan at a well-lit desk",
    eyebrow: "How it works",
    headline: "Four steps between you and your next role",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, a lot happens behind the scenes the moment you log in to Tellus Jobs. Here is a plain-English walkthrough of every step so you can get the most out of the platform from day one.",
      },
      { type: "heading", text: "Step 1: We read your CV" },
      {
        type: "paragraph",
        text: "Your CV is not just stored as a file. Our parser breaks it down into skills, job titles, industries, seniority levels, and career timelines. That structured data becomes the foundation of every recommendation we make for you. The better your CV, the better your matches, which is why we give you tools to improve it right inside the platform.",
      },
      { type: "heading", text: "Step 2: We scan the Kenyan job market every day" },
      {
        type: "paragraph",
        text: "Every morning our scrapers collect new openings from multiple job boards and direct company career pages. We remove duplicates, verify that listings are still active, and score each one against your profile. By the time you open the jobs page, the best matches are already waiting at the top.",
      },
      { type: "heading", text: "Step 3: We write the application for you" },
      {
        type: "paragraph",
        text: "For any role you decide to apply to, Tellus drafts a tailored cover letter and application email. It references the actual job description, your specific experience, and the company's requirements. It is never a generic template, and it reads like something you actually wrote. You review it, make any edits you like, then send it directly from the platform.",
      },
      { type: "heading", text: "Step 4: We help you prepare for the interview" },
      {
        type: "paragraph",
        text: "Once you land an interview, Tellus generates role-specific practice questions based on the job description and your background. You answer them in writing, and our AI gives you detailed feedback on what to strengthen, what to cut, and how to frame your experience more compellingly.",
      },
      {
        type: "paragraph",
        text: "Every step is designed to reduce the time and anxiety that typically comes with job hunting. You focus on the decisions; we handle the repetitive work.",
      },
    ],
    ctaLabel: "See your matched jobs",
    ctaPath: "/jobs",
  },

  // ── 3. Tips / hidden features ─────────────────────────────────────────────
  {
    id: "get-more-out-of-tellus",
    title: "Get more out of Tellus Jobs",
    subject: "5 things most Tellus users miss (and how to switch them on today)",
    preheader: "Auto-apply, job monitors, the AI coach, and the referral program, explained.",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two professionals shaking hands after a successful meeting",
    eyebrow: "Pro tips",
    headline: "Five features worth switching on right now",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, most users find the jobs page and the application tracker on day one. That is a great start. But there are five more features that quietly do the heavy lifting once you turn them on.",
      },
      { type: "heading", text: "1. Job monitors" },
      {
        type: "paragraph",
        text: "Tell Tellus the exact roles, keywords, and locations you care about and we will watch for them around the clock. The moment a matching job appears, you get an alert. This is how serious candidates get to opportunities before the crowd does.",
      },
      { type: "heading", text: "2. Auto-apply" },
      {
        type: "paragraph",
        text: "Approve a workflow once and Tellus submits fully tailored applications on your behalf. Every send is logged with the cover letter used, the timestamp, and the outcome. You stay in control without having to do it manually every time.",
      },
      { type: "heading", text: "3. The AI job coach" },
      {
        type: "paragraph",
        text: "This is not a generic chatbot. It has read your CV and knows your history. Ask it about salary expectations for your level, how to explain a career gap, whether a lateral move makes sense, or how to negotiate a counter-offer. The answers are grounded in your actual situation.",
      },
      { type: "heading", text: "4. Interview practice mode" },
      {
        type: "paragraph",
        text: "Pick any job you are targeting, open the practice panel, and Tellus will generate the questions that interviewers at that type of company tend to ask. Write your answers, get written feedback, and iterate until you feel confident.",
      },
      { type: "heading", text: "5. Refer friends and earn free upgrades" },
      {
        type: "paragraph",
        text: "Every friend you refer who signs up and verifies their email earns you a free month of premium features. There is no cap. Share your link from the dashboard, track your referrals in real time, and watch your account grow as your network joins.",
      },
    ],
    ctaLabel: "Open your dashboard",
    ctaPath: "/dashboard",
  },

  // ── 4. Referrals (dedicated) ──────────────────────────────────────────────
  {
    id: "referral-program",
    title: "Refer friends, earn free premium",
    subject: "Share Tellus Jobs with a friend and earn a free month of premium features",
    preheader: "Every friend who joins gives you a free upgrade. No limit, no expiry on earning.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two friends laughing and looking at a phone together",
    eyebrow: "Referral program",
    headline: "Invite a friend. Both of you win.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, we want more people to experience a better way to job search in Kenya. So we built a referral program that rewards you every time you help someone else get started.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "Go to your dashboard and copy your personal referral link",
          "Share it with friends, former colleagues, classmates, or anyone who is job hunting",
          "When they sign up and verify their email using your link, you earn one free month of premium",
          "There is no limit to how many people you can refer or how many months you can earn",
          "Your referral dashboard shows you exactly who has joined and where each person is in the process",
        ],
      },
      { type: "heading", text: "What premium unlocks for you" },
      {
        type: "list",
        items: [
          "Unlimited tailored cover letters and application emails",
          "Auto-apply workflows that run in the background for you",
          "Priority matching so you see new roles before non-premium users",
          "Unlimited interview practice sessions with detailed AI feedback",
          "Access to the full AI job coach with extended conversation memory",
        ],
      },
      {
        type: "paragraph",
        text: "If you know ten people who are currently looking for work, that is potentially ten free months without paying anything. And the people you refer get a better job search experience from day one. Everyone benefits.",
      },
      {
        type: "paragraph",
        text: "Your referral link is waiting in your dashboard right now. It takes thirty seconds to copy and share.",
      },
    ],
    ctaLabel: "Get your referral link",
    ctaPath: "/dashboard",
  },

  // ── 5. CV tips ────────────────────────────────────────────────────────────
  {
    id: "cv-tips",
    title: "Make your CV work harder",
    subject: "6 CV mistakes that cost you interviews (and how to fix them today)",
    preheader: "Most CVs are rejected in under 10 seconds. Here is how to make yours stick.",
    heroImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person reviewing documents at a desk with natural light",
    eyebrow: "CV advice",
    headline: "The six things recruiters look for in the first ten seconds",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, your CV is the first thing a recruiter sees. In most cases they spend under ten seconds deciding whether to read further. Here are the six mistakes that most often send a CV straight to the rejection pile, and exactly what to do about each one.",
      },
      { type: "heading", text: "1. A generic objective statement at the top" },
      {
        type: "paragraph",
        text: "Phrases like 'seeking a challenging position where I can grow' say nothing useful. Replace them with a two-sentence professional summary that names your role, your years of experience, and your strongest relevant skill. Make the recruiter feel they are reading about a specific person, not a template.",
      },
      { type: "heading", text: "2. Duties listed instead of achievements" },
      {
        type: "paragraph",
        text: "Every candidate who held the same job title had similar duties. What sets you apart is what you actually accomplished. Wherever possible, add numbers. 'Managed social media accounts' becomes 'Grew Instagram following from 800 to 14,000 in six months by creating a weekly video series.'",
      },
      { type: "heading", text: "3. A skills section full of soft skills" },
      {
        type: "paragraph",
        text: "Saying you are a 'team player' or 'excellent communicator' wastes space. Recruiters cannot verify those claims and they add nothing to your match score in applicant tracking systems. List hard skills, software, certifications, and languages instead.",
      },
      { type: "heading", text: "4. Unexplained employment gaps" },
      {
        type: "paragraph",
        text: "A gap is not disqualifying. An unexplained gap is. Add a short note for any break longer than three months. Freelance work, caregiving, further study, and even a deliberate sabbatical are all acceptable when you state them plainly.",
      },
      { type: "heading", text: "5. One CV sent to every role" },
      {
        type: "paragraph",
        text: "Tailoring your CV to each role does not mean rewriting it from scratch. It means adjusting your professional summary and reordering your bullet points so the most relevant experience appears first. Tellus can help you do this automatically for any job you are targeting.",
      },
      { type: "heading", text: "6. Poor formatting that breaks ATS parsing" },
      {
        type: "paragraph",
        text: "Tables, text boxes, and headers baked into images all confuse applicant tracking systems. Use a clean single-column layout, standard fonts, and plain text section headings. When in doubt, save as a .docx or plain PDF without headers and footers.",
      },
      {
        type: "paragraph",
        text: "Upload your updated CV to Tellus and our parser will tell you exactly what it extracted, so you can see what a recruiter's system actually reads.",
      },
    ],
    ctaLabel: "Update your CV now",
    ctaPath: "/dashboard",
  },

  // ── 6. Interview prep ─────────────────────────────────────────────────────
  {
    id: "interview-prep",
    title: "Ace your next interview",
    subject: "The interview preparation guide for your next Kenyan job application",
    preheader: "What to research, what to say, and how to handle the questions that trip people up.",
    heroImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A professional in a smart outfit ready for a meeting",
    eyebrow: "Interview prep",
    headline: "Walk in prepared. Walk out confident.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, getting to the interview stage is already an achievement. Now the work is to make sure that achievement translates into an offer. Here is a practical guide to preparing in the 48 hours before you walk in.",
      },
      { type: "heading", text: "Research the company properly" },
      {
        type: "paragraph",
        text: "Read the company's About page, their most recent press releases, and their LinkedIn page. Know their main products or services, who their customers are, and what challenges their industry is currently facing. Interviewers almost always ask some version of 'Why do you want to work here?' and a detailed, specific answer immediately separates you from candidates who give a vague response.",
      },
      { type: "heading", text: "Prepare three core stories" },
      {
        type: "paragraph",
        text: "Think of three moments in your career where you solved a real problem, delivered a strong result, or learned something important under pressure. Structure each one as a situation, the action you took, and the outcome. These three stories can be adapted to answer almost any behavioural interview question.",
      },
      { type: "heading", text: "Prepare questions to ask them" },
      {
        type: "paragraph",
        text: "Always arrive with at least three questions. Ask about the team you would be joining, what success looks like in the first ninety days, or what the biggest challenge is facing the department right now. Questions signal interest and intelligence. Silence at the end of an interview signals neither.",
      },
      { type: "heading", text: "Practice out loud, not just in your head" },
      {
        type: "paragraph",
        text: "Thinking through your answers feels very different from saying them out loud. Use Tellus's interview practice tool to speak your answers, read the feedback, and refine. Even one practice session the night before makes a measurable difference to your fluency and confidence.",
      },
      {
        type: "paragraph",
        text: "Open the practice panel for any job you are targeting and Tellus will generate the exact questions most likely to come up in that interview.",
      },
    ],
    ctaLabel: "Start interview practice",
    ctaPath: "/dashboard",
  },

  // ── 7. Job alerts / monitors ──────────────────────────────────────────────
  {
    id: "set-up-job-monitors",
    title: "Never miss a job again",
    subject: "Set up job monitors and let Tellus watch the market while you sleep",
    preheader: "Be the first to apply when the right role appears. Monitors do the watching for you.",
    heroImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A laptop open on a desk beside a cup of coffee in morning light",
    eyebrow: "Job monitors",
    headline: "The first to apply is often the first to get called",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, timing matters enormously in job hunting. Research consistently shows that applications submitted within the first 24 hours of a posting are significantly more likely to receive a response. Job monitors exist to make you that first applicant.",
      },
      { type: "heading", text: "What a job monitor does" },
      {
        type: "paragraph",
        text: "You define a set of criteria: a job title, a keyword, a location, a salary range, or any combination of those. Tellus then watches every source we track around the clock. The moment a new listing matches your criteria, we notify you immediately. You are not waiting for your next scheduled browse session; you are alerted the second the opportunity appears.",
      },
      { type: "heading", text: "How to set one up" },
      {
        type: "list",
        items: [
          "Open your dashboard and navigate to the Job Monitors section",
          "Click 'New monitor' and type in the role or keywords you want us to track",
          "Select your preferred county or choose 'All Kenya' for a wider search",
          "Choose how you want to be notified: instant, daily digest, or weekly summary",
          "Save the monitor and we start watching immediately",
        ],
      },
      { type: "heading", text: "Tips for monitors that actually work" },
      {
        type: "list",
        items: [
          "Use the exact job title you are targeting rather than broad terms like 'jobs'",
          "Set up separate monitors for variations of the same role (e.g. 'sales manager' and 'head of sales')",
          "Include the name of a specific company if you have a target employer in mind",
          "Review and update your monitors every two weeks as your search evolves",
        ],
      },
      {
        type: "paragraph",
        text: "The candidates who land roles fastest are rarely the most qualified. They are the ones who apply first, follow up consistently, and stay organised. Monitors are the foundation of that strategy.",
      },
    ],
    ctaLabel: "Set up your first monitor",
    ctaPath: "/dashboard",
  },

  // ── 8. Salary negotiation ─────────────────────────────────────────────────
  {
    id: "salary-negotiation",
    title: "Negotiate your salary with confidence",
    subject: "How to negotiate a higher salary without losing the offer",
    preheader: "Most candidates leave money on the table. Here is how not to be one of them.",
    heroImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two people discussing documents at a professional meeting table",
    eyebrow: "Salary advice",
    headline: "The offer is not the final number",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, salary negotiation is one of the highest-leverage conversations in your entire career. A single successful negotiation can add hundreds of thousands of shillings to your lifetime earnings. Yet most candidates accept the first number they are given because they are afraid of seeming greedy or losing the offer.",
      },
      {
        type: "paragraph",
        text: "The fear is understandable, but the data does not support it. In the vast majority of cases, a professional, well-reasoned counter-offer is met with either an improved offer or a respectful explanation of why the number cannot move. Very rarely is an offer withdrawn because a candidate negotiated.",
      },
      { type: "heading", text: "Research before the conversation" },
      {
        type: "paragraph",
        text: "Know your market rate before any salary discussion. Look at what similar roles in similar companies in your city are paying. Factor in your years of experience, your industry, and the size of the organisation. Come in with a range backed by data, not just a feeling.",
      },
      { type: "heading", text: "The structure of a good counter-offer" },
      {
        type: "paragraph",
        text: "Express genuine enthusiasm for the role first. Then state that, based on your research and your specific experience, you were hoping for a figure in a particular range. Give the top of the range you are comfortable accepting, not the bottom. Then stop talking and let the silence work.",
      },
      { type: "heading", text: "When salary cannot move, negotiate the rest" },
      {
        type: "list",
        items: [
          "An earlier performance review date (three months instead of twelve)",
          "A signing bonus to bridge the gap",
          "Additional annual leave days",
          "Remote work flexibility",
          "A professional development or training budget",
          "An earlier start date to get to the next pay review sooner",
        ],
      },
      {
        type: "paragraph",
        text: "The AI job coach inside Tellus can help you prepare for a specific salary negotiation. Tell it the role, the offer, and your target, and it will help you craft the exact language to use.",
      },
    ],
    ctaLabel: "Talk to the job coach",
    ctaPath: "/dashboard",
  },

  // ── 9. Re-engagement (inactive users) ────────────────────────────────────
  {
    id: "we-miss-you",
    title: "We miss you",
    subject: "{{FIRST_NAME}}, your job matches are piling up",
    preheader: "New roles matched to your profile are waiting. It takes 60 seconds to check in.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A bright, inviting office space with open desks",
    eyebrow: "We saved your spot",
    headline: "Your matched jobs are still here, waiting for you",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, you have not logged in for a while, and we want to make sure you have not missed anything important. Since your last visit, we have collected new job openings that match your profile, and several of them look like strong fits.",
      },
      {
        type: "paragraph",
        text: "Job searching can feel overwhelming when life gets busy. That is exactly why we built the monitors and the auto-apply feature: so that progress keeps happening even when you cannot be actively checking in every day.",
      },
      { type: "heading", text: "What is waiting for you" },
      {
        type: "list",
        items: [
          "New job matches based on your skills and location",
          "Interview practice questions for the roles you saved before you left",
          "Your application tracker showing the status of anything you submitted",
          "Referral rewards if any of your friends signed up while you were away",
        ],
      },
      {
        type: "paragraph",
        text: "It takes about sixty seconds to log back in and see what has changed. The job market does not pause, and neither do your competitors. A brief check-in today could be the one that changes everything.",
      },
      {
        type: "paragraph",
        text: "And if life circumstances have changed and you are no longer actively searching right now, that is completely fine. Come back whenever you are ready. Your profile, your saved jobs, and your history will all be exactly where you left them.",
      },
    ],
    ctaLabel: "See your new matches",
    ctaPath: "/jobs",
  },

  // ── 10. Profile completion ────────────────────────────────────────────────
  {
    id: "complete-your-profile",
    title: "Finish your profile for better matches",
    subject: "Your profile is not complete yet — and your matches are suffering for it",
    preheader: "A complete profile gets 3x more relevant job matches. It takes under five minutes.",
    heroImage:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person filling out a form on a laptop at home",
    eyebrow: "Profile tips",
    headline: "Complete your profile in five minutes, get matches all month",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, our data shows that profiles with all sections completed receive significantly more relevant job matches than incomplete ones. If your profile still has empty fields, you are essentially asking our system to guess what you want, and guesses are never as good as the real thing.",
      },
      { type: "heading", text: "The four sections that matter most" },
      {
        type: "paragraph",
        text: "Your current location and county: This lets us filter out roles that require relocation when you have not indicated you are open to it. It also helps us surface opportunities from regional employers who specifically want local candidates.",
      },
      {
        type: "paragraph",
        text: "Your preferred job types and industries: Even a simple selection here narrows your matches from hundreds of loosely related roles to a focused shortlist of genuinely relevant ones.",
      },
      {
        type: "paragraph",
        text: "Your skills and certifications: These are what our matching algorithm uses at the most granular level. List every skill you have, even the ones that feel obvious. Employers search by skill keyword, and a missing skill is a missed match.",
      },
      {
        type: "paragraph",
        text: "Your availability and notice period: Employers want to know when you can start. Adding this information puts you ahead of candidates who leave it blank.",
      },
      { type: "heading", text: "How to complete it quickly" },
      {
        type: "list",
        items: [
          "Open your profile page from the main dashboard",
          "Look for any section marked as incomplete or missing",
          "Work through them one at a time — most take under thirty seconds",
          "Save each section as you go so your progress is never lost",
          "Return to it after adding a new experience or certification to keep it fresh",
        ],
      },
    ],
    ctaLabel: "Complete your profile",
    ctaPath: "/dashboard",
  },

  // ── 11. Cover letter tips ─────────────────────────────────────────────────
  {
    id: "cover-letter-guide",
    title: "Write cover letters that get read",
    subject: "Most cover letters are ignored. Here is how to write one that gets read",
    preheader: "A great cover letter opens doors a CV alone cannot. Here is the formula.",
    heroImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person writing at a desk with natural light coming through a window",
    eyebrow: "Application advice",
    headline: "The cover letter formula that actually works",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, recruiters receive dozens of applications for every job listing. Most cover letters are ignored because they say the same things in the same order. Here is a structure that stands out.",
      },
      { type: "heading", text: "Open with a specific reason you want this role" },
      {
        type: "paragraph",
        text: "Not 'I am writing to apply for the position of...' which adds nothing. Open with something specific about the company or the role that genuinely interests you. One sentence that shows you did your homework is worth more than three paragraphs of standard phrasing.",
      },
      { type: "heading", text: "Connect your most relevant experience to their biggest need" },
      {
        type: "paragraph",
        text: "Read the job description and identify the single most important thing they are looking for. Then write one paragraph, three to five sentences, describing an example from your past that directly addresses that need. Use numbers and outcomes wherever possible.",
      },
      { type: "heading", text: "Address any obvious concern directly" },
      {
        type: "paragraph",
        text: "If you are changing industries, explain briefly why and what you are bringing across. If you are applying for a more senior role than you have held before, name the gap and explain how you have already been operating at that level informally. Recruiters notice gaps. Addressing them upfront turns a concern into evidence of self-awareness.",
      },
      { type: "heading", text: "Close with a clear, confident ask" },
      {
        type: "paragraph",
        text: "Do not close with 'I look forward to hearing from you at your convenience.' Close with something like: 'I would welcome the chance to talk through how my experience in [specific area] maps to what you are building in this role.' It is specific, confident, and invites a response.",
      },
      {
        type: "paragraph",
        text: "Tellus generates a tailored cover letter for every role you apply to, using the actual job description and your CV. You can edit it, regenerate it, or use it as a starting point for your own writing.",
      },
    ],
    ctaLabel: "Apply to a job now",
    ctaPath: "/jobs",
  },

  // ── 12. Weekly job digest ─────────────────────────────────────────────────
  {
    id: "weekly-job-digest",
    title: "Your weekly job digest",
    subject: "This week's top matched roles for {{FIRST_NAME}}",
    preheader: "Fresh openings collected this week and matched to your profile. Do not miss them.",
    heroImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "An aerial view of Nairobi's business district on a clear day",
    eyebrow: "Weekly digest",
    headline: "New this week across Kenya's job market",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, here is a summary of what we have collected and matched to your profile in the past seven days. The Kenyan job market moves fast, and this digest is designed to make sure nothing slips through while you are busy.",
      },
      { type: "heading", text: "What to do with this email" },
      {
        type: "list",
        items: [
          "Click through to your jobs page and sort by 'match score' to see the best fits first",
          "Save any roles you like so they are tracked in your application dashboard",
          "Apply directly through Tellus so your cover letter is tailored automatically",
          "Set a new monitor if you spotted a keyword or role type this week that you want us to watch going forward",
        ],
      },
      { type: "heading", text: "Roles that tend to fill fast" },
      {
        type: "paragraph",
        text: "Senior finance and accounting roles in Nairobi's financial sector typically receive 50 or more applications within 48 hours of posting. Entry-level tech roles at growing startups fill within a week. If you see a role that excites you, the right time to apply is today.",
      },
      { type: "heading", text: "Did you know?" },
      {
        type: "paragraph",
        text: "Users who apply to at least three roles per week are four times more likely to land an interview within the following thirty days than users who apply to one or fewer. Consistent activity is the single biggest predictor of success on the platform.",
      },
    ],
    ctaLabel: "View this week's matches",
    ctaPath: "/jobs",
  },

  // ── 13. Milestone: first application ─────────────────────────────────────
  {
    id: "first-application-sent",
    title: "You sent your first application",
    subject: "Your first application is in. Here is what to do next.",
    preheader: "The hardest part is done. Here is how to maximise your chances from here.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person celebrating a small win at their laptop",
    eyebrow: "Milestone",
    headline: "First application sent. Now let us build momentum.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, you have sent your first application through Tellus Jobs. That is a real step, and we want to make sure it leads somewhere. Here is what experienced job seekers do in the 48 hours after applying.",
      },
      { type: "heading", text: "Apply to at least two more roles this week" },
      {
        type: "paragraph",
        text: "A single application is rarely enough to generate momentum. Aim for at least three applications per week. The more signals you send into the market, the faster you start receiving responses, and the more data you collect about which roles and companies are most responsive to your profile.",
      },
      { type: "heading", text: "Track the application in your dashboard" },
      {
        type: "paragraph",
        text: "Your application tracker shows you the status of every role you have applied to. Update it whenever you hear back, move to an interview, or decide to withdraw. Keeping it current means you always know exactly where you stand and what needs a follow-up.",
      },
      { type: "heading", text: "Set a follow-up reminder" },
      {
        type: "paragraph",
        text: "If you have not heard back within seven to ten business days, a brief, professional follow-up email is entirely appropriate. Something like: 'I wanted to follow up on my application for [role] submitted on [date]. I remain very interested and would welcome the chance to discuss further.' Short, confident, and not pushy.",
      },
      { type: "heading", text: "Start preparing for the interview now" },
      {
        type: "paragraph",
        text: "Do not wait until you get the call to start preparing. Open the interview practice tool now and run through the questions for this specific role. By the time the recruiter calls, you will already be ready.",
      },
    ],
    ctaLabel: "View your applications",
    ctaPath: "/dashboard",
  },

  // ── 14. Upgrade to premium ────────────────────────────────────────────────
  {
    id: "upgrade-to-premium",
    title: "Upgrade to premium",
    subject: "Unlock the full power of Tellus Jobs with a premium account",
    preheader: "Auto-apply, unlimited cover letters, priority matching and more. All in one plan.",
    heroImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A confident professional reviewing data on a large monitor",
    eyebrow: "Go premium",
    headline: "The tools serious job seekers use every day",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, the free plan gives you a strong foundation. But if you are actively searching and want every possible advantage, premium removes every limitation and adds features that fundamentally change the pace of your search.",
      },
      { type: "heading", text: "Everything included in premium" },
      {
        type: "list",
        items: [
          "Unlimited tailored cover letters for every role you apply to",
          "Auto-apply workflows that submit applications while you sleep",
          "Priority job matching so you see fresh roles before free-plan users",
          "Unlimited interview practice sessions with detailed written feedback",
          "Full AI job coach access with extended conversation history",
          "Advanced application analytics showing which roles your profile is strongest for",
          "Resume scoring and specific improvement suggestions before every application",
          "Dedicated support with faster response times",
        ],
      },
      { type: "heading", text: "A better way to think about the cost" },
      {
        type: "paragraph",
        text: "Think of premium not as a monthly subscription but as an investment in your next salary. If it helps you land a role even one month sooner than you would have otherwise, the return on investment is enormous. A single month of salary dwarfs the cost of premium many times over.",
      },
      {
        type: "paragraph",
        text: "And remember: every friend you refer who joins earns you a free month of premium. Ten referrals, ten free months. The program never expires.",
      },
    ],
    ctaLabel: "Explore premium features",
    ctaPath: "/dashboard",
  },

  // ── 15. Career change guide ───────────────────────────────────────────────
  {
    id: "career-change-guide",
    title: "Changing careers? Read this first.",
    subject: "Thinking about a career change? Here is what to do before you apply anywhere",
    preheader: "Career changes are more achievable than you think. Here is the honest roadmap.",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person standing at a crossroads on a wide open road",
    eyebrow: "Career change",
    headline: "The honest guide to switching industries or roles",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, career changes are more common than they have ever been, and more achievable than most people realise. The biggest mistakes are not in the transition itself but in the preparation. Here is what to do before you send a single application.",
      },
      { type: "heading", text: "Map your transferable skills first" },
      {
        type: "paragraph",
        text: "Every industry values communication, problem-solving, project management, and analytical thinking. Before you decide what is missing, make a list of everything you already have. You will almost certainly discover that more transfers across than you thought.",
      },
      { type: "heading", text: "Identify the specific gap and close it" },
      {
        type: "paragraph",
        text: "Vague awareness that you are 'missing experience' is not useful. Name the exact qualification, certification, or skill that your target roles consistently ask for and that you do not yet have. Then find the shortest, most credible path to getting it. For many skills, that is a three-month online course, not a second degree.",
      },
      { type: "heading", text: "Target roles that bridge both worlds" },
      {
        type: "paragraph",
        text: "The best entry point into a new industry is often a role that explicitly values your old background. An accountant moving into tech will find more doors open for a 'finance systems analyst' or 'fintech operations manager' role than a pure software engineering position. Use your current skills as the wedge, then expand from there.",
      },
      { type: "heading", text: "Reframe your CV for the new audience" },
      {
        type: "paragraph",
        text: "Your CV needs to speak to a recruiter who has never seen your industry before. Lead with your transferable achievements, not your industry-specific titles. Use language from the job descriptions you are applying to, not the jargon of your current field. Tellus can help you identify which of your skills map most directly to your target roles.",
      },
      {
        type: "paragraph",
        text: "The AI job coach inside Tellus is particularly useful for career change planning. Tell it where you are now and where you want to go, and it will give you a specific, realistic action plan.",
      },
    ],
    ctaLabel: "Talk to the career coach",
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
