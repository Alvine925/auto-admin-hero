export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          application_email: string | null
          application_mode: string
          application_type: string
          application_url: string | null
          automation_error: string | null
          company: string | null
          cover_letter: string | null
          created_at: string
          drive_file_id: string | null
          drive_folder_id: string | null
          drive_pack_saved_at: string | null
          drive_url: string | null
          email_body: string | null
          email_subject: string | null
          id: string
          interview_questions: string | null
          interview_report: string | null
          interview_session: string | null
          job_id: string | null
          job_title: string | null
          match_score: number | null
          pack_answers: string | null
          pack_questions: string | null
          prepared_at: string | null
          sent_at: string | null
          sent_via: string | null
          status: string
          user_id: string
        }
        Insert: {
          application_email?: string | null
          application_mode?: string
          application_type?: string
          application_url?: string | null
          automation_error?: string | null
          company?: string | null
          cover_letter?: string | null
          created_at?: string
          drive_file_id?: string | null
          drive_folder_id?: string | null
          drive_pack_saved_at?: string | null
          drive_url?: string | null
          email_body?: string | null
          email_subject?: string | null
          id?: string
          interview_questions?: string | null
          interview_report?: string | null
          interview_session?: string | null
          job_id?: string | null
          job_title?: string | null
          match_score?: number | null
          pack_answers?: string | null
          pack_questions?: string | null
          prepared_at?: string | null
          sent_at?: string | null
          sent_via?: string | null
          status?: string
          user_id: string
        }
        Update: {
          application_email?: string | null
          application_mode?: string
          application_type?: string
          application_url?: string | null
          automation_error?: string | null
          company?: string | null
          cover_letter?: string | null
          created_at?: string
          drive_file_id?: string | null
          drive_folder_id?: string | null
          drive_pack_saved_at?: string | null
          drive_url?: string | null
          email_body?: string | null
          email_subject?: string | null
          id?: string
          interview_questions?: string | null
          interview_report?: string | null
          interview_session?: string | null
          job_id?: string | null
          job_title?: string | null
          match_score?: number | null
          pack_answers?: string | null
          pack_questions?: string | null
          prepared_at?: string | null
          sent_at?: string | null
          sent_via?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      error_reports: {
        Row: {
          action_context: string | null
          created_at: string
          error_message: string
          error_stack: string | null
          id: string
          section: string | null
          user_description: string | null
          user_id: string | null
        }
        Insert: {
          action_context?: string | null
          created_at?: string
          error_message: string
          error_stack?: string | null
          id?: string
          section?: string | null
          user_description?: string | null
          user_id?: string | null
        }
        Update: {
          action_context?: string | null
          created_at?: string
          error_message?: string
          error_stack?: string | null
          id?: string
          section?: string | null
          user_description?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_coach_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          job_id: string
          role: string
          session_type: string
          similar_jobs: Json | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          job_id: string
          role: string
          session_type?: string
          similar_jobs?: Json | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          job_id?: string
          role?: string
          session_type?: string
          similar_jobs?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_coach_messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          application_email: string | null
          application_method: string
          application_url: string | null
          company: string | null
          company_summary: string | null
          contact_person: string | null
          contact_phone: string | null
          county: string | null
          deadline: string | null
          deadline_text: string | null
          description: string | null
          id: string
          job_type: string | null
          location: string | null
          logo_url: string | null
          requirements: string | null
          responsibilities: string | null
          role_description: string | null
          salary_text: string | null
          scraped_at: string
          source: string | null
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          application_email?: string | null
          application_method?: string
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          source?: string | null
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          application_email?: string | null
          application_method?: string
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          source?: string | null
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_monitors: {
        Row: {
          active: boolean
          created_at: string
          id: string
          last_jobs_found: number
          last_scrape_error: string | null
          last_scrape_status: string | null
          last_scraped_at: string | null
          name: string
          notes: string | null
          scrape_frequency: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          last_jobs_found?: number
          last_scrape_error?: string | null
          last_scrape_status?: string | null
          last_scraped_at?: string | null
          name: string
          notes?: string | null
          scrape_frequency?: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          last_jobs_found?: number
          last_scrape_error?: string | null
          last_scrape_status?: string | null
          last_scraped_at?: string | null
          name?: string
          notes?: string | null
          scrape_frequency?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_email: string | null
          application_method: string
          application_url: string | null
          category: string | null
          company: string | null
          company_summary: string | null
          contact_person: string | null
          contact_phone: string | null
          county: string | null
          created_at: string
          deadline: string | null
          description: string | null
          id: string
          job_type: string | null
          listing_id: string | null
          location: string | null
          logo_url: string | null
          match_gaps: string | null
          match_reason: string | null
          match_score: number | null
          match_strengths: string | null
          notes: string | null
          requirements: string | null
          responsibilities: string | null
          role_description: string | null
          salary_max: number | null
          salary_min: number | null
          salary_text: string | null
          saved_at: string | null
          scraped_at: string | null
          source: string | null
          source_url: string | null
          title: string
          tracker_status: string
          user_id: string
        }
        Insert: {
          application_email?: string | null
          application_method?: string
          application_url?: string | null
          category?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          listing_id?: string | null
          location?: string | null
          logo_url?: string | null
          match_gaps?: string | null
          match_reason?: string | null
          match_score?: number | null
          match_strengths?: string | null
          notes?: string | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          saved_at?: string | null
          scraped_at?: string | null
          source?: string | null
          source_url?: string | null
          title: string
          tracker_status?: string
          user_id: string
        }
        Update: {
          application_email?: string | null
          application_method?: string
          application_url?: string | null
          category?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          listing_id?: string | null
          location?: string | null
          logo_url?: string | null
          match_gaps?: string | null
          match_reason?: string | null
          match_score?: number | null
          match_strengths?: string | null
          notes?: string | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          saved_at?: string | null
          scraped_at?: string | null
          source?: string | null
          source_url?: string | null
          title?: string
          tracker_status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempts: number
          created_at: string
          email: string
          id: string
          locked_until: string | null
          updated_at: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          email: string
          id?: string
          locked_until?: string | null
          updated_at?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          email?: string
          id?: string
          locked_until?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_referrals: number | null
          certifications: string | null
          created_at: string
          current_address: string | null
          current_plan: string
          cv_parsed_at: string | null
          cv_storage_path: string | null
          cv_url: string | null
          desired_roles: string[] | null
          education: string | null
          email: string | null
          experience_level: string | null
          full_name: string | null
          has_set_password: boolean
          id: string
          languages: string | null
          linkedin_url: string | null
          minimum_salary: number | null
          nationality: string | null
          notice_period: string | null
          onboarding_completed: boolean
          open_to_remote: boolean | null
          parsed_cv_text: string | null
          phone: string | null
          preferred_county: string | null
          professional_summary: string | null
          referral_code: string | null
          referred_by: string | null
          skills: string[] | null
          total_referrals: number | null
          updated_at: string
          upgrade_expires_at: string | null
          work_history: string | null
          years_of_experience: string | null
        }
        Insert: {
          active_referrals?: number | null
          certifications?: string | null
          created_at?: string
          current_address?: string | null
          current_plan?: string
          cv_parsed_at?: string | null
          cv_storage_path?: string | null
          cv_url?: string | null
          desired_roles?: string[] | null
          education?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          has_set_password?: boolean
          id: string
          languages?: string | null
          linkedin_url?: string | null
          minimum_salary?: number | null
          nationality?: string | null
          notice_period?: string | null
          onboarding_completed?: boolean
          open_to_remote?: boolean | null
          parsed_cv_text?: string | null
          phone?: string | null
          preferred_county?: string | null
          professional_summary?: string | null
          referral_code?: string | null
          referred_by?: string | null
          skills?: string[] | null
          total_referrals?: number | null
          updated_at?: string
          upgrade_expires_at?: string | null
          work_history?: string | null
          years_of_experience?: string | null
        }
        Update: {
          active_referrals?: number | null
          certifications?: string | null
          created_at?: string
          current_address?: string | null
          current_plan?: string
          cv_parsed_at?: string | null
          cv_storage_path?: string | null
          cv_url?: string | null
          desired_roles?: string[] | null
          education?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          has_set_password?: boolean
          id?: string
          languages?: string | null
          linkedin_url?: string | null
          minimum_salary?: number | null
          nationality?: string | null
          notice_period?: string | null
          onboarding_completed?: boolean
          open_to_remote?: boolean | null
          parsed_cv_text?: string | null
          phone?: string | null
          preferred_county?: string | null
          professional_summary?: string | null
          referral_code?: string | null
          referred_by?: string | null
          skills?: string[] | null
          total_referrals?: number | null
          updated_at?: string
          upgrade_expires_at?: string | null
          work_history?: string | null
          years_of_experience?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          referral_code_used: string
          referred_user_id: string
          referrer_user_id: string
          status: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referral_code_used: string
          referred_user_id: string
          referrer_user_id: string
          status?: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referral_code_used?: string
          referred_user_id?: string
          referrer_user_id?: string
          status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_user_id_fkey"
            columns: ["referrer_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_jobs: {
        Row: {
          application_email: string | null
          application_method: string | null
          application_url: string | null
          company: string | null
          company_summary: string | null
          contact_person: string | null
          contact_phone: string | null
          county: string | null
          created_at: string
          deadline: string | null
          deadline_text: string | null
          description: string | null
          description_summary: string | null
          education_level: string | null
          experience_level: string | null
          id: string
          is_remote: boolean | null
          job_type: string | null
          location: string | null
          logo_url: string | null
          posted_at: string | null
          raw: Json | null
          requirements: string | null
          responsibilities: string | null
          role_description: string | null
          salary_text: string | null
          scraped_at: string
          sector: string | null
          site: string
          source: string | null
          source_url: string
          summary: string | null
          title: string
          updated_at: string
          work_type: string | null
        }
        Insert: {
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          posted_at?: string | null
          raw?: Json | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          site?: string
          source?: string | null
          source_url: string
          summary?: string | null
          title: string
          updated_at?: string
          work_type?: string | null
        }
        Update: {
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          posted_at?: string | null
          raw?: Json | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          site?: string
          source?: string | null
          source_url?: string
          summary?: string | null
          title?: string
          updated_at?: string
          work_type?: string | null
        }
        Relationships: []
      }
      scrapy_jobs: {
        Row: {
          application_email: string | null
          application_method: string | null
          application_url: string | null
          company: string | null
          company_summary: string | null
          contact_person: string | null
          contact_phone: string | null
          county: string | null
          created_at: string
          deadline: string | null
          deadline_text: string | null
          description: string | null
          description_summary: string | null
          education_level: string | null
          error_message: string | null
          experience_level: string | null
          id: string
          is_remote: boolean | null
          job_type: string | null
          location: string | null
          logo_url: string | null
          posted_at: string | null
          processed_at: string | null
          raw: Json | null
          requirements: string | null
          responsibilities: string | null
          role_description: string | null
          salary_text: string | null
          scraped_at: string
          sector: string | null
          site: string
          source: string | null
          source_url: string
          status: string
          summary: string | null
          title: string
          updated_at: string
          work_type: string | null
        }
        Insert: {
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          error_message?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          posted_at?: string | null
          processed_at?: string | null
          raw?: Json | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          site?: string
          source?: string | null
          source_url: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
          work_type?: string | null
        }
        Update: {
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          company?: string | null
          company_summary?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          deadline?: string | null
          deadline_text?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          error_message?: string | null
          experience_level?: string | null
          id?: string
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          posted_at?: string | null
          processed_at?: string | null
          raw?: Json | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          site?: string
          source?: string | null
          source_url?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
          work_type?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_default: boolean | null
          name: string
          tone: string | null
          type: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          name: string
          tone?: string | null
          type?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
          tone?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          action_type: string
          created_at: string
          id: string
          metadata: Json
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          metadata?: Json
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          metadata?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          category: string
          created_at: string
          id: string
          message: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          message: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          message?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_integrations: {
        Row: {
          google_access_token: string | null
          google_connected: boolean
          google_refresh_token: string | null
          google_scopes: string[] | null
          linkedin_li_at: string | null
          linkedin_time_filter: string
          updated_at: string
          user_id: string
        }
        Insert: {
          google_access_token?: string | null
          google_connected?: boolean
          google_refresh_token?: string | null
          google_scopes?: string[] | null
          linkedin_li_at?: string | null
          linkedin_time_filter?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          google_access_token?: string | null
          google_connected?: boolean
          google_refresh_token?: string | null
          google_scopes?: string[] | null
          linkedin_li_at?: string | null
          linkedin_time_filter?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          active: boolean | null
          application_mode: string
          auto_apply: boolean | null
          cover_letter_tone: string | null
          created_at: string
          id: string
          job_types: string[] | null
          max_applications: number | null
          min_match_score: number | null
          minimum_salary: number | null
          name: string
          run_days: string[] | null
          run_time: string | null
          sources: string[] | null
          target_companies: string[] | null
          target_counties: string[] | null
          target_roles: string[] | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          application_mode?: string
          auto_apply?: boolean | null
          cover_letter_tone?: string | null
          created_at?: string
          id?: string
          job_types?: string[] | null
          max_applications?: number | null
          min_match_score?: number | null
          minimum_salary?: number | null
          name?: string
          run_days?: string[] | null
          run_time?: string | null
          sources?: string[] | null
          target_companies?: string[] | null
          target_counties?: string[] | null
          target_roles?: string[] | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          application_mode?: string
          auto_apply?: boolean | null
          cover_letter_tone?: string | null
          created_at?: string
          id?: string
          job_types?: string[] | null
          max_applications?: number | null
          min_match_score?: number | null
          minimum_salary?: number | null
          name?: string
          run_days?: string[] | null
          run_time?: string | null
          sources?: string[] | null
          target_companies?: string[] | null
          target_counties?: string[] | null
          target_roles?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_limits: {
        Args: { p_action_type: string; p_user_id: string }
        Returns: Json
      }
      claim_referral: { Args: { ref_code: string }; Returns: undefined }
      generate_referral_code: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      invoke_match_engine_edge: { Args: never; Returns: undefined }
      invoke_new_site_scraper_edge: {
        Args: { p_function: string; p_limit?: number }
        Returns: undefined
      }
      invoke_process_scrapy_jobs_edge: { Args: never; Returns: undefined }
      invoke_site_scraper_edge: {
        Args: { p_function: string; p_limit?: number }
        Returns: undefined
      }
      track_user_usage: {
        Args: { p_action_type: string; p_metadata?: Json; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
