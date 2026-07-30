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
        text: "Hi {{FIRST_NAME}}, welcome to Tellus Jobs. We are genuinely glad you are here, and we want to take a moment to tell you exactly what you have just signed up for, because we think it is going to change the way you think about job searching in Kenya.",
      },
      {
        type: "paragraph",
        text: "We built Tellus because we watched smart, talented people spend weeks sending the same generic CV to role after role, writing cover letters from scratch every single time, and tracking applications in spreadsheets that quickly became unmanageable. The process was exhausting, inefficient, and deeply demoralising. We decided to build something better.",
      },
      {
        type: "paragraph",
        text: "Tellus Jobs is an AI-powered career platform designed specifically for the Kenyan job market. The moment you upload your CV, our system reads every line of it, understands your career history, extracts your skills and seniority level, and begins matching you to live job openings pulled fresh every single day from Kenya's biggest job boards, company career pages, and recruitment agencies. You do not browse through hundreds of irrelevant listings. You see the roles that actually fit your background, ranked by how strong the match is.",
      },
      { type: "heading", text: "What you can do right now, today" },
      {
        type: "list",
        items: [
          "Upload your CV and let Tellus build your full professional profile automatically in under two minutes",
          "Browse a live marketplace of matched openings filtered by your skills, seniority, county, and preferred industry",
          "Save the roles that interest you and track every application status in one clean, organised dashboard",
          "Set up job monitors so you are alerted the moment a new role in your field appears anywhere in Kenya",
          "Use the AI job coach to get personalised answers to questions about your career, salary expectations, or how to position yourself for a specific role",
          "Practice interview questions tailored specifically to any role you are targeting",
        ],
      },
      {
        type: "paragraph",
        text: "The single most important thing you can do in your first session is complete your profile. The more information our system has about you, the sharper and more relevant your matches become. A complete profile with your skills, preferred locations, and career goals can increase the quality of your matches by an enormous margin compared to a bare-bones upload.",
      },
      {
        type: "paragraph",
        text: "It takes about five minutes. And it is absolutely worth it.",
      },
      {
        type: "paragraph",
        text: "Over the coming days, we will send you a series of emails walking you through the features that make the biggest difference to your search. But you do not have to wait. Everything is already live in your dashboard, and the job market is moving right now.",
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
    heroAlt: "A person reviewing a detailed plan at a well-lit desk",
    eyebrow: "How it works",
    headline: "Four steps between you and your next role",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, a lot happens in the background from the moment you log in to Tellus Jobs. Most of it is invisible to you by design, because the whole point is to remove the friction from your job search rather than replace it with a different kind of complexity. But understanding what is happening behind the scenes will help you get more out of the platform, so here is a plain-English walkthrough of every step.",
      },
      { type: "heading", text: "Step 1: We read your CV and build your professional model" },
      {
        type: "paragraph",
        text: "Your CV is not just stored as a file on our servers. The moment you upload it, our AI parser breaks it down into a structured representation of who you are as a professional. It extracts your job titles, the industries you have worked in, your seniority level, the specific skills mentioned throughout your work history, the companies you have been part of, and the trajectory of your career over time.",
      },
      {
        type: "paragraph",
        text: "This structured data becomes what we call your professional model, and it is the foundation of everything Tellus does for you. Every job match, every tailored cover letter, every interview question set is generated using this model as its starting point. The better your CV is, the better this model becomes, and the better every downstream output becomes as a result. This is why we give you tools inside the platform to score and improve your CV before you apply anywhere.",
      },
      { type: "heading", text: "Step 2: We scan the Kenyan job market every single day" },
      {
        type: "paragraph",
        text: "Every morning, our scrapers go to work collecting new openings from every major job board operating in Kenya, plus dozens of company career pages that post directly without going through the boards. We remove duplicate listings, verify that roles are still accepting applications, strip out spam and low-quality postings, and then run every valid listing through a scoring algorithm that measures how closely it matches your professional model.",
      },
      {
        type: "paragraph",
        text: "By the time you open the jobs page, you are not looking at a raw firehose of listings. You are looking at a curated, ranked list where the strongest matches appear at the top. If you have been to a traditional job board recently and felt overwhelmed by the volume of irrelevant results, this is what the alternative feels like.",
      },
      { type: "heading", text: "Step 3: We write the application for you" },
      {
        type: "paragraph",
        text: "This is the part that saves the most time and has the biggest impact on outcomes. For any role you decide to apply to, Tellus generates a tailored cover letter and application email that references the actual job description, your specific experience, and the stated requirements of the role. It draws direct connections between what the employer is looking for and what your background demonstrates.",
      },
      {
        type: "paragraph",
        text: "It never produces a generic template with the company name swapped in. It reads like something a thoughtful, well-prepared candidate wrote specifically for this role, because in effect that is what it is. You review it, make any edits you want, and send it directly through the platform. Every application you submit is logged with the cover letter used, the timestamp, and the current status.",
      },
      { type: "heading", text: "Step 4: We help you prepare for the interview and the conversation after" },
      {
        type: "paragraph",
        text: "Once you land an interview, Tellus generates a practice set of role-specific questions based on the job description and your background. You answer them in writing inside the platform, and our AI gives you detailed written feedback on what to strengthen, what to cut, how to frame your experience more compellingly, and which parts of your answer are genuinely strong. You can iterate as many times as you like before the real conversation.",
      },
      {
        type: "paragraph",
        text: "After the interview, if you want to think through a counter-offer, negotiate your salary, or decide between two competing offers, the AI job coach is there for that conversation too. It knows your CV and your history on the platform, so the advice is grounded in your actual situation rather than generic guidance that could apply to anyone.",
      },
    ],
    ctaLabel: "See your matched jobs",
    ctaPath: "/jobs",
  },

  // ── 3. Tips / hidden features ─────────────────────────────────────────────
  {
    id: "get-more-out-of-tellus",
    title: "Get more out of Tellus Jobs",
    subject: "5 Tellus features most users have not switched on yet",
    preheader: "Auto-apply, job monitors, the AI coach, and referrals. Here is the full picture.",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two professionals shaking hands after a successful meeting",
    eyebrow: "Pro tips",
    headline: "Five features worth switching on right now",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, most users find the jobs page and the application tracker within the first session. Those are excellent starting points, and they alone put you ahead of candidates who are managing their search from a spreadsheet. But Tellus has five more layers underneath that quietly do the heavy lifting once you turn them on, and most people never discover them.",
      },
      { type: "heading", text: "Feature 1: Job monitors" },
      {
        type: "paragraph",
        text: "A job monitor is a saved search that runs automatically in the background, around the clock. You define the criteria once: a job title, a keyword, a location, a salary range, or any combination. From that point on, Tellus watches every source we track and alerts you the moment a matching role appears. You stop checking boards manually and start receiving targeted notifications instead.",
      },
      {
        type: "paragraph",
        text: "The competitive advantage here is timing. Research consistently shows that candidates who apply within the first 24 hours of a job posting going live are significantly more likely to receive a response than those who apply later in the cycle. Monitors make you that early applicant without requiring you to check job boards every morning.",
      },
      { type: "heading", text: "Feature 2: Auto-apply" },
      {
        type: "paragraph",
        text: "Auto-apply takes the monitor concept one step further. Instead of just alerting you when a matching role appears, Tellus submits a fully tailored application on your behalf. You configure the workflow once: define the criteria, set any filters you want, review and approve the cover letter template, and then let the system run. Every application sent is logged with the full cover letter text, the timestamp, and the role details, so nothing is ever submitted without a complete record.",
      },
      {
        type: "paragraph",
        text: "This does not mean you lose control. You can pause auto-apply at any time, review every submission in your dashboard, and set limits on how many applications per day or per week. It is automation with guardrails, not a fire-and-forget button.",
      },
      { type: "heading", text: "Feature 3: The AI job coach" },
      {
        type: "paragraph",
        text: "The AI job coach is not a generic chatbot. It has read your CV. It knows your work history, your skills, and the roles you have been applying to. When you ask it a question, it answers in the context of your specific situation. Whether you are wondering whether a lateral move makes strategic sense, trying to figure out how to explain a career gap, preparing for a salary negotiation, or debating whether to take a counteroffer, the coach gives you grounded, personalised guidance rather than advice that could apply to anyone.",
      },
      { type: "heading", text: "Feature 4: Interview practice" },
      {
        type: "paragraph",
        text: "Before any interview, open the practice panel for the specific role you are targeting. Tellus generates the questions that are most likely to come up based on the job description, the company type, and your background. You write your answers, receive detailed written feedback, refine, and repeat. By the time you walk into the actual interview, you have already had the conversation several times in a low-stakes environment.",
      },
      { type: "heading", text: "Feature 5: The referral program" },
      {
        type: "paragraph",
        text: "Every friend you refer who signs up and verifies their email earns you a free month of premium features. There is no cap on how many friends you can refer or how many months you can earn. Share your link from the dashboard, track your referrals in real time, and watch your account grow as your network joins. It is the most cost-effective way to access everything Tellus has to offer.",
      },
    ],
    ctaLabel: "Open your dashboard",
    ctaPath: "/dashboard",
  },

  // ── 4. Referrals (dedicated) ──────────────────────────────────────────────
  {
    id: "referral-program",
    title: "Refer friends, earn free premium",
    subject: "Share Tellus Jobs with a friend and earn a free month of premium for every signup",
    preheader: "Every verified friend earns you a free upgrade. No limit, no expiry on earning.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two friends laughing and looking at a phone together",
    eyebrow: "Referral program",
    headline: "Invite a friend. Both of you win.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, we want more people across Kenya to experience a fundamentally better way to search for work. We built a referral program that rewards you meaningfully every time you help someone in your network get started on that journey.",
      },
      {
        type: "paragraph",
        text: "The mechanics are simple. You share your personal referral link. When someone signs up using that link and verifies their email address, you earn one free month of Tellus Premium. That is it. No complicated point systems, no minimum thresholds, no expiry dates. One verified signup, one free month, credited to your account automatically.",
      },
      { type: "heading", text: "How to get your referral link" },
      {
        type: "list",
        items: [
          "Open your dashboard and navigate to the Referrals section in the left sidebar",
          "Copy your unique referral link with one click",
          "Share it anywhere: WhatsApp, LinkedIn, a direct message, email, or your social media profiles",
          "Track every referral in real time from the same page, including who has signed up and who has verified",
          "See your earned premium months credited to your account automatically as each referral verifies",
        ],
      },
      { type: "heading", text: "Who is worth referring" },
      {
        type: "paragraph",
        text: "Think about anyone in your network who is currently job hunting, thinking about a career move, fresh out of university, returning to work after a gap, or simply not happy in their current role. Anyone who has ever opened a job board in Kenya is a potential Tellus user, and every one of them is a potential free month for you.",
      },
      { type: "heading", text: "What premium unlocks for you" },
      {
        type: "list",
        items: [
          "Unlimited tailored cover letters for every role you apply to",
          "Auto-apply workflows that run in the background and submit applications for you",
          "Priority job matching so you see fresh roles before free-plan users",
          "Unlimited interview practice sessions with detailed AI feedback",
          "Full AI job coach access with extended conversation memory and follow-up capability",
          "Advanced application analytics showing which roles and industries your profile performs strongest in",
          "Resume scoring with specific, actionable improvement suggestions before every application",
        ],
      },
      {
        type: "paragraph",
        text: "If you know ten people who are actively looking for work right now, that is ten free months without spending anything. And every person you refer gets a significantly better job search experience from their very first session. It is genuinely one of those rare situations where everyone benefits.",
      },
      {
        type: "paragraph",
        text: "Your referral link is in your dashboard right now. It takes thirty seconds to copy and share.",
      },
    ],
    ctaLabel: "Get your referral link",
    ctaPath: "/dashboard",
  },

  // ── 5. CV tips ────────────────────────────────────────────────────────────
  {
    id: "cv-tips",
    title: "Make your CV work harder",
    subject: "6 CV mistakes that cost you interviews (and how to fix every one of them today)",
    preheader: "Most CVs are rejected in under 10 seconds. Here is how to make yours the exception.",
    heroImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person reviewing documents at a bright desk with natural light",
    eyebrow: "CV advice",
    headline: "The six things recruiters look for in the first ten seconds",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, your CV is almost always the first thing a recruiter or hiring manager sees. In a high-volume hiring process, they spend under ten seconds deciding whether to read further. That is not a criticism of recruiters; it is a practical reality of receiving sixty applications for a single role. Understanding that reality is the starting point for building a CV that beats the initial filter.",
      },
      {
        type: "paragraph",
        text: "Here are the six mistakes that most often send a CV straight to the rejection pile, and exactly what to do about each one. These are not stylistic preferences. They are structural issues that consistently make the difference between getting the call and never hearing back.",
      },
      { type: "heading", text: "Mistake 1: A generic objective statement at the top" },
      {
        type: "paragraph",
        text: "Phrases like 'seeking a challenging position in a dynamic organisation where I can leverage my skills and grow professionally' appear in thousands of CVs and say nothing useful to anyone reading them. They consume prime real estate at the top of the document and signal to the recruiter that the candidate has not thought carefully about how to present themselves.",
      },
      {
        type: "paragraph",
        text: "Replace this with a two to three sentence professional summary that names your role, your years of experience in it, your most significant technical skill or area of expertise, and one concrete thing you have delivered. Write it for this job, not for all jobs. Make the recruiter feel they are reading about a specific, capable person rather than a template.",
      },
      { type: "heading", text: "Mistake 2: Listing duties instead of achievements" },
      {
        type: "paragraph",
        text: "Every candidate who has ever held a similar job title had broadly similar duties. Listing those duties does not differentiate you; it makes you identical to everyone else with that title. What sets you apart is what you actually accomplished while you had those responsibilities.",
      },
      {
        type: "paragraph",
        text: "Wherever possible, add a number to every bullet point. 'Managed the company's social media presence' becomes 'Grew Instagram following from 800 to 14,000 in six months by launching a weekly behind-the-scenes video series that averaged 2,000 views per episode.' One has a specific, verifiable result. The other is noise.",
      },
      { type: "heading", text: "Mistake 3: A skills section full of soft skills" },
      {
        type: "paragraph",
        text: "Soft skills like 'team player,' 'excellent communicator,' and 'results-oriented' are nearly impossible for a recruiter to evaluate from a CV and are therefore meaningless in that context. Every candidate claims these qualities. None of them can be verified from a document. They take up space that could be used for information that actually matters.",
      },
      {
        type: "paragraph",
        text: "List hard skills, software proficiency, programming languages, certifications, spoken and written languages, and specific methodologies instead. These are searchable, verifiable, and directly relevant to whether you can do the job.",
      },
      { type: "heading", text: "Mistake 4: Unexplained employment gaps" },
      {
        type: "paragraph",
        text: "A gap in employment history is not automatically disqualifying. An unexplained gap invites the recruiter to imagine the worst possible reason for it. For any period longer than three months that is not accounted for by the dates on your CV, add a brief note. Freelance work, caregiving responsibilities, further study, travel, a health recovery, or a deliberate sabbatical are all acceptable when stated plainly. Transparency converts a red flag into a non-issue.",
      },
      { type: "heading", text: "Mistake 5: One CV sent to every role" },
      {
        type: "paragraph",
        text: "Tailoring your CV does not mean rewriting it from scratch for every application. It means adjusting two specific things: your professional summary, which should reference the specific role and company, and the order of your bullet points, which should be reordered so the experience most relevant to this job appears first. This takes about ten minutes per application and significantly improves your match score in automated systems as well as your read rate from human reviewers.",
      },
      { type: "heading", text: "Mistake 6: Formatting that breaks automated parsing" },
      {
        type: "paragraph",
        text: "Tables, text boxes, columns, and section headers embedded in images all look professional in Word and become unreadable noise when processed by an applicant tracking system. Use a clean single-column layout with standard section headings in plain text, a common font at a readable size, and consistent formatting throughout. When you upload your CV to Tellus, we show you exactly what our parser extracted so you can see precisely what an ATS actually reads from your document.",
      },
    ],
    ctaLabel: "Upload and score your CV",
    ctaPath: "/dashboard",
  },

  // ── 6. Interview prep ─────────────────────────────────────────────────────
  {
    id: "interview-prep",
    title: "Ace your next interview",
    subject: "The complete interview preparation guide for your next Kenya job application",
    preheader: "What to research, what to say, and how to handle the questions that trip people up.",
    heroImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A confident professional in a smart outfit ready for a meeting",
    eyebrow: "Interview prep",
    headline: "Walk in prepared. Walk out confident.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, getting to the interview stage is already a significant achievement. It means your CV passed the initial screen, your application stood out from the stack, and a human being decided it was worth thirty to sixty minutes of their time to learn more about you. That is not nothing. Now the task is to convert that momentum into an offer.",
      },
      {
        type: "paragraph",
        text: "Interview performance is almost entirely a function of preparation. Candidates who do thorough, structured preparation before an interview consistently outperform more talented candidates who wing it. Here is exactly what thorough preparation looks like.",
      },
      { type: "heading", text: "Research the company, not just the role" },
      {
        type: "paragraph",
        text: "Read the company's About page, their mission and values statements, their most recent press releases or news coverage, and their LinkedIn company profile. Look at the interviewer's LinkedIn profile if you know who it will be. Understand what their main products or services are, who their customers are, what challenges their industry is currently facing, and what differentiates them from their competitors.",
      },
      {
        type: "paragraph",
        text: "Interviewers almost always ask some version of 'Why do you want to work here?' and 'What do you know about us?' A specific, detailed, accurate answer to either of these questions immediately signals that you are serious, that you respect their time, and that you have thought carefully about whether this role is actually a fit. Vague or generic answers signal the opposite.",
      },
      { type: "heading", text: "Prepare three core stories using the STAR structure" },
      {
        type: "paragraph",
        text: "Behavioural interview questions all follow the same pattern: 'Tell me about a time when...' and 'Give me an example of...' The best way to prepare for them is to build three strong career stories in advance and then adapt them to whatever question comes up.",
      },
      {
        type: "paragraph",
        text: "Structure each story as a Situation (the context), a Task (what you were responsible for), the Action you took specifically, and the Result that followed. Keep each story to about two minutes when spoken aloud. Practice them until they feel natural, not recited. Three well-prepared stories can answer almost any behavioural question you will encounter.",
      },
      { type: "heading", text: "Prepare at least five questions to ask them" },
      {
        type: "paragraph",
        text: "The moment when the interviewer says 'Do you have any questions for us?' is not a formality you should wave away. It is an opportunity to demonstrate intellectual curiosity, strategic thinking, and genuine interest in the role. Arrive with at least five prepared questions so that even if two or three of them get answered during the conversation, you still have material.",
      },
      {
        type: "paragraph",
        text: "Strong questions include: What does success look like in this role after ninety days? What are the biggest challenges the team is currently navigating? How would you describe the culture of the team I would be joining? What is the career progression path for someone who performs well in this position? What are the next steps in your decision process?",
      },
      { type: "heading", text: "Practice out loud, not just in your head" },
      {
        type: "paragraph",
        text: "Thinking through your answers silently feels very different from articulating them under the mild pressure of a real conversation. The fluency and confidence that comes from having said something several times before cannot be replicated by having thought it. Use Tellus's interview practice tool to write out and refine your answers for any specific role, then read them aloud at home until they flow naturally.",
      },
      { type: "heading", text: "Handle salary questions with confidence, not evasion" },
      {
        type: "paragraph",
        text: "If the interviewer asks about your salary expectations, have a researched range ready. Know what the market pays for this role, this seniority level, and this city. Give the top of your acceptable range as the figure, not the bottom. And remember that the first interview is often not the right moment for a detailed negotiation. It is the moment to confirm that you are in the right ballpark so neither party wastes further time.",
      },
    ],
    ctaLabel: "Start interview practice",
    ctaPath: "/dashboard",
  },

  // ── 7. Job monitors ───────────────────────────────────────────────────────
  {
    id: "set-up-job-monitors",
    title: "Never miss a job again",
    subject: "Set up job monitors and let Tellus watch the entire market while you focus on your life",
    preheader: "Be first to apply when the right role appears. Monitors do all the watching for you.",
    heroImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A laptop open beside a cup of coffee in warm morning light",
    eyebrow: "Job monitors",
    headline: "The first to apply is often the first to get called",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, there is a timing problem at the heart of most job searches that nobody talks about enough. The best roles, particularly at fast-growing companies and well-regarded organisations, fill quickly. Not in weeks. Sometimes in days. A strong candidate who applies on day one of a posting going live has a meaningfully better chance of progressing than an equally strong candidate who applies on day seven.",
      },
      {
        type: "paragraph",
        text: "The reason is simple: by day seven, the recruiter may already have three candidates in the final round. Your application lands in a different context than it would have on day one. The bar it has to clear has already shifted. Job monitors exist to solve this problem by making you, reliably and consistently, one of the first applicants for every role that matches your criteria.",
      },
      { type: "heading", text: "What a job monitor does in practice" },
      {
        type: "paragraph",
        text: "You define a set of criteria: a job title or keyword, a location or county, a salary range if you have one in mind, or any combination of those parameters. Tellus then watches every source we track, around the clock, for new listings that meet those criteria. The moment a matching role appears on any source we cover, we notify you immediately. You are not waiting for your next scheduled session on the platform; you receive the alert in real time.",
      },
      { type: "heading", text: "How to set up your first monitor in under three minutes" },
      {
        type: "list",
        items: [
          "Open your dashboard and navigate to the Job Monitors section",
          "Click 'New monitor' and enter the job title or keyword you want us to watch",
          "Select your preferred county or choose 'All Kenya' for a national search",
          "Optionally add a salary range or any other filters you want applied",
          "Choose how you want to be notified: instant alert, daily digest, or weekly summary",
          "Save the monitor and we begin watching immediately",
        ],
      },
      { type: "heading", text: "How to make monitors that actually work" },
      {
        type: "paragraph",
        text: "The specificity of your criteria matters enormously. A monitor set for 'jobs' will generate so many notifications it becomes noise. A monitor set for 'financial analyst' in 'Nairobi' with a salary range of KES 80,000 to 150,000 will surface exactly the roles worth your attention.",
      },
      {
        type: "list",
        items: [
          "Use the exact job title you are targeting rather than broad categories",
          "Set up separate monitors for common variations of the same role, since postings are not standardised",
          "Include a specific company name if you have a target employer in mind",
          "Create one monitor for your ideal role and a second for adjacent roles you would also consider",
          "Review and update your monitors every two to three weeks as your search evolves",
        ],
      },
      {
        type: "paragraph",
        text: "Job monitors paired with auto-apply is the closest thing to a fully automated job search that currently exists. You define what you want, we watch for it, and when it appears, we apply for you. All you have to do is show up to the interview.",
      },
    ],
    ctaLabel: "Set up your first monitor",
    ctaPath: "/dashboard",
  },

  // ── 8. Salary negotiation ─────────────────────────────────────────────────
  {
    id: "salary-negotiation",
    title: "Negotiate your salary with confidence",
    subject: "How to negotiate a higher salary without risking the offer",
    preheader: "Most candidates leave significant money on the table. Here is how not to be one of them.",
    heroImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Two people having a focused professional discussion at a meeting table",
    eyebrow: "Salary advice",
    headline: "The offer is not the final number",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, salary negotiation is one of the most consequential and most consistently avoided conversations in a professional career. A single successful negotiation can add hundreds of thousands of shillings to your annual income, and that compound effect over a career is enormous. Yet the majority of candidates accept the first number they are given, primarily because they are afraid of seeming difficult or, in the worst case, having the offer withdrawn.",
      },
      {
        type: "paragraph",
        text: "The fear is deeply understandable but largely unsupported by evidence. Professional, well-reasoned counter-offers are standard practice in hiring. Most employers build some negotiation room into their initial offer precisely because they expect candidates to respond. In the overwhelming majority of cases, a professional counter-offer is met with either an improved offer or a respectful explanation of why the number cannot move. Very rarely, and typically only in exceptional circumstances, is an offer withdrawn because a candidate attempted to negotiate in good faith.",
      },
      { type: "heading", text: "Do your research before any conversation about money" },
      {
        type: "paragraph",
        text: "Know your market rate before you accept or decline any number. Research what similar roles at similar-sized companies in your city are currently paying. Consider your years of experience, your specific skills, the industry you are in, and the size of the organisation. Resources like LinkedIn Salary Insights, conversations with peers in similar roles, and the Tellus AI job coach can all help you build a credible range. Come into the conversation with a number backed by data, not just a feeling about what you deserve.",
      },
      { type: "heading", text: "The structure of a counter-offer that works" },
      {
        type: "paragraph",
        text: "Start by expressing genuine enthusiasm for the role. You are not negotiating because you are ambivalent; you are negotiating because you are excited and want this to work. Then state clearly that, based on your research into market rates for this role and your specific experience, you were hoping for a figure in a particular range. Give the top of the range you would genuinely accept, not the bottom. Then stop talking.",
      },
      {
        type: "paragraph",
        text: "That pause is intentional and important. You have made a specific, professional request. The natural instinct is to fill the silence by softening the request, apologising for it, or immediately offering to accept less. Resist that instinct. Let the hiring manager respond to what you actually said.",
      },
      { type: "heading", text: "When the salary genuinely cannot move, negotiate everything else" },
      {
        type: "list",
        items: [
          "An earlier performance review date so you can reach the higher salary through demonstrated results sooner",
          "A signing bonus that bridges the gap between what they are offering and what you were hoping for",
          "Additional annual leave days beyond the standard allowance",
          "Remote or hybrid working arrangements that reduce your commuting costs and time",
          "A professional development budget for courses, certifications, or conferences",
          "Flexibility on your start date if that gives you financial breathing room",
        ],
      },
      {
        type: "paragraph",
        text: "Compensation is a package, not a single number. The most experienced negotiators think about the total value of an offer rather than fixating on the base salary alone.",
      },
      {
        type: "paragraph",
        text: "The AI job coach inside Tellus can help you prepare for a specific salary negotiation. Tell it the role, the offer you received, and the figure you are targeting, and it will help you construct the exact language to use in the conversation.",
      },
    ],
    ctaLabel: "Talk to the job coach",
    ctaPath: "/dashboard",
  },

  // ── 9. Re-engagement ──────────────────────────────────────────────────────
  {
    id: "we-miss-you",
    title: "We miss you",
    subject: "{{FIRST_NAME}}, your job matches are piling up while you have been away",
    preheader: "New roles matched to your profile are waiting. It takes 60 seconds to check in.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A bright, warm, inviting office space with open natural light",
    eyebrow: "We saved your spot",
    headline: "Your matched jobs are still here, waiting for you",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, you have not logged in for a while, and we wanted to reach out because we did not want you to miss what has come in since your last visit. The Kenyan job market has been active. New postings arrive every day, and several of them have been matched to your profile while you have been away.",
      },
      {
        type: "paragraph",
        text: "We understand that life gets complicated. Job searching is emotionally demanding work, and it is completely normal to step away from it when the process starts to feel overwhelming. That is part of why we built the monitors and the auto-apply feature: so that your search can make progress even during the periods when you are not able to check in actively. But right now, checking in is what matters most.",
      },
      { type: "heading", text: "What is waiting for you in your dashboard" },
      {
        type: "list",
        items: [
          "Fresh job matches based on your skills, experience, and preferred locations that were collected while you were away",
          "Any alerts from job monitors you had set up before your last visit",
          "Interview practice questions for the roles you had saved or applied to previously",
          "The current status of every application you submitted, including any that may have progressed or expired",
          "Referral rewards if any of your friends signed up using your link while you were away",
        ],
      },
      {
        type: "paragraph",
        text: "The job market does not pause, and the window on specific roles can close quickly. A strong match that was posted three weeks ago may already be filled. But new matches are arriving every day, and the next one could be exactly what you have been looking for.",
      },
      {
        type: "paragraph",
        text: "It takes about sixty seconds to log back in and see what has changed. Not sixty minutes, not a commitment to an intense application session. Just sixty seconds to see what is there and decide if any of it is worth pursuing today.",
      },
      {
        type: "paragraph",
        text: "If your circumstances have genuinely changed and you are no longer actively searching right now, that is completely fine too. Your profile, your saved jobs, your application history, and your referral earnings are all exactly where you left them. Come back whenever you are ready.",
      },
    ],
    ctaLabel: "See your new matches",
    ctaPath: "/jobs",
  },

  // ── 10. Profile completion ────────────────────────────────────────────────
  {
    id: "complete-your-profile",
    title: "Finish your profile for better matches",
    subject: "Your profile is not complete yet, and your job matches are suffering for it",
    preheader: "A complete profile gets significantly more relevant matches. It takes under five minutes.",
    heroImage:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person carefully completing an online form on a laptop at home",
    eyebrow: "Profile tips",
    headline: "Complete your profile in five minutes, get better matches all month",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, when you first joined Tellus, you uploaded your CV and got your account set up. That is a great starting point and it gives our matching algorithm something real to work with. But there are several profile fields that sit outside your CV, and the ones that are still empty are actively limiting the quality of your matches.",
      },
      {
        type: "paragraph",
        text: "Our matching system combines the structured data from your CV with the preferences and context you set directly in your profile. When profile fields are empty, the system makes assumptions, and assumptions are never as accurate as the real thing. Here is exactly what to fill in and why each field matters.",
      },
      { type: "heading", text: "Your current county and preferred work location" },
      {
        type: "paragraph",
        text: "Location is one of the most powerful filters in job matching. Without it, you will see roles that require relocation when you have not indicated you are open to moving, and you may miss regional employers who specifically want local candidates. Filling in your county takes ten seconds and immediately narrows your matches to roles that are genuinely accessible to you.",
      },
      { type: "heading", text: "Your preferred job types and industries" },
      {
        type: "paragraph",
        text: "This selection tells our system where to concentrate its attention. Without it, every role in every industry is treated as equally relevant, which means your feed is much broader and much noisier than it needs to be. Even a simple selection of two or three preferred industries transforms your matches from a wide net to a focused shortlist.",
      },
      { type: "heading", text: "Your skills and certifications" },
      {
        type: "paragraph",
        text: "Your CV mentions many of your skills in context, but the explicit skills section is what the matching algorithm uses at the most granular level, and it is also what appears when employers search for candidates by skill. List every skill you have, including the ones that feel obvious or basic. A missing skill is a missed match, and you will never know which role you did not see because of a skill you forgot to list.",
      },
      { type: "heading", text: "Your availability and notice period" },
      {
        type: "paragraph",
        text: "Employers want to know when you can start. A candidate who is available immediately is a different proposition to one with a three-month notice period. Adding this information puts you ahead of candidates who leave it blank, because it removes a variable the employer would otherwise have to ask about before they can move forward.",
      },
      { type: "heading", text: "How to complete everything in under five minutes" },
      {
        type: "list",
        items: [
          "Open your profile page from the main dashboard navigation",
          "Look for the completion percentage at the top of the page",
          "Work through each section marked as incomplete, starting with location and skills",
          "Most fields take under thirty seconds to fill in",
          "Save each section as you go so your progress is preserved",
          "Return to your profile after any major career change to keep the information current",
        ],
      },
    ],
    ctaLabel: "Complete your profile",
    ctaPath: "/dashboard",
  },

  // ── 11. Cover letter guide ─────────────────────────────────────────────────
  {
    id: "cover-letter-guide",
    title: "Write cover letters that get read",
    subject: "Most cover letters are ignored within three seconds. Here is how to write one that gets read",
    preheader: "A great cover letter opens doors a CV alone cannot. Here is the formula that works.",
    heroImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person writing thoughtfully at a desk with warm natural light",
    eyebrow: "Application advice",
    headline: "The cover letter formula that actually gets responses",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, cover letters occupy a strange position in the hiring process. Many recruiters claim they do not read them. Yet in study after study, candidates with strong cover letters consistently reach the interview stage at higher rates than those who submit a CV alone or attach a generic one-paragraph covering note. The truth is that a bad cover letter is ignored. A good one is remembered.",
      },
      {
        type: "paragraph",
        text: "The problem is that most cover letters are bad. They open with 'I am writing to apply for the position of...' which adds nothing. They summarise the CV that is attached, which is redundant. They close with 'I look forward to hearing from you at your earliest convenience,' which is passive and forgettable. Here is a structure that is none of those things.",
      },
      { type: "heading", text: "Open with a specific reason you want this particular role" },
      {
        type: "paragraph",
        text: "Your first sentence should tell the reader something specific about the company or the role that genuinely attracted you. Not 'I am passionate about finance,' but 'When I read that your team is building Kenya's first fully automated payroll platform for SMEs, I immediately wanted to know more, because I have spent the last four years watching exactly that problem create real pain for small business owners I have worked with.' Specific, grounded, and demonstrably informed.",
      },
      { type: "heading", text: "Connect your most relevant experience to their most pressing need" },
      {
        type: "paragraph",
        text: "Read the job description and identify the single most important thing they are looking for, the capability or quality that appears at the top or is repeated most often. Then write one paragraph, no more than five sentences, describing a specific example from your own career that directly addresses that need. Use numbers and outcomes wherever you have them. Make the connection between what they need and what you have done as explicit and concrete as possible.",
      },
      { type: "heading", text: "Address any obvious concern directly and briefly" },
      {
        type: "paragraph",
        text: "If you are changing industries, explain in one sentence why you are making the move and what you are carrying across. If you are applying for a more senior role than you have held before, name the gap and explain how you have already been operating at that level informally. Recruiters notice these things. Addressing them upfront turns a potential concern into evidence of self-awareness. Leaving them unaddressed turns them into reasons to move on.",
      },
      { type: "heading", text: "Close with a confident, specific ask" },
      {
        type: "paragraph",
        text: "Do not end with a vague expression of hope. End with a direct invitation that makes the next step obvious. Something like: 'I would genuinely welcome the chance to talk through how my background in supply chain operations maps to what you are building with this role. I am available for a conversation at any point next week.' Specific availability. Specific connection to the role. A clear, low-friction next step.",
      },
      {
        type: "paragraph",
        text: "Tellus generates a tailored cover letter automatically for every role you apply to, using the actual job description and your CV as inputs. You can use it as-is, edit it to add your voice, or use it as a structural starting point for your own version. The output is never generic, and it always draws an explicit connection between the role's requirements and your specific background.",
      },
    ],
    ctaLabel: "Apply to a job now",
    ctaPath: "/jobs",
  },

  // ── 12. Weekly digest ────────────────────────────────────────────────────
  {
    id: "weekly-job-digest",
    title: "Your weekly job digest",
    subject: "This week's top matched roles in Kenya — collected and ranked for {{FIRST_NAME}}",
    preheader: "Fresh openings matched to your profile. Do not let this week's best roles go unread.",
    heroImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "An aerial view of a vibrant Nairobi business district on a clear day",
    eyebrow: "Weekly digest",
    headline: "New this week across Kenya's job market",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, here is your weekly summary of what the Kenyan job market produced in the past seven days, filtered and matched to your profile. We track dozens of sources and this digest is designed to make sure that nothing relevant slips through the gaps while you are busy getting on with the rest of your life.",
      },
      { type: "heading", text: "How to get the most out of this digest" },
      {
        type: "list",
        items: [
          "Click through to your jobs page and sort by match score to see your strongest fits at the top",
          "Save any roles that catch your attention so they are tracked in your application dashboard even if you do not apply immediately",
          "Apply through Tellus directly so your cover letter is automatically tailored to that specific posting",
          "If you spotted a keyword or role type this week that you want us to track going forward, set a new monitor before you close the browser",
        ],
      },
      { type: "heading", text: "Roles that tend to fill before the next digest arrives" },
      {
        type: "paragraph",
        text: "Senior finance and accounting roles at established Nairobi firms typically receive 50 or more applications within 48 hours of going live. Entry-level and junior tech roles at funded startups often fill within a week. Marketing and communications positions at NGOs and international organisations frequently close early when they receive a strong batch of early applicants. If you see something this week that genuinely excites you, the right time to apply is today.",
      },
      { type: "heading", text: "A note on consistency" },
      {
        type: "paragraph",
        text: "The single most consistent predictor of job search success on Tellus is not the quality of the CV, though that matters. It is not the strength of the profile, though that matters too. It is the consistency of activity. Users who apply to at least three roles per week are significantly more likely to land an interview within thirty days than those who apply sporadically. A job search is a volume and timing game as much as a quality game.",
      },
      {
        type: "paragraph",
        text: "This digest lands every week whether the market has been active or quiet. Use it as your weekly checkpoint. Twenty minutes of focused attention on your search, every seven days, compounds into something meaningful over a month.",
      },
    ],
    ctaLabel: "View this week's matches",
    ctaPath: "/jobs",
  },

  // ── 13. First application milestone ──────────────────────────────────────
  {
    id: "first-application-sent",
    title: "You sent your first application",
    subject: "Your first application is in. Here is exactly what to do in the next 48 hours.",
    preheader: "The hardest part is done. Here is how to maximise your chances from this moment forward.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person celebrating a real milestone at their laptop with visible satisfaction",
    eyebrow: "Milestone",
    headline: "First application sent. Now let us build momentum.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, you have sent your first application through Tellus Jobs. That is a real step, and not a trivial one. Inertia is one of the biggest obstacles in a job search, and you have overcome it. Now the task is to make sure that first application leads somewhere, and to build the kind of consistent activity that turns a single application into a pipeline.",
      },
      { type: "heading", text: "Apply to at least two more roles in the next 48 hours" },
      {
        type: "paragraph",
        text: "A single application almost never generates enough momentum on its own. Job searching is partly a numbers game. The more qualified applications you have in the market at any given time, the more likely you are to receive responses, move to interviews, and ultimately generate the competitive situation where you have choices rather than waiting on a single outcome. Aim for at least three applications per week as your baseline activity level.",
      },
      { type: "heading", text: "Track this application in your dashboard" },
      {
        type: "paragraph",
        text: "Your application tracker shows the status of every role you have applied to through Tellus. Update it whenever you receive a response, move to an interview stage, or decide to withdraw your application. Keeping it current means you always know exactly where you stand across every active thread, and you never accidentally drop the ball on a follow-up.",
      },
      { type: "heading", text: "Set a follow-up reminder for seven to ten business days from now" },
      {
        type: "paragraph",
        text: "If you have not heard back within seven to ten business days, a brief and professionally worded follow-up is entirely appropriate and generally well-received. Keep it short: introduce yourself, reference the role and the date you applied, express that you remain genuinely interested, and ask whether there is any additional information you can provide to support your application. That is the whole email. Short, confident, and not at all pushy.",
      },
      { type: "heading", text: "Start preparing for the interview before you get the call" },
      {
        type: "paragraph",
        text: "The candidates who perform best in interviews are rarely the ones who started preparing after the recruiter called. They are the ones who started preparing the day they submitted the application. Open the interview practice tool for this specific role right now, run through the likely questions, write out your core stories, and spend thirty minutes on it today. By the time the call comes, you will already be ready.",
      },
      { type: "heading", text: "Keep your pipeline diverse" },
      {
        type: "paragraph",
        text: "Apply to roles at different types of organisations, not just your dream company. Apply to some stretch roles where you meet about 70 percent of the criteria, some strong matches where your fit is clear, and some safety roles where your background is an obvious fit. A diverse pipeline gives you interview practice across different environments, keeps your confidence high, and maximises the chances that multiple offers arrive in the same window.",
      },
    ],
    ctaLabel: "View your applications",
    ctaPath: "/dashboard",
  },

  // ── 14. Upgrade to premium ────────────────────────────────────────────────
  {
    id: "upgrade-to-premium",
    title: "Upgrade to premium",
    subject: "Unlock the full power of Tellus Jobs — here is what premium actually gives you",
    preheader: "Auto-apply, unlimited cover letters, priority matching and more. All in one plan.",
    heroImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A focused professional reviewing detailed analytics on a large bright monitor",
    eyebrow: "Go premium",
    headline: "The tools serious job seekers use every day",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, the free plan gives you a genuinely strong foundation: job matching, the application tracker, the AI job coach, and interview practice. These tools alone put you ahead of most candidates in the Kenyan market. But if you are actively searching and want to move faster, the premium features are where things shift from good to exceptional.",
      },
      { type: "heading", text: "What premium adds on top of everything you already have" },
      {
        type: "list",
        items: [
          "Unlimited tailored cover letters for every role you apply to, with no monthly cap",
          "Auto-apply workflows that identify matching roles and submit applications in the background while you sleep",
          "Priority job matching so you see fresh roles before free-plan users do",
          "Unlimited interview practice sessions with full written feedback on every answer",
          "Full AI job coach access with extended conversation memory so the coach remembers your previous sessions",
          "Advanced application analytics showing which role types, industries, and seniority levels your profile performs strongest in",
          "Resume scoring with specific, prioritised improvement suggestions calibrated to each role before you apply",
          "Dedicated support with meaningfully faster response times than the standard queue",
        ],
      },
      { type: "heading", text: "A different way to think about the cost" },
      {
        type: "paragraph",
        text: "Most people think of premium as a subscription expense. A more useful frame is to think of it as an investment in the speed of your next career move. If premium features help you land your target role even four weeks sooner than you would have without them, the return on that investment is enormous. Four weeks of salary at almost any level in Kenya significantly outweighs the cost of premium many times over. The question is not whether the features are worth paying for. It is whether landing sooner is worth paying for.",
      },
      { type: "heading", text: "You can also earn premium through referrals" },
      {
        type: "paragraph",
        text: "Every friend you refer who signs up and verifies their email earns you a free month of premium. There is no cap on how many months you can earn. Ten referrals is ten free months. The program never expires, and you can track every referral in real time from your dashboard.",
      },
    ],
    ctaLabel: "Explore premium features",
    ctaPath: "/dashboard",
  },

  // ── 15. Career change guide ───────────────────────────────────────────────
  {
    id: "career-change-guide",
    title: "Changing careers? Read this first",
    subject: "Thinking about a career change? Here is the honest roadmap before you apply anywhere",
    preheader: "Career changes are more achievable than most people believe. Here is the real process.",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person standing at a wide open crossroads looking forward with purpose",
    eyebrow: "Career change",
    headline: "The honest guide to switching industries or roles",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, career changes have become far more common and far more accepted than they were even a decade ago. Employers across Kenya increasingly recognise that people who have worked in multiple industries often bring perspectives and capabilities that specialists in a single field do not. The stigma around changing direction has faded significantly. The practical challenges, however, remain real. Here is an honest guide to navigating them.",
      },
      { type: "heading", text: "Start by mapping your transferable skills accurately" },
      {
        type: "paragraph",
        text: "Before you decide what you are missing, make a complete and honest inventory of what you already have. Every industry values communication, problem-solving, project management, stakeholder management, analytical thinking, and the ability to learn quickly. Before you conclude that you are unqualified for a new field, make sure you have genuinely counted everything that transfers. Most people discover that far more crosses over than they initially assumed.",
      },
      { type: "heading", text: "Identify the specific gap, not the vague one" },
      {
        type: "paragraph",
        text: "Vague awareness that you lack experience in a new field is not actionable. What is actionable is knowing exactly which qualification, certification, or demonstrated skill appears consistently in the job descriptions for roles you are targeting, and which of those you currently do not have. For many career changers, the actual gap is much narrower than it feels. And for most skills gaps, the shortest credible path to closing them is a focused online course or a certification program, not a second degree.",
      },
      { type: "heading", text: "Target roles that deliberately bridge both worlds" },
      {
        type: "paragraph",
        text: "The most effective entry point into a new industry is almost always a role that explicitly values experience from your previous field. A lawyer moving into tech consulting is a better candidate for 'legal tech implementation manager' than for a pure software development role. An accountant transitioning to financial technology is a stronger candidate for 'fintech operations analyst' than for a product management role they have no prior context for. Use your existing credibility as the wedge. Expand from there once you are inside the new industry.",
      },
      { type: "heading", text: "Reframe your CV for a reader who does not know your field" },
      {
        type: "paragraph",
        text: "Your CV was written for readers in your current industry. A recruiter in a different field may not recognise your titles, your company names, or the significance of your achievements. Rewrite your professional summary to speak to a recruiter who has never worked in your sector. Lead with your transferable achievements, not your industry-specific job titles. Use language from the job descriptions in the field you are moving into, not the jargon of the one you are leaving.",
      },
      {
        type: "paragraph",
        text: "The AI job coach inside Tellus is particularly well suited to career change planning. Tell it where you currently are, where you want to go, and your timeline. It will give you a specific, realistic action plan grounded in your actual background rather than generic advice.",
      },
    ],
    ctaLabel: "Talk to the career coach",
    ctaPath: "/dashboard",
  },

  // ── 16. How Tellus revolutionises job applications ────────────────────────
  {
    id: "how-tellus-revolutionises-applying",
    title: "How Tellus is changing job applications",
    subject: "The old way of applying for jobs is broken. Here is what we built instead.",
    preheader: "Most job application processes were designed for employers, not candidates. We changed that.",
    heroImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A modern workspace with people collaborating on something new and important",
    eyebrow: "Our story",
    headline: "We built Tellus because the old way was failing everyone",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, before we tell you how to get more out of Tellus, we want to tell you why we built it. Because the 'why' is the part that explains every decision we made, every feature we prioritised, and every thing we deliberately chose not to build.",
      },
      {
        type: "paragraph",
        text: "The traditional job application process in Kenya, and most of the world, was designed primarily for employers. Post a role. Collect CVs. Filter manually. Interview the most promising. The candidate's experience in this process was an afterthought at best. You were expected to submit the same document to dozens of different companies, write a fresh cover letter each time, track your progress in a spreadsheet, and wait weeks for responses that often never came. It was, and in most places still is, deeply inefficient and demoralising.",
      },
      { type: "heading", text: "What we decided to change" },
      {
        type: "paragraph",
        text: "We started with one question: what would the job application process look like if it were designed entirely around the candidate rather than the employer? What if instead of you searching for jobs, jobs came to you, already filtered and ranked by relevance? What if instead of writing a new cover letter for every role, you reviewed a draft that already referenced the specific job description and your specific background? What if instead of maintaining a spreadsheet, you had a live dashboard that tracked every application automatically?",
      },
      { type: "heading", text: "The AI layer that makes this possible" },
      {
        type: "paragraph",
        text: "None of this was achievable before large-scale AI became practically accessible. Matching a candidate to the right role is a complex, contextual task. Writing a genuinely tailored cover letter requires understanding both the job description and the candidate's history at a level of nuance that no template engine can replicate. Preparing personalised interview questions requires knowing both the role and the specific gaps in the candidate's stated experience.",
      },
      {
        type: "paragraph",
        text: "Modern AI does all of these things well. We built Tellus on top of it, specifically for the Kenyan market, with data from Kenyan job boards, Kenyan employers, and the Kenyan salary landscape. The result is a system that understands the local context rather than applying a global template to a market with its own specific dynamics.",
      },
      { type: "heading", text: "What this means for you, practically" },
      {
        type: "list",
        items: [
          "You upload your CV once and our system understands your professional identity from that point forward",
          "You see only jobs that are genuinely relevant to your background, ranked by how strong the match is",
          "Every cover letter you send is written specifically for the role you are applying to, not adapted from a template",
          "Your entire application history is tracked automatically, with status updates as things progress",
          "You can practice for a specific interview before it happens and receive feedback before you are in the room",
          "When you are ready to negotiate your offer, the coach that knows your CV and your target role is right there to help",
        ],
      },
      {
        type: "paragraph",
        text: "We believe this is what job searching should have been from the beginning. And we are only getting started.",
      },
    ],
    ctaLabel: "See it in action",
    ctaPath: "/jobs",
  },

  // ── 17. The future of job searching ──────────────────────────────────────
  {
    id: "future-of-job-searching",
    title: "The future of job searching in Kenya",
    subject: "Kenya's job market is changing faster than most people realise. Here is what to expect.",
    preheader: "AI, remote work, and skills-based hiring are reshaping who gets hired and why.",
    heroImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A futuristic city skyline at dusk representing progress and transformation",
    eyebrow: "Industry insight",
    headline: "The job market of 2025 and beyond is being built right now",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, the way people find work in Kenya is changing faster than most job seekers and, frankly, most employers realise. Understanding what is shifting, and why, will give you a genuine advantage over candidates who are still operating on assumptions from five years ago. Here is what the data and the trends are actually showing.",
      },
      { type: "heading", text: "Skills are replacing credentials as the primary hiring signal" },
      {
        type: "paragraph",
        text: "For the past several decades, a university degree was a reliable proxy for competence in many fields. Employers used it as a filter because it was a standardised signal in a sea of unstandardised information. That is changing rapidly. Employers are increasingly finding that candidates with specific, demonstrable skills outperform candidates with impressive credentials but weaker practical capability.",
      },
      {
        type: "paragraph",
        text: "The practical implication for you is significant. If you have been thinking of yourself as underqualified for a role because of your educational background, that assumption is worth revisiting. What specific skills does the role require? Can you demonstrate those skills? That question is becoming more relevant than what your degree says.",
      },
      { type: "heading", text: "Remote and hybrid work has permanently expanded the market" },
      {
        type: "paragraph",
        text: "The pandemic forced many Kenyan companies to operate with distributed teams for the first time, and a meaningful proportion of them discovered that the sky did not fall. Productivity was maintained. Communication adapted. The fixed assumption that knowledge workers must be physically present in an office to do their jobs effectively was challenged by lived experience. The result is that a growing number of Kenyan roles now offer hybrid arrangements, and a smaller but significant number are fully remote.",
      },
      {
        type: "paragraph",
        text: "This matters for your job search because it means the relevant market for your skills may be larger than your physical location suggests. A developer in Mombasa can legitimately apply for roles at Nairobi-based tech companies that now hire remotely. A finance professional in Kisumu can target international organisations with Kenyan operations that do not require daily in-person attendance.",
      },
      { type: "heading", text: "AI is changing which skills are durable and which are at risk" },
      {
        type: "paragraph",
        text: "AI tools are automating a growing range of tasks that were previously done by humans: data entry, basic analysis, first-draft writing, scheduling, and many forms of standard research. This is a genuine disruption for some roles and a genuine enhancement for others. The skills that remain most durable are those that require genuine human judgment, contextual understanding, relationship management, creative problem-solving, and ethical reasoning.",
      },
      {
        type: "paragraph",
        text: "The practical implication is not to avoid AI but to learn how to work with it. Candidates who can use AI tools effectively to amplify their output are becoming significantly more valuable than candidates who resist or ignore them. The question to ask yourself is not 'Will AI take my job?' but 'Am I using AI to do my job better than everyone else?'",
      },
      { type: "heading", text: "What to do with this information" },
      {
        type: "paragraph",
        text: "Update your CV to lead with specific, demonstrable skills rather than credentials. Explore whether any roles you are targeting have introduced hybrid or remote arrangements since the last time you checked. And start experimenting with AI tools in your own workflow so you arrive at every interview able to speak credibly about how you use them. These three things will make you a more competitive candidate in the market as it actually exists today.",
      },
    ],
    ctaLabel: "Update your skills profile",
    ctaPath: "/dashboard",
  },

  // ── 18. Personal branding ─────────────────────────────────────────────────
  {
    id: "personal-branding-for-job-seekers",
    title: "Build your personal brand as a job seeker",
    subject: "Your LinkedIn profile may be costing you interviews you never know about",
    preheader: "Recruiters research candidates before reaching out. Here is what they should find.",
    heroImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A professional setting up a well-lit workspace for online presence",
    eyebrow: "Personal branding",
    headline: "What recruiters find when they search for you matters enormously",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, here is something that most job seekers do not think about: by the time a recruiter reaches out to you, they have almost certainly already looked you up. They have searched your name, visited your LinkedIn profile, and formed a first impression before a single word has been exchanged. The question is not whether you have a personal brand online. It is whether the one you have is working for you or against you.",
      },
      { type: "heading", text: "Your LinkedIn profile is your most important external document" },
      {
        type: "paragraph",
        text: "LinkedIn is where most professional recruiting happens in Kenya. It is where recruiters search for candidates by skill and location, where they verify the claims on a CV, and where they form their first impression of you as a professional. A thin or neglected LinkedIn profile sends a signal, even if you never intended it to. Here is what a strong one looks like.",
      },
      {
        type: "paragraph",
        text: "Your headline should not just be your current job title. It should communicate what you do and who you do it for. 'Financial Analyst' tells someone what you are. 'Financial Analyst helping Kenyan SMEs understand their cash flow and make better decisions' tells them what you are worth. Your summary should read like a confident, conversational version of your professional story, written for a reader who does not know your company or your industry.",
      },
      { type: "heading", text: "Post content that demonstrates your thinking" },
      {
        type: "paragraph",
        text: "Candidates who post regularly on LinkedIn, even once a week, are significantly more visible to the recruiter community than those who only update their profile when they are looking for a job. You do not need to write essays. A short observation about something you learned at work, a question you are genuinely curious about in your industry, or a brief description of a problem you solved are all legitimate, valuable content that signals expertise and thoughtfulness.",
      },
      { type: "heading", text: "Ask for recommendations from people who can speak specifically" },
      {
        type: "paragraph",
        text: "A LinkedIn recommendation from a former manager or client that describes a specific project and a specific outcome is worth far more than a generic one. When you ask for recommendations, be specific about what you would like them to mention. Make it easy for them to write something useful by suggesting the context, the project, and the outcome you would like highlighted.",
      },
      { type: "heading", text: "Google yourself and take ownership of the results" },
      {
        type: "paragraph",
        text: "Open an incognito browser window and search your full name. Read the first two pages of results. If your LinkedIn profile is not prominently positioned, make sure it is fully complete and actively used. If something problematic appears, take appropriate steps to address it. The goal is not to manufacture a false impression; it is to make sure the accurate, professional version of you is what recruiters encounter.",
      },
    ],
    ctaLabel: "Update your Tellus profile",
    ctaPath: "/dashboard",
  },

  // ── 19. Networking ────────────────────────────────────────────────────────
  {
    id: "networking-in-kenya",
    title: "Network your way into your next role",
    subject: "Most jobs in Kenya are never publicly posted. Here is how to find them.",
    preheader: "The hidden job market is real. Relationships are still the most reliable path to it.",
    heroImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "People in professional conversation at a well-lit networking event",
    eyebrow: "Networking",
    headline: "The jobs you want may never be posted publicly",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, a significant proportion of senior and mid-level roles in Kenya are never advertised publicly. They are filled through networks: a hiring manager who thinks of someone they know, a recruiter who reaches out to a candidate they have been watching, or a referral from a current employee whose judgment the employer trusts. If you are only applying to publicly posted roles, you are competing in the part of the market where the competition is highest and your personal relationship with the decision-maker is zero.",
      },
      { type: "heading", text: "The principle behind good professional networking" },
      {
        type: "paragraph",
        text: "Most people misunderstand professional networking as an activity you do when you need something. As a result, it feels transactional and uncomfortable. The more accurate and more useful frame is this: professional networking is the process of building genuine relationships with people who are interesting and doing work you care about. You do it continuously, not just when you are looking for a job. When the moment comes that you need help, you are reaching out to people who already know you and value your relationship, not strangers you are asking for a favour.",
      },
      { type: "heading", text: "Where to start if your network is thin" },
      {
        type: "list",
        items: [
          "Reconnect with former colleagues from any role you have held, even briefly, by sending a genuine message about something specific to them",
          "Join LinkedIn groups and active WhatsApp communities organised around your industry or profession in Kenya",
          "Attend professional events, industry meetups, and conferences where your target employers send their teams",
          "Engage substantively with content posted by people in your target companies, not just liking but commenting with a specific, thoughtful response",
          "Reach out to people whose LinkedIn profiles suggest they moved into roles you are targeting, and ask if they would share ten minutes to talk about their path",
        ],
      },
      { type: "heading", text: "The informational interview" },
      {
        type: "paragraph",
        text: "An informational interview is a structured thirty-minute conversation with someone working in a company or role you are interested in. You are not asking them for a job. You are asking them to help you understand the landscape. What is the culture like? What skills does the team value most? What do they wish they had known before joining? These conversations accomplish two things simultaneously: you get valuable intelligence about a potential employer, and you build a relationship with someone inside the organisation who may think of you when a role opens up.",
      },
      {
        type: "paragraph",
        text: "Use Tellus to identify the companies and roles you are targeting, then use LinkedIn to find people inside those organisations who might be willing to have this conversation. The success rate of a thoughtful, specific outreach message is higher than most people expect.",
      },
    ],
    ctaLabel: "Find your target companies",
    ctaPath: "/jobs",
  },

  // ── 20. Remote work opportunities ─────────────────────────────────────────
  {
    id: "remote-work-opportunities",
    title: "Find remote work from Kenya",
    subject: "Remote roles that pay competitively are more accessible to Kenyan professionals than ever",
    preheader: "Thousands of international companies are actively hiring remote talent from Kenya.",
    heroImage:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A professional working productively from a comfortable home office",
    eyebrow: "Remote work",
    headline: "The world is hiring. You do not have to relocate to access it.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, one of the most significant shifts in the Kenyan professional landscape over the past four years is the emergence of remote work as a viable, permanent option for a growing category of roles. International companies that previously required candidates to be physically located in their home country are now actively seeking talent from Kenya specifically because of the quality of the workforce and the favorable time zone overlap with European markets.",
      },
      { type: "heading", text: "Which roles are most commonly available remotely" },
      {
        type: "list",
        items: [
          "Software development and engineering across all stacks and seniority levels",
          "Product management and UX design for technology companies",
          "Customer success and support roles for SaaS companies targeting African or emerging markets",
          "Finance and accounting for international businesses with Kenyan or East African operations",
          "Content writing, copywriting, and digital marketing for global brands",
          "Data analysis and business intelligence for companies that operate across multiple time zones",
          "Virtual assistance and executive support for founders and C-suite leaders globally",
        ],
      },
      { type: "heading", text: "What international employers look for from Kenyan candidates" },
      {
        type: "paragraph",
        text: "English fluency is a significant advantage, and Kenya's high standard of professional English is increasingly well known in international hiring circles. Beyond language, international employers value the same things domestic employers value: demonstrated skills, specific past achievements, and the ability to communicate clearly and proactively in an asynchronous environment. The one additional requirement is comfort with remote work tools and practices, which any candidate can develop.",
      },
      { type: "heading", text: "How to position your CV for international remote roles" },
      {
        type: "paragraph",
        text: "International employers reading a Kenyan CV may not be familiar with the companies you have worked for. This means your achievements need to be self-explanatory without relying on brand recognition. Add a one-sentence description of each company you have worked for: what it does, how large it is, and what market it serves. Replace local industry jargon with internationally recognised terminology. And lead with your outcomes, not your activities.",
      },
      {
        type: "paragraph",
        text: "Tellus tracks remote-friendly openings alongside domestic roles. Filter your job matches by 'Remote' in the location field to see what is currently available for candidates based in Kenya.",
      },
    ],
    ctaLabel: "Browse remote opportunities",
    ctaPath: "/jobs",
  },

  // ── 21. Standing out in a competitive market ──────────────────────────────
  {
    id: "stand-out-in-competitive-market",
    title: "How to stand out when everyone is qualified",
    subject: "When every candidate has the right credentials, here is what actually separates them",
    preheader: "In a strong talent market, the differentiator is rarely the CV. Here is what it actually is.",
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A group of diverse professionals in a bright collaborative workspace",
    eyebrow: "Job search strategy",
    headline: "In a competitive field, the details decide who gets the call",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, when a recruiter posts a role and receives sixty qualified applications, they face a specific problem: the candidates who are actually qualified are not meaningfully different from each other on paper. The CV filters for competence, not for the qualities that predict whether someone will thrive in a specific team at a specific company in a specific cultural environment. Understanding this changes how you approach your search.",
      },
      { type: "heading", text: "The cover letter is your only pre-interview voice" },
      {
        type: "paragraph",
        text: "When every CV in the pile demonstrates the required qualifications, the cover letter becomes the only thing that can differentiate you before the interview. It is the one place where your actual thinking, your specific curiosity about the role, and your ability to communicate with clarity and confidence are visible. A mediocre cover letter says nothing. A great one makes the recruiter want to meet you.",
      },
      { type: "heading", text: "Speed of application matters more than most people know" },
      {
        type: "paragraph",
        text: "In a high-volume hiring process, the first genuinely strong application often sets the benchmark against which all subsequent ones are compared. Applying early does not guarantee success, but applying late significantly reduces your chances. Set up monitors for your target roles so you are among the first applicants every time.",
      },
      { type: "heading", text: "Specificity is the antidote to sounding like everyone else" },
      {
        type: "paragraph",
        text: "Generic applications feel generic. Every sentence that could apply to any candidate of your background will be read as if it does apply to any candidate. The antidote is specificity. Reference a specific product the company makes that you use or admire. Name a specific piece of work from your history that directly maps to the role's stated requirements. Mention a specific thing about the team or the company's direction that attracted you to this role over competing opportunities.",
      },
      { type: "heading", text: "Follow up in a way that reinforces your interest" },
      {
        type: "paragraph",
        text: "If you interviewed and have not heard back within the stated timeline, a polite, brief follow-up email is appropriate and, when done well, works in your favour. It demonstrates persistence, organisation, and genuine interest without being aggressive. One follow-up email, timed correctly, can be the difference between remaining active in a process and being passed over simply because the recruiter moved on.",
      },
      { type: "heading", text: "Invest in the areas others skip" },
      {
        type: "paragraph",
        text: "Interview preparation is the single most skipped step in the process, which means it is also the area where disciplined candidates gain the most ground. While other candidates are winging behavioural questions in the room, the candidates who practiced them ten times in advance are giving polished, structured, confident answers. The preparation gap is real, and Tellus's interview practice tool exists to close it.",
      },
    ],
    ctaLabel: "Start practicing interviews",
    ctaPath: "/dashboard",
  },

  // ── 22. Managing job search burnout ──────────────────────────────────────
  {
    id: "managing-job-search-burnout",
    title: "Dealing with job search fatigue",
    subject: "Job searching is emotionally hard. Here is how to keep going when it stops feeling worth it.",
    preheader: "Rejection is part of the process. Here is how to keep your confidence and momentum intact.",
    heroImage:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person taking a quiet moment outdoors, recharging in natural light",
    eyebrow: "Mental health",
    headline: "The job search is a marathon. Here is how to keep going.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, job searching is emotionally hard in a way that most people are not prepared for and few feel comfortable admitting. You put real effort into an application, you do not hear back. You get to an interview, you feel good about it, and then you receive a brief email that says they have decided to move forward with another candidate. You wonder what went wrong, whether your CV is the problem, whether your experience is genuinely good enough. The doubt accumulates.",
      },
      {
        type: "paragraph",
        text: "This is a completely normal experience. It does not mean you are unqualified. It often does not mean your application was weak. Hiring involves an enormous amount of randomness. The role you were shortlisted for may have been quietly earmarked for an internal candidate before the posting went live. The interview panel may have had a preference for an industry background that was never stated in the job description. The process is imperfect, and outcomes are only partially a function of your merit.",
      },
      { type: "heading", text: "Structure is the best defence against the emotional volatility of job searching" },
      {
        type: "paragraph",
        text: "Candidates who treat job searching like a project, with defined daily activities, clear weekly goals, and a tracking system, are less affected by individual rejections than those who search reactively and measure their wellbeing by the outcome of each application. When you have a structure, a rejection is data about one data point rather than a verdict on your worth.",
      },
      { type: "heading", text: "Set activity goals, not outcome goals" },
      {
        type: "paragraph",
        text: "You cannot control whether you receive a callback. You can control how many quality applications you send per week, how many people you reach out to for informational conversations, how many practice interviews you do, and how consistently you update your profile. Set your weekly targets around these activities, not around responses. Consistent activity is the only reliable input you control.",
      },
      { type: "heading", text: "Take the days off when you need to" },
      {
        type: "paragraph",
        text: "Job searching does not require you to work on it seven days a week. In fact, candidates who push through relentlessly without rest tend to produce lower-quality applications over time as their energy and optimism erode. Build deliberate rest into your process. Take weekends off from active searching. Do things that restore your confidence and remind you of your value outside of a professional context.",
      },
      { type: "heading", text: "Talk about it with people you trust" },
      {
        type: "paragraph",
        text: "The isolation of job searching is one of its least discussed difficulties. You are going through something genuinely challenging, and it is easy to feel that you cannot talk about it because it might make you look desperate or defeated. Find at least one or two people in your life with whom you can be honest about how it is going. The combination of practical support and emotional acknowledgement is more useful than either alone.",
      },
      {
        type: "paragraph",
        text: "Tellus is here to reduce the workload, but not to replace the human dimension. Use the platform to handle the repetitive, time-consuming parts of your search. Save the energy you free up for the interactions and decisions that require your full attention and judgment.",
      },
    ],
    ctaLabel: "Open your dashboard",
    ctaPath: "/dashboard",
  },

  // ── 23. Entry-level guide ─────────────────────────────────────────────────
  {
    id: "entry-level-job-hunting",
    title: "Getting your first professional role",
    subject: "Looking for your first real job? Here is the strategy that actually works in Kenya.",
    preheader: "No experience required to get experience. Here is the honest roadmap for graduates.",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Recent graduates celebrating their transition into the professional world",
    eyebrow: "For graduates",
    headline: "Getting your first role is a specific skill. Here is how to develop it.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, the entry-level job market has a frustrating circular logic that almost every recent graduate encounters: you need experience to get a job, but you need a job to get experience. This guide is about how to break that loop. The strategies here are practical, specific, and drawn from what actually works for candidates at the start of their careers in the Kenyan market.",
      },
      { type: "heading", text: "Lead with what you have, not what you lack" },
      {
        type: "paragraph",
        text: "Every entry-level candidate lacks professional experience. That is the definition of entry-level. The question is not whether you have experience but whether you have done anything that demonstrates the qualities the employer is looking for. University projects that involved real work, internships, volunteer roles, freelance projects, community leadership, and any situation where you took responsibility for an outcome are all relevant evidence. List them with as much specificity as you can.",
      },
      { type: "heading", text: "Target companies that genuinely invest in entry-level candidates" },
      {
        type: "paragraph",
        text: "Not all employers are equally willing to hire and develop entry-level candidates. Some organisations have structured graduate programs, dedicated mentorship, and a culture of investing in junior talent. Others want experience they do not have to create. Research which companies in your target industry have a track record of hiring and promoting graduates. Those are your primary targets.",
      },
      { type: "heading", text: "Apply widely and learn from every application" },
      {
        type: "paragraph",
        text: "At the entry level, volume matters more than it does later in your career. Apply to every role where you meet at least 60 percent of the stated criteria. Many of the 'requirements' in entry-level postings are aspirational rather than strict. Track which applications generate responses and look for patterns. If roles in one industry are responding and another is not, that data is worth acting on.",
      },
      { type: "heading", text: "Invest heavily in the interview, because it is your real differentiator" },
      {
        type: "paragraph",
        text: "For entry-level roles, the interview matters more than the CV because the CV says relatively little. This is the moment where your personality, your curiosity, your preparation, and your communication skills become visible. Use Tellus's interview practice tool before every interview. Prepare specific questions for the interviewer. Arrive knowing something substantive about the company. These things are almost never done by competing candidates, and they are almost always noticed.",
      },
      { type: "heading", text: "Be willing to start somewhere to get somewhere" },
      {
        type: "paragraph",
        text: "The first role you take does not define your career. It gives you credibility, professional experience, references, and the foundation for everything that comes next. A good first role at a modest company is better than spending a year waiting for a prestigious one that never materialises. Move, get the experience, and then leverage it to move up.",
      },
    ],
    ctaLabel: "Find entry-level matches",
    ctaPath: "/jobs",
  },

  // ── 24. How AI is changing hiring ─────────────────────────────────────────
  {
    id: "ai-changing-hiring",
    title: "How AI is changing who gets hired",
    subject: "Recruiters are using AI to screen your application. Here is what that means for you.",
    preheader: "AI is already inside most modern hiring processes. Here is how to work with it, not against it.",
    heroImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "An abstract visual of AI and human intelligence working together",
    eyebrow: "Industry trends",
    headline: "AI is already reading your CV before a human does",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, there is a conversation about AI and jobs that tends to focus on which jobs AI will eliminate. That is a real and important question. But there is a more immediately practical conversation that rarely gets enough attention: AI is already deeply embedded in the hiring process on the employer side, and understanding how it works will make you a more competitive candidate right now.",
      },
      { type: "heading", text: "Applicant tracking systems are already AI-powered" },
      {
        type: "paragraph",
        text: "The first thing that happens when you submit an application to a large or mid-sized Kenyan company is that your CV is ingested by an applicant tracking system. Modern ATS platforms use AI to parse your CV into a structured data format, score your match against the job description, flag keywords that are present or missing, and rank you against other applicants before a human has read a word. If your CV is not formatted in a way the ATS can parse, or if it is missing the specific keywords from the job description, you may be filtered out before anyone sees your name.",
      },
      { type: "heading", text: "How to write for both humans and machines" },
      {
        type: "paragraph",
        text: "The good news is that writing an ATS-friendly CV and writing a human-friendly CV are not mutually exclusive. Use a clean single-column format with standard section headings. Include the specific terminology and keywords from the job description in your own CV, where they accurately reflect your experience. Lead every bullet point with a strong action verb followed by a quantified outcome. These practices improve your ATS score and make your CV more compelling to a human reader at the same time.",
      },
      { type: "heading", text: "AI is also changing the interview stage" },
      {
        type: "paragraph",
        text: "A growing number of companies now use AI-assisted video interviews for early-stage screening. You record your answers to structured questions, and an AI analyzes not just what you say but how you say it: clarity, confidence, relevance, and structure. The best way to prepare for this is the same as the best way to prepare for a human interview. Practice your answers out loud. Use specific examples with clear outcomes. Speak clearly and at a measured pace. The underlying evaluation criteria are almost identical.",
      },
      { type: "heading", text: "Use AI on your side, not just theirs" },
      {
        type: "paragraph",
        text: "This is where Tellus comes in. The same AI capabilities that employers use to screen applications, we use to help you produce better ones. Our CV parser shows you exactly what an ATS extracts from your document. Our cover letter generator ensures your application references the specific language and requirements of each job description. Our interview practice tool helps you prepare for both human and AI-assisted interviews. You are not fighting AI in the hiring process. You are using it strategically.",
      },
    ],
    ctaLabel: "Check your CV score",
    ctaPath: "/dashboard",
  },

  // ── 25. Employer research guide ───────────────────────────────────────────
  {
    id: "research-before-you-apply",
    title: "Research a company before you apply",
    subject: "Most candidates apply without researching the company. Do not be most candidates.",
    preheader: "Ten minutes of research before applying can change everything about your application.",
    heroImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A person researching thoroughly on a laptop in a quiet, professional setting",
    eyebrow: "Employer research",
    headline: "Ten minutes of research before applying changes everything",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, the majority of candidates who apply for a role have done no meaningful research on the company before they submit their application. They read the job description, confirm they meet most of the criteria, and apply. Their cover letter either does not mention the company at all or contains a single generic sentence about being excited to contribute to the organisation's success.",
      },
      {
        type: "paragraph",
        text: "Ten minutes of research changes what you write, how you write it, and how it is received. Here is exactly how to spend those ten minutes.",
      },
      { type: "heading", text: "Minutes 1 to 3: the company's website" },
      {
        type: "paragraph",
        text: "Read the About page and the most recent news or updates section. Understand what the company does, what market it serves, what its stated mission or values are, and what it considers important enough to publicise. Look at its product or service pages to understand what specifically they offer and who their customers are. This takes three minutes and gives you the foundation for everything else.",
      },
      { type: "heading", text: "Minutes 4 to 6: LinkedIn" },
      {
        type: "paragraph",
        text: "Visit the company's LinkedIn page. Look at how many employees they have and how quickly that number has changed, which tells you whether they are growing, stable, or contracting. Look at the profiles of two or three people who currently hold roles similar to the one you are applying for. Understand their backgrounds, how long they have been there, and where they came from. This context tells you a great deal about what the company values and what career paths look like inside it.",
      },
      { type: "heading", text: "Minutes 7 to 8: recent news" },
      {
        type: "paragraph",
        text: "Search the company's name in Google News and look at anything from the past six months. Funding announcements, leadership changes, product launches, expansions, and press coverage all give you insight into what is happening at the company right now. Referencing something current and specific in your cover letter demonstrates that you are genuinely paying attention, not just applying to every posting in a category.",
      },
      { type: "heading", text: "Minutes 9 to 10: Glassdoor or similar reviews" },
      {
        type: "paragraph",
        text: "If the company has reviews on Glassdoor or similar platforms, spend two minutes reading them. Take individual reviews with appropriate skepticism, since the most motivated reviewers are often the most extreme in either direction. But consistent themes across multiple reviews, whether positive or negative, tend to reflect genuine cultural realities. This information is most useful at the decision stage, but it also helps you ask better questions in the interview.",
      },
      {
        type: "paragraph",
        text: "Most candidates do not do this. You now know how to. The difference it makes in the quality of your application, and in how you come across in the interview, is significant.",
      },
    ],
    ctaLabel: "Browse your matched companies",
    ctaPath: "/jobs",
  },

  // ── 26. Encouragement during the job hunt ─────────────────────────────────
  {
    id: "keep-going-job-search",
    title: "Keep going: your next role is closer than it feels",
    subject: "The job hunt is hard, but you are not stuck. Here is encouragement that actually helps.",
    preheader: "Practical encouragement for anyone who is tired of job searching. Your next yes is on its way.",
    heroImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "A sunrise over a quiet road, symbolising a new beginning and fresh hope",
    eyebrow: "Encouragement",
    headline: "The job hunt is hard. That does not mean you are failing.",
    blocks: [
      {
        type: "paragraph",
        text: "Hi {{FIRST_NAME}}, if you are reading this email, there is a good chance that today has been difficult. Maybe you sent five applications and heard nothing back. Maybe you made it to the final interview and were told they chose someone else. Maybe you have been searching for longer than you ever expected, and the whole process is starting to feel personal. Before anything else, please hear this: the difficulty you are feeling is real, and it is not a sign that something is wrong with you.",
      },
      {
        type: "paragraph",
        text: "Job searching is one of the most emotionally demanding things a person can do. It asks you to present your best self, repeatedly, to people who do not know you, while living with uncertainty about your income, your future, and your sense of identity. It is normal to feel discouraged. It is normal to feel tired. It is normal to wonder whether you are good enough. What matters is not whether you feel those things. What matters is that you do not let them stop you from taking the next small step.",
      },
      { type: "heading", text: "Rejection is information, not a verdict" },
      {
        type: "paragraph",
        text: "One of the hardest parts of job searching is how easy it is to interpret silence or rejection as a judgement on your entire value as a professional. A company does not call back, and suddenly you start questioning your CV, your experience, your communication skills, and whether you will ever be hired again. This is a natural response, but it is not an accurate one.",
      },
      {
        type: "paragraph",
        text: "The truth is that most rejections have very little to do with your overall competence. The role may have been filled internally before it was ever posted. The hiring manager may have had a specific, unstated preference for a particular industry background. The budget may have changed. The timeline may have shifted. The company may have received two hundred applications and only had time to interview six. You are competing against a combination of factors that are entirely outside your control, and some of those factors will never be visible to you.",
      },
      {
        type: "paragraph",
        text: "The healthiest way to process a rejection is to treat it as data about one specific opportunity, not as data about your worth. Ask yourself: did I apply early enough? Was my CV genuinely tailored to this role? Did I follow up appropriately? If the answer to all of those is yes, then the rejection is almost certainly about fit, timing, or internal circumstances, not about you. Take what you can learn, let the rest go, and move on to the next application.",
      },
      { type: "heading", text: "Small consistent action beats occasional heroic effort" },
      {
        type: "paragraph",
        text: "A lot of people approach job searching in bursts. They spend an entire weekend applying to thirty roles, then do nothing for two weeks because the silence feels exhausting. Then they panic and repeat the cycle. This approach is emotionally draining and usually produces worse results than a slower, steadier rhythm.",
      },
      {
        type: "paragraph",
        text: "The most effective job search is usually a modest daily routine: two or three quality applications per day, one meaningful outreach message per week, twenty minutes of interview practice, and a regular update to your profile. This rhythm keeps your pipeline full without burning you out. It also keeps you emotionally regulated, because you are measuring yourself by effort you control rather than by responses you do not.",
      },
      {
        type: "paragraph",
        text: "If today you only have the energy to do one small thing, do that one small thing. Update your LinkedIn headline. Tailor one cover letter. Reach out to one former colleague. Send one application. The accumulation of small steps over time is what produces breakthroughs. Momentum is not about feeling motivated every day. It is about showing up on the days when motivation is low.",
      },
      { type: "heading", text: "Your value does not depend on your current employment status" },
      {
        type: "paragraph",
        text: "It is very easy to let your job search define your identity. When you are not working, or when you are working in a role that does not reflect your ability, the question 'So what do you do?' can feel loaded. You may start describing yourself as unemployed, in between roles, or just job searching. Try not to let that language settle too deeply.",
      },
      {
        type: "paragraph",
        text: "You are not your current employment status. You are a professional with a history, skills, relationships, and potential. The fact that you are searching for your next role does not erase everything you have done up to this point. The companies you have worked for, the problems you have solved, the people you have helped, and the skills you have developed all remain real. Your next employer will benefit from them. The gap between now and then is temporary.",
      },
      { type: "heading", text: "Comparison is the fastest way to lose perspective" },
      {
        type: "paragraph",
        text: "While you are job searching, it can feel like everyone else is moving forward. Your friends are posting about new roles, promotions, and exciting projects. People in your network are updating their LinkedIn with job changes. Meanwhile, your inbox is quiet. It is easy to conclude that you are falling behind.",
      },
      {
        type: "paragraph",
        text: "What you do not see is the full picture. You do not see the rejections they received. You do not see the roles they did not get. You do not see the months of uncertainty that may have preceded their update. Most people only publicise the wins. Comparing your entire private process to someone else's highlight reel is unfair to yourself and almost always inaccurate.",
      },
      {
        type: "paragraph",
        text: "The only useful comparison is between you now and you earlier in your search. Are you applying more strategically than you were a month ago? Is your CV clearer? Have you had more conversations? Are you better at interviews? If you are improving, you are winning, even if the results have not arrived yet.",
      },
      { type: "heading", text: "Rest is part of the process, not a failure of discipline" },
      {
        type: "paragraph",
        text: "There is a toxic idea that job searching should consume all of your time and energy until you land something. In reality, the people who search sustainably are the people who take breaks. A tired, anxious, depleted candidate does not write strong cover letters. They do not perform well in interviews. They do not project the confidence that makes employers want to hire them.",
      },
      {
        type: "paragraph",
        text: "Give yourself permission to rest. Take one day a week where you do not apply to anything. Spend time with people who remind you that you are more than your job. Do things that make you feel capable and competent, whether that is cooking, exercising, helping a friend, learning something new, or working on a small project. Resting is not giving up. It is preserving the energy you need to keep going well.",
      },
      { type: "heading", text: "The yes you are waiting for is being built by the work you do today" },
      {
        type: "paragraph",
        text: "Every application you send, every conversation you have, every interview you prepare for, and every skill you sharpen is increasing the probability that your next yes will arrive. You cannot see the exact moment it will happen, but you can influence the likelihood that it happens. The work you put in today is not wasted even if it does not produce immediate feedback.",
      },
      {
        type: "paragraph",
        text: "Tellus is here to make that work lighter. We built this platform so that you do not have to spend hours searching through irrelevant listings, writing cover letters from scratch, or wondering whether your CV is being read correctly. Let the tools handle the repetitive parts. Save your energy for the decisions, the conversations, and the preparation that only you can do.",
      },
      {
        type: "paragraph",
        text: "Keep going. Your next role is not guaranteed to arrive on a specific timeline, but if you keep applying strategically, keep learning from each step, and keep taking care of yourself along the way, it will arrive. The work you are doing now is the path that leads there. One day soon, you will look back at this season and be glad you did not stop.",
      },
    ],
    ctaLabel: "Keep your momentum going",
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
              <a href="${esc(APP_DOMAIN)}" style="color:#8b9a93;text-decoration:underline;">Visit Tellus Jobs</a>
              &nbsp;&middot;&nbsp;
              <a href="${esc(APP_DOMAIN)}/feedback" style="color:#8b9a93;text-decoration:underline;">Share feedback</a>
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
