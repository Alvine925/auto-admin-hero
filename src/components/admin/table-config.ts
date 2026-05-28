// Central configuration for all 19 admin-browseable tables.
// Each entry controls how the generic list page renders its columns.

export type TableKey =
  | "profiles"
  | "user_roles"
  | "user_integrations"
  | "user_feedback"
  | "usage_tracking"
  | "login_attempts"
  | "referrals"
  | "notifications"
  | "admin_notifications"
  | "jobs"
  | "job_listings"
  | "job_monitors"
  | "job_coach_messages"
  | "applications"
  | "templates"
  | "workflows"
  | "scraped_jobs"
  | "scrapy_jobs"
  | "chat_messages"
  | "error_reports";

export interface ColumnConfig {
  key: string;
  header: string;
  truncate?: number;
}

export interface TableConfig {
  key: TableKey;
  label: string;
  group: "Users" | "Jobs" | "Activity" | "System";
  columns: ColumnConfig[];
  searchKeys?: string[];
  orderBy?: { column: string; ascending?: boolean };
}

export const TABLE_CONFIGS: Record<TableKey, TableConfig> = {
  profiles: {
    key: "profiles", label: "Profiles", group: "Users",
    columns: [
      { key: "full_name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "current_plan", header: "Plan" },
      { key: "total_referrals", header: "Refs" },
      { key: "created_at", header: "Joined" },
    ],
    searchKeys: ["email", "full_name"],
    orderBy: { column: "created_at", ascending: false },
  },
  user_roles: {
    key: "user_roles", label: "User Roles", group: "Users",
    columns: [
      { key: "user_id", header: "User ID", truncate: 12 },
      { key: "role", header: "Role" },
      { key: "created_at", header: "Created" },
    ],
    orderBy: { column: "created_at", ascending: false },
  },
  user_integrations: {
    key: "user_integrations", label: "Integrations", group: "Users",
    columns: [
      { key: "user_id", header: "User ID", truncate: 12 },
      { key: "google_connected", header: "Google" },
      { key: "linkedin_time_filter", header: "LinkedIn filter" },
      { key: "updated_at", header: "Updated" },
    ],
    orderBy: { column: "updated_at", ascending: false },
  },
  user_feedback: {
    key: "user_feedback", label: "Feedback", group: "Users",
    columns: [
      { key: "category", header: "Category" },
      { key: "rating", header: "Rating" },
      { key: "message", header: "Message", truncate: 80 },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["message", "category"],
    orderBy: { column: "created_at", ascending: false },
  },
  usage_tracking: {
    key: "usage_tracking", label: "Usage", group: "Activity",
    columns: [
      { key: "action_type", header: "Action" },
      { key: "user_id", header: "User", truncate: 12 },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["action_type"],
    orderBy: { column: "created_at", ascending: false },
  },
  login_attempts: {
    key: "login_attempts", label: "Login Attempts", group: "System",
    columns: [
      { key: "email", header: "Email" },
      { key: "attempts", header: "Attempts" },
      { key: "locked_until", header: "Locked Until" },
      { key: "updated_at", header: "Updated" },
    ],
    searchKeys: ["email"],
    orderBy: { column: "updated_at", ascending: false },
  },
  referrals: {
    key: "referrals", label: "Referrals", group: "Users",
    columns: [
      { key: "referral_code_used", header: "Code" },
      { key: "status", header: "Status" },
      { key: "referrer_user_id", header: "Referrer", truncate: 12 },
      { key: "referred_user_id", header: "Referred", truncate: 12 },
      { key: "created_at", header: "When" },
    ],
    orderBy: { column: "created_at", ascending: false },
  },
  notifications: {
    key: "notifications", label: "User Notifications", group: "Activity",
    columns: [
      { key: "type", header: "Type" },
      { key: "title", header: "Title" },
      { key: "read", header: "Read" },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["title", "type"],
    orderBy: { column: "created_at", ascending: false },
  },
  admin_notifications: {
    key: "admin_notifications", label: "Admin Notifications", group: "System",
    columns: [
      { key: "table_name", header: "Table" },
      { key: "summary", header: "Summary", truncate: 80 },
      { key: "read", header: "Read" },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["table_name", "summary"],
    orderBy: { column: "created_at", ascending: false },
  },
  jobs: {
    key: "jobs", label: "Jobs", group: "Jobs",
    columns: [
      { key: "title", header: "Title" },
      { key: "company", header: "Company" },
      { key: "match_score", header: "Score" },
      { key: "tracker_status", header: "Status" },
      { key: "created_at", header: "Saved" },
    ],
    searchKeys: ["title", "company"],
    orderBy: { column: "created_at", ascending: false },
  },

  job_listings: {
    key: "job_listings", label: "Job Listings", group: "Jobs",
    columns: [
      { key: "title", header: "Title" },
      { key: "company", header: "Company" },
      { key: "location", header: "Location" },
      { key: "source", header: "Source" },
      { key: "scraped_at", header: "Scraped" },
    ],
    searchKeys: ["title", "company"],
    orderBy: { column: "scraped_at", ascending: false },
  },
  job_monitors: {
    key: "job_monitors", label: "Job Monitors", group: "Jobs",
    columns: [
      { key: "name", header: "Name" },
      { key: "url", header: "URL", truncate: 60 },
      { key: "active", header: "Active" },
      { key: "last_jobs_found", header: "Last Found" },
      { key: "last_scraped_at", header: "Last Run" },
    ],
    searchKeys: ["name", "url"],
    orderBy: { column: "updated_at", ascending: false },
  },
  job_coach_messages: {
    key: "job_coach_messages", label: "Coach Messages", group: "Activity",
    columns: [
      { key: "session_type", header: "Type" },
      { key: "role", header: "Role" },
      { key: "content", header: "Message", truncate: 80 },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["content"],
    orderBy: { column: "created_at", ascending: false },
  },
  applications: {
    key: "applications", label: "User Applications", group: "Jobs",
    columns: [
      { key: "job_title", header: "Job" },
      { key: "company", header: "Company" },
      { key: "status", header: "Status" },
      { key: "match_score", header: "Score" },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["job_title", "company"],
    orderBy: { column: "created_at", ascending: false },
  },
  templates: {
    key: "templates", label: "Templates", group: "Users",
    columns: [
      { key: "name", header: "Name" },
      { key: "type", header: "Type" },
      { key: "category", header: "Category" },
      { key: "tone", header: "Tone" },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["name", "category"],
    orderBy: { column: "created_at", ascending: false },
  },
  workflows: {
    key: "workflows", label: "Workflows", group: "Jobs",
    columns: [
      { key: "name", header: "Name" },
      { key: "active", header: "Active" },
      { key: "auto_apply", header: "Auto-apply" },
      { key: "run_time", header: "Run time" },
      { key: "created_at", header: "Created" },
    ],
    searchKeys: ["name"],
    orderBy: { column: "created_at", ascending: false },
  },
  scraped_jobs: {
    key: "scraped_jobs", label: "Marketplace", group: "Jobs",
    columns: [
      { key: "title", header: "Title" },
      { key: "company", header: "Company" },
      { key: "site", header: "Site" },
      { key: "location", header: "Location" },
      { key: "scraped_at", header: "When" },
    ],
    searchKeys: ["title", "company", "site"],
    orderBy: { column: "scraped_at", ascending: false },
  },
  scrapy_jobs: {
    key: "scrapy_jobs", label: "Scrapy Jobs", group: "Jobs",
    columns: [
      { key: "title", header: "Title" },
      { key: "company", header: "Company" },
      { key: "status", header: "Status" },
      { key: "site", header: "Site" },
      { key: "scraped_at", header: "When" },
    ],
    searchKeys: ["title", "company"],
    orderBy: { column: "scraped_at", ascending: false },
  },
  chat_messages: {
    key: "chat_messages", label: "Chat Messages", group: "Activity",
    columns: [
      { key: "role", header: "Role" },
      { key: "content", header: "Content", truncate: 80 },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["content"],
    orderBy: { column: "created_at", ascending: false },
  },
  error_reports: {
    key: "error_reports", label: "Errors", group: "System",
    columns: [
      { key: "section", header: "Section" },
      { key: "error_message", header: "Error", truncate: 80 },
      { key: "user_description", header: "Note", truncate: 60 },
      { key: "created_at", header: "When" },
    ],
    searchKeys: ["error_message", "section"],
    orderBy: { column: "created_at", ascending: false },
  },
};

export const TABLE_GROUPS: { group: TableConfig["group"]; tables: TableKey[] }[] = [
  { group: "Users", tables: ["profiles", "user_roles", "user_integrations", "user_feedback", "referrals", "templates"] },
  { group: "Jobs", tables: ["jobs", "applications", "workflows", "job_listings", "job_monitors", "scraped_jobs", "scrapy_jobs"] },
  { group: "Activity", tables: ["notifications", "job_coach_messages", "chat_messages", "usage_tracking"] },
  { group: "System", tables: ["admin_notifications", "error_reports", "login_attempts"] },
];
