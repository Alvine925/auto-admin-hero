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
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          read: boolean
          row_id: string
          summary: string | null
          table_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          read?: boolean
          row_id: string
          summary?: string | null
          table_name: string
        }
        Update: {
          created_at?: string
          id?: string
          read?: boolean
          row_id?: string
          summary?: string | null
          table_name?: string
        }
        Relationships: []
      }
      application_status_history: {
        Row: {
          application_id: string
          changed_by_id: string | null
          changed_by_type: string
          created_at: string
          from_status: string | null
          id: string
          metadata: Json | null
          reason: string | null
          to_status: string
        }
        Insert: {
          application_id: string
          changed_by_id?: string | null
          changed_by_type: string
          created_at?: string
          from_status?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          to_status: string
        }
        Update: {
          application_id?: string
          changed_by_id?: string | null
          changed_by_type?: string
          created_at?: string
          from_status?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_status_history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
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
          draft_notification_sent: boolean | null
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
          tailored_cv: string | null
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
          draft_notification_sent?: boolean | null
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
          tailored_cv?: string | null
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
          draft_notification_sent?: boolean | null
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
          tailored_cv?: string | null
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
      automation_notifications: {
        Row: {
          body_preview: string | null
          created_at: string
          error_message: string | null
          id: string
          recipient_email: string
          run_id: string | null
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          body_preview?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email: string
          run_id?: string | null
          status: string
          subject: string
          user_id: string
        }
        Update: {
          body_preview?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email?: string
          run_id?: string | null
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_notifications_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "automation_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_run_steps: {
        Row: {
          completed_at: string | null
          created_at: string
          details: string | null
          error_message: string | null
          id: string
          jobs_found: number | null
          label: string
          metadata: Json
          run_id: string
          started_at: string | null
          status: string
          step_key: string
          step_order: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          details?: string | null
          error_message?: string | null
          id?: string
          jobs_found?: number | null
          label: string
          metadata?: Json
          run_id: string
          started_at?: string | null
          status?: string
          step_key: string
          step_order: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          details?: string | null
          error_message?: string | null
          id?: string
          jobs_found?: number | null
          label?: string
          metadata?: Json
          run_id?: string
          started_at?: string | null
          status?: string
          step_key?: string
          step_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_run_steps_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "automation_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_runs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          jobs_applied: number | null
          jobs_found: number | null
          started_at: string
          status: string
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          jobs_applied?: number | null
          jobs_found?: number | null
          started_at?: string
          status: string
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          jobs_applied?: number | null
          jobs_found?: number | null
          started_at?: string
          status?: string
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_comparison_sessions: {
        Row: {
          ai_comparison_report: Json | null
          candidate_ids: string[]
          comparison_notes: string | null
          created_at: string
          id: string
          job_id: string
          recruiter_id: string
          updated_at: string
        }
        Insert: {
          ai_comparison_report?: Json | null
          candidate_ids: string[]
          comparison_notes?: string | null
          created_at?: string
          id?: string
          job_id: string
          recruiter_id: string
          updated_at?: string
        }
        Update: {
          ai_comparison_report?: Json | null
          candidate_ids?: string[]
          comparison_notes?: string | null
          created_at?: string
          id?: string
          job_id?: string
          recruiter_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_comparison_sessions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_comparison_sessions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_verifications: {
        Row: {
          application_id: string
          assigned_to: string | null
          check_type: string
          completed_at: string | null
          created_at: string
          documents: Json | null
          employer_id: string
          id: string
          institution_or_provider: string | null
          is_required: boolean
          notes: string | null
          qualification_or_role: string | null
          requested_at: string | null
          result: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          application_id: string
          assigned_to?: string | null
          check_type: string
          completed_at?: string | null
          created_at?: string
          documents?: Json | null
          employer_id: string
          id?: string
          institution_or_provider?: string | null
          is_required?: boolean
          notes?: string | null
          qualification_or_role?: string | null
          requested_at?: string | null
          result?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          assigned_to?: string | null
          check_type?: string
          completed_at?: string | null
          created_at?: string
          documents?: Json | null
          employer_id?: string
          id?: string
          institution_or_provider?: string | null
          is_required?: boolean
          notes?: string | null
          qualification_or_role?: string | null
          requested_at?: string | null
          result?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_verifications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_verifications_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
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
      employer_email_log: {
        Row: {
          application_id: string | null
          created_at: string
          email_type: string
          employer_id: string | null
          error_message: string | null
          id: string
          job_id: string | null
          provider_message_id: string | null
          recipient: string
          status: string
          subject: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          email_type: string
          employer_id?: string | null
          error_message?: string | null
          id?: string
          job_id?: string | null
          provider_message_id?: string | null
          recipient: string
          status?: string
          subject?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          email_type?: string
          employer_id?: string | null
          error_message?: string | null
          id?: string
          job_id?: string | null
          provider_message_id?: string | null
          recipient?: string
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      employer_job_applications: {
        Row: {
          ai_report: Json | null
          answers: Json | null
          applicant_user_id: string | null
          cover_letter: string | null
          created_at: string
          cv_storage_path: string | null
          cv_url: string | null
          email: string
          employer_id: string
          employer_notes: string | null
          finalist_data: Json | null
          full_name: string
          id: string
          interview_data: Json | null
          job_id: string
          linkedin_url: string | null
          match_score: number | null
          notified_at: string | null
          offer_data: Json | null
          phone: string | null
          screening_answers: Json | null
          screening_data: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_report?: Json | null
          answers?: Json | null
          applicant_user_id?: string | null
          cover_letter?: string | null
          created_at?: string
          cv_storage_path?: string | null
          cv_url?: string | null
          email: string
          employer_id: string
          employer_notes?: string | null
          finalist_data?: Json | null
          full_name: string
          id?: string
          interview_data?: Json | null
          job_id: string
          linkedin_url?: string | null
          match_score?: number | null
          notified_at?: string | null
          offer_data?: Json | null
          phone?: string | null
          screening_answers?: Json | null
          screening_data?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_report?: Json | null
          answers?: Json | null
          applicant_user_id?: string | null
          cover_letter?: string | null
          created_at?: string
          cv_storage_path?: string | null
          cv_url?: string | null
          email?: string
          employer_id?: string
          employer_notes?: string | null
          finalist_data?: Json | null
          full_name?: string
          id?: string
          interview_data?: Json | null
          job_id?: string
          linkedin_url?: string | null
          match_score?: number | null
          notified_at?: string | null
          offer_data?: Json | null
          phone?: string | null
          screening_answers?: Json | null
          screening_data?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_applications_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_jobs: {
        Row: {
          application_email: string | null
          application_method: string
          application_questions: Json
          application_url: string | null
          applications_count: number
          benefits: string | null
          category: string | null
          contact_person: string | null
          contact_phone: string | null
          country: string | null
          county: string | null
          created_at: string
          currency: string | null
          deadline: string | null
          description: string | null
          description_summary: string | null
          education_level: string | null
          employer_id: string
          experience_level: string | null
          form_enabled: boolean
          id: string
          is_remote: boolean
          job_type: string | null
          location: string | null
          openings: number
          posted_email_sent_at: string | null
          published_at: string | null
          reply_to_email: string | null
          required_skills: string[]
          requirements: string | null
          responsibilities: string | null
          salary_max: number | null
          salary_min: number | null
          salary_text: string | null
          scraped_job_id: string | null
          sector: string | null
          status: string
          title: string
          updated_at: string
          views: number
          work_type: string | null
        }
        Insert: {
          application_email?: string | null
          application_method?: string
          application_questions?: Json
          application_url?: string | null
          applications_count?: number
          benefits?: string | null
          category?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          employer_id: string
          experience_level?: string | null
          form_enabled?: boolean
          id?: string
          is_remote?: boolean
          job_type?: string | null
          location?: string | null
          openings?: number
          posted_email_sent_at?: string | null
          published_at?: string | null
          reply_to_email?: string | null
          required_skills?: string[]
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          scraped_job_id?: string | null
          sector?: string | null
          status?: string
          title: string
          updated_at?: string
          views?: number
          work_type?: string | null
        }
        Update: {
          application_email?: string | null
          application_method?: string
          application_questions?: Json
          application_url?: string | null
          applications_count?: number
          benefits?: string | null
          category?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description?: string | null
          description_summary?: string | null
          education_level?: string | null
          employer_id?: string
          experience_level?: string | null
          form_enabled?: boolean
          id?: string
          is_remote?: boolean
          job_type?: string | null
          location?: string | null
          openings?: number
          posted_email_sent_at?: string | null
          published_at?: string | null
          reply_to_email?: string | null
          required_skills?: string[]
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_text?: string | null
          scraped_job_id?: string | null
          sector?: string | null
          status?: string
          title?: string
          updated_at?: string
          views?: number
          work_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_profiles: {
        Row: {
          address: string | null
          city: string | null
          company_name: string
          company_size: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          county: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          facebook_url: string | null
          founded_year: number | null
          id: string
          industries: string[]
          linkedin_url: string | null
          logo_url: string | null
          onboarding_completed: boolean
          reply_to_email: string | null
          slug: string | null
          tagline: string | null
          twitter_url: string | null
          updated_at: string
          verified: boolean
          website: string | null
          welcome_email_sent_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name: string
          company_size?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          county?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          facebook_url?: string | null
          founded_year?: number | null
          id: string
          industries?: string[]
          linkedin_url?: string | null
          logo_url?: string | null
          onboarding_completed?: boolean
          reply_to_email?: string | null
          slug?: string | null
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
          welcome_email_sent_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string
          company_size?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          county?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          facebook_url?: string | null
          founded_year?: number | null
          id?: string
          industries?: string[]
          linkedin_url?: string | null
          logo_url?: string | null
          onboarding_completed?: boolean
          reply_to_email?: string | null
          slug?: string | null
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
          welcome_email_sent_at?: string | null
        }
        Relationships: []
      }
      employer_verification_codes: {
        Row: {
          attempts: number
          code_hash: string
          created_at: string
          email: string
          expires_at: string
          id: string
          purpose: string
          updated_at: string
          used_at: string | null
        }
        Insert: {
          attempts?: number
          code_hash: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          purpose?: string
          updated_at?: string
          used_at?: string | null
        }
        Update: {
          attempts?: number
          code_hash?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          purpose?: string
          updated_at?: string
          used_at?: string | null
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
      final_hiring_decisions: {
        Row: {
          ai_assessment_summary: Json | null
          ai_recommendation: string | null
          application_id: string
          checks_summary: Json | null
          created_at: string
          cv_score: number | null
          decision: string
          decision_reason: string
          from_status: string
          id: string
          interview_score: number | null
          job_id: string
          notes: string | null
          overall_score: number | null
          override_reason: string | null
          recruiter_id: string
          screening_score: number | null
          to_status: string
        }
        Insert: {
          ai_assessment_summary?: Json | null
          ai_recommendation?: string | null
          application_id: string
          checks_summary?: Json | null
          created_at?: string
          cv_score?: number | null
          decision: string
          decision_reason: string
          from_status: string
          id?: string
          interview_score?: number | null
          job_id: string
          notes?: string | null
          overall_score?: number | null
          override_reason?: string | null
          recruiter_id: string
          screening_score?: number | null
          to_status: string
        }
        Update: {
          ai_assessment_summary?: Json | null
          ai_recommendation?: string | null
          application_id?: string
          checks_summary?: Json | null
          created_at?: string
          cv_score?: number | null
          decision?: string
          decision_reason?: string
          from_status?: string
          id?: string
          interview_score?: number | null
          job_id?: string
          notes?: string | null
          overall_score?: number | null
          override_reason?: string | null
          recruiter_id?: string
          screening_score?: number | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "final_hiring_decisions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "final_hiring_decisions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "final_hiring_decisions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      finalist_decisions: {
        Row: {
          ai_comparison_summary: string | null
          ai_recommendation: string | null
          application_id: string
          comparative_notes: string | null
          created_at: string
          cv_score: number | null
          decision_reason: string
          decision_type: string
          from_status: string
          id: string
          interview_score: number | null
          job_id: string
          overall_score: number | null
          override_reason: string | null
          recruiter_id: string
          screening_score: number | null
          to_status: string
        }
        Insert: {
          ai_comparison_summary?: string | null
          ai_recommendation?: string | null
          application_id: string
          comparative_notes?: string | null
          created_at?: string
          cv_score?: number | null
          decision_reason: string
          decision_type: string
          from_status: string
          id?: string
          interview_score?: number | null
          job_id: string
          overall_score?: number | null
          override_reason?: string | null
          recruiter_id: string
          screening_score?: number | null
          to_status: string
        }
        Update: {
          ai_comparison_summary?: string | null
          ai_recommendation?: string | null
          application_id?: string
          comparative_notes?: string | null
          created_at?: string
          cv_score?: number | null
          decision_reason?: string
          decision_type?: string
          from_status?: string
          id?: string
          interview_score?: number | null
          job_id?: string
          overall_score?: number | null
          override_reason?: string | null
          recruiter_id?: string
          screening_score?: number | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "finalist_decisions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finalist_decisions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finalist_decisions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_evaluations: {
        Row: {
          application_id: string
          concerns: string[] | null
          created_at: string
          evaluation_completed: boolean
          evaluator_id: string
          evaluator_name: string
          evaluator_role: string | null
          id: string
          interview_id: string
          observations: string | null
          overall_score: number | null
          question_responses: Json | null
          recommendation: string
          recommendation_notes: string | null
          scores: Json
          strengths: string[] | null
          submitted_at: string | null
          updated_at: string
          weaknesses: string[] | null
        }
        Insert: {
          application_id: string
          concerns?: string[] | null
          created_at?: string
          evaluation_completed?: boolean
          evaluator_id: string
          evaluator_name: string
          evaluator_role?: string | null
          id?: string
          interview_id: string
          observations?: string | null
          overall_score?: number | null
          question_responses?: Json | null
          recommendation: string
          recommendation_notes?: string | null
          scores?: Json
          strengths?: string[] | null
          submitted_at?: string | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Update: {
          application_id?: string
          concerns?: string[] | null
          created_at?: string
          evaluation_completed?: boolean
          evaluator_id?: string
          evaluator_name?: string
          evaluator_role?: string | null
          id?: string
          interview_id?: string
          observations?: string | null
          overall_score?: number | null
          question_responses?: Json | null
          recommendation?: string
          recommendation_notes?: string | null
          scores?: Json
          strengths?: string[] | null
          submitted_at?: string | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_evaluations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_evaluations_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_evaluations_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          ai_consistency_flags: Json | null
          ai_interview_guide: string | null
          ai_post_analysis: string | null
          application_id: string
          cancelled_at: string | null
          completed_at: string | null
          created_at: string
          duration_minutes: number
          employer_id: string
          evaluation_criteria: Json | null
          id: string
          internal_notes: string | null
          interview_round: string
          interview_type: string
          interviewer_ids: string[] | null
          interviewer_names: string[] | null
          interviewer_notes: string | null
          location: string | null
          meeting_link: string | null
          no_show_at: string | null
          questions: Json | null
          scheduled_date: string
          scheduled_time: string
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_consistency_flags?: Json | null
          ai_interview_guide?: string | null
          ai_post_analysis?: string | null
          application_id: string
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          employer_id: string
          evaluation_criteria?: Json | null
          id?: string
          internal_notes?: string | null
          interview_round: string
          interview_type: string
          interviewer_ids?: string[] | null
          interviewer_names?: string[] | null
          interviewer_notes?: string | null
          location?: string | null
          meeting_link?: string | null
          no_show_at?: string | null
          questions?: Json | null
          scheduled_date: string
          scheduled_time: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_consistency_flags?: Json | null
          ai_interview_guide?: string | null
          ai_post_analysis?: string | null
          application_id?: string
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          employer_id?: string
          evaluation_criteria?: Json | null
          id?: string
          internal_notes?: string | null
          interview_round?: string
          interview_type?: string
          interviewer_ids?: string[] | null
          interviewer_names?: string[] | null
          interviewer_notes?: string | null
          location?: string | null
          meeting_link?: string | null
          no_show_at?: string | null
          questions?: Json | null
          scheduled_date?: string
          scheduled_time?: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
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
          category: string | null
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
          required_skills: string[] | null
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
          category?: string | null
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
          required_skills?: string[] | null
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
          category?: string | null
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
          required_skills?: string[] | null
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
      job_match_notifications: {
        Row: {
          application_method: string | null
          brevo_message_id: string | null
          company: string | null
          created_at: string
          error_message: string | null
          id: string
          job_id: string | null
          job_title: string
          match_score: number | null
          notification_type: string
          scraped_job_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          application_method?: string | null
          brevo_message_id?: string | null
          company?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string | null
          job_title: string
          match_score?: number | null
          notification_type?: string
          scraped_job_id?: string | null
          status: string
          user_id: string
        }
        Update: {
          application_method?: string | null
          brevo_message_id?: string | null
          company?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string | null
          job_title?: string
          match_score?: number | null
          notification_type?: string
          scraped_job_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_match_notifications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_match_notifications_scraped_job_id_fkey"
            columns: ["scraped_job_id"]
            isOneToOne: false
            referencedRelation: "scraped_jobs"
            referencedColumns: ["id"]
          },
        ]
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
          scrape_day: string | null
          scrape_frequency: string
          scrape_time: string | null
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
          scrape_day?: string | null
          scrape_frequency?: string
          scrape_time?: string | null
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
          scrape_day?: string | null
          scrape_frequency?: string
          scrape_time?: string | null
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      job_views: {
        Row: {
          created_at: string
          id: string
          job_id: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          table_name?: string
          user_id?: string | null
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
          description_summary: string | null
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
          notified_at: string | null
          required_skills: string[] | null
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
          description_summary?: string | null
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
          notified_at?: string | null
          required_skills?: string[] | null
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
          description_summary?: string | null
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
          notified_at?: string | null
          required_skills?: string[] | null
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
      leads: {
        Row: {
          address: string | null
          county: string | null
          description: string | null
          email: string | null
          google_maps_url: string | null
          id: string
          name: string
          org_type: string | null
          phone: string | null
          place_id: string | null
          raw: Json | null
          scraped_at: string
          search_query: string | null
          source: string
          source_url: string
          town: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          county?: string | null
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          name: string
          org_type?: string | null
          phone?: string | null
          place_id?: string | null
          raw?: Json | null
          scraped_at?: string
          search_query?: string | null
          source?: string
          source_url: string
          town?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          county?: string | null
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          name?: string
          org_type?: string | null
          phone?: string | null
          place_id?: string | null
          raw?: Json | null
          scraped_at?: string
          search_query?: string | null
          source?: string
          source_url?: string
          town?: string | null
          website?: string | null
        }
        Relationships: []
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
      mailing_list: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string
          subscribed: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string
          subscribed?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
          subscribed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      monitored_jobs: {
        Row: {
          added_to_jobs: boolean
          company: string | null
          deadline: string | null
          description: string | null
          id: string
          location: string | null
          monitor_id: string
          scraped_at: string
          scraped_job_id: string | null
          source_url: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          added_to_jobs?: boolean
          company?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          location?: string | null
          monitor_id: string
          scraped_at?: string
          scraped_job_id?: string | null
          source_url: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          added_to_jobs?: boolean
          company?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          location?: string | null
          monitor_id?: string
          scraped_at?: string
          scraped_job_id?: string | null
          source_url?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitored_jobs_monitor_id_fkey"
            columns: ["monitor_id"]
            isOneToOne: false
            referencedRelation: "job_monitors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitored_jobs_scraped_job_id_fkey"
            columns: ["scraped_job_id"]
            isOneToOne: false
            referencedRelation: "scraped_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_sends: {
        Row: {
          created_at: string
          error: string | null
          id: string
          newsletter_id: string
          newsletter_title: string | null
          recipient_email: string
          recipient_user_id: string | null
          sent_by: string | null
          status: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          newsletter_id: string
          newsletter_title?: string | null
          recipient_email: string
          recipient_user_id?: string | null
          sent_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          newsletter_id?: string
          newsletter_title?: string | null
          recipient_email?: string
          recipient_user_id?: string | null
          sent_by?: string | null
          status?: string
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
      pending_oauth_sessions: {
        Row: {
          access_token: string | null
          code_verifier: string | null
          created_at: string
          expires_at: string
          google_access_token: string | null
          google_refresh_token: string | null
          id: string
          ref_code: string | null
          refresh_token: string | null
          state_token: string
          used: boolean
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          google_access_token?: string | null
          google_refresh_token?: string | null
          id?: string
          ref_code?: string | null
          refresh_token?: string | null
          state_token: string
          used?: boolean
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          google_access_token?: string | null
          google_refresh_token?: string | null
          id?: string
          ref_code?: string | null
          refresh_token?: string | null
          state_token?: string
          used?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active_referrals: number | null
          ai_processing_consent_at: string | null
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
          projects: Json | null
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
          ai_processing_consent_at?: string | null
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
          projects?: Json | null
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
          ai_processing_consent_at?: string | null
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
          projects?: Json | null
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
      recruiter_decisions: {
        Row: {
          ai_recommendation: string | null
          application_id: string
          created_at: string
          decision_type: string
          from_status: string
          hold_reason: string | null
          hold_until: string | null
          id: string
          notes: string | null
          override_reason: string | null
          recruiter_id: string
          rejection_reason: string | null
          to_status: string
        }
        Insert: {
          ai_recommendation?: string | null
          application_id: string
          created_at?: string
          decision_type: string
          from_status: string
          hold_reason?: string | null
          hold_until?: string | null
          id?: string
          notes?: string | null
          override_reason?: string | null
          recruiter_id: string
          rejection_reason?: string | null
          to_status: string
        }
        Update: {
          ai_recommendation?: string | null
          application_id?: string
          created_at?: string
          decision_type?: string
          from_status?: string
          hold_reason?: string | null
          hold_until?: string | null
          id?: string
          notes?: string | null
          override_reason?: string | null
          recruiter_id?: string
          rejection_reason?: string | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_decisions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_decisions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recruiter_notifications: {
        Row: {
          action_url: string | null
          application_id: string | null
          created_at: string
          id: string
          job_id: string | null
          message: string | null
          metadata: Json | null
          notification_type: string
          read: boolean
          read_at: string | null
          recruiter_id: string
          title: string
        }
        Insert: {
          action_url?: string | null
          application_id?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          message?: string | null
          metadata?: Json | null
          notification_type: string
          read?: boolean
          read_at?: string | null
          recruiter_id: string
          title: string
        }
        Update: {
          action_url?: string | null
          application_id?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          message?: string | null
          metadata?: Json | null
          notification_type?: string
          read?: boolean
          read_at?: string | null
          recruiter_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_notifications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_notifications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_notifications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reference_checks: {
        Row: {
          ai_analysis: Json | null
          application_id: string
          completed_at: string | null
          created_at: string
          deadline: string | null
          email: string
          employer_id: string
          id: string
          job_title: string
          notes: string | null
          opened_at: string | null
          organization: string
          phone: string | null
          questionnaire: Json | null
          referee_name: string
          relationship: string
          response_metadata: Json | null
          responses: Json | null
          secure_token: string
          sent_at: string | null
          status: string
          updated_at: string
          years_worked: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          application_id: string
          completed_at?: string | null
          created_at?: string
          deadline?: string | null
          email: string
          employer_id: string
          id?: string
          job_title: string
          notes?: string | null
          opened_at?: string | null
          organization: string
          phone?: string | null
          questionnaire?: Json | null
          referee_name: string
          relationship: string
          response_metadata?: Json | null
          responses?: Json | null
          secure_token?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
          years_worked?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          application_id?: string
          completed_at?: string | null
          created_at?: string
          deadline?: string | null
          email?: string
          employer_id?: string
          id?: string
          job_title?: string
          notes?: string | null
          opened_at?: string | null
          organization?: string
          phone?: string | null
          questionnaire?: Json | null
          referee_name?: string
          relationship?: string
          response_metadata?: Json | null
          responses?: Json | null
          secure_token?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
          years_worked?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_checks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_job_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_checks_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
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
          ai_content: Json | null
          application_email: string | null
          application_method: string | null
          application_url: string | null
          category: string | null
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
          employer_description: string | null
          experience_level: string | null
          facebook_post_id: string | null
          facebook_posted: boolean
          facebook_posted_at: string | null
          id: string
          image_url: string | null
          is_remote: boolean | null
          job_type: string | null
          location: string | null
          logo_url: string | null
          match_score_cache: Json
          posted_at: string | null
          raw: Json | null
          required_skills: string[] | null
          requirements: string | null
          responsibilities: string | null
          role_description: string | null
          salary_text: string | null
          scraped_at: string
          sector: string | null
          seo_keywords: string[] | null
          site: string
          slug: string | null
          source: string | null
          source_url: string
          summary: string | null
          title: string
          updated_at: string
          work_type: string | null
        }
        Insert: {
          ai_content?: Json | null
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          category?: string | null
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
          employer_description?: string | null
          experience_level?: string | null
          facebook_post_id?: string | null
          facebook_posted?: boolean
          facebook_posted_at?: string | null
          id?: string
          image_url?: string | null
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          match_score_cache?: Json
          posted_at?: string | null
          raw?: Json | null
          required_skills?: string[] | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          seo_keywords?: string[] | null
          site?: string
          slug?: string | null
          source?: string | null
          source_url: string
          summary?: string | null
          title: string
          updated_at?: string
          work_type?: string | null
        }
        Update: {
          ai_content?: Json | null
          application_email?: string | null
          application_method?: string | null
          application_url?: string | null
          category?: string | null
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
          employer_description?: string | null
          experience_level?: string | null
          facebook_post_id?: string | null
          facebook_posted?: boolean
          facebook_posted_at?: string | null
          id?: string
          image_url?: string | null
          is_remote?: boolean | null
          job_type?: string | null
          location?: string | null
          logo_url?: string | null
          match_score_cache?: Json
          posted_at?: string | null
          raw?: Json | null
          required_skills?: string[] | null
          requirements?: string | null
          responsibilities?: string | null
          role_description?: string | null
          salary_text?: string | null
          scraped_at?: string
          sector?: string | null
          seo_keywords?: string[] | null
          site?: string
          slug?: string | null
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
          cron_expression: string | null
          id: string
          job_categories: string[] | null
          job_types: string[] | null
          max_applications: number | null
          min_match_score: number | null
          minimum_salary: number | null
          name: string
          required_skills: string[] | null
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
          cron_expression?: string | null
          id?: string
          job_categories?: string[] | null
          job_types?: string[] | null
          max_applications?: number | null
          min_match_score?: number | null
          minimum_salary?: number | null
          name?: string
          required_skills?: string[] | null
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
          cron_expression?: string | null
          id?: string
          job_categories?: string[] | null
          job_types?: string[] | null
          max_applications?: number | null
          min_match_score?: number | null
          minimum_salary?: number | null
          name?: string
          required_skills?: string[] | null
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
      recent_leads: {
        Row: {
          county: string | null
          description: string | null
          email: string | null
          google_maps_url: string | null
          id: string | null
          name: string | null
          org_type: string | null
          phone: string | null
          scraped_at: string | null
          source: string | null
          town: string | null
          website: string | null
        }
        Insert: {
          county?: string | null
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string | null
          name?: string | null
          org_type?: string | null
          phone?: string | null
          scraped_at?: string | null
          source?: string | null
          town?: string | null
          website?: string | null
        }
        Update: {
          county?: string | null
          description?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string | null
          name?: string | null
          org_type?: string | null
          phone?: string | null
          scraped_at?: string | null
          source?: string | null
          town?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_set_user_plan: {
        Args: { p_days?: number; p_email: string; p_plan?: string }
        Returns: {
          current_plan: string
          email: string
          id: string
          upgrade_expires_at: string
        }[]
      }
      calculate_aggregate_interview_score: {
        Args: { p_interview_id: string }
        Returns: number
      }
      check_user_limits: {
        Args: { p_action_type: string; p_user_id: string }
        Returns: Json
      }
      claim_referral: { Args: { ref_code: string }; Returns: undefined }
      cleanup_expired_oauth_sessions: { Args: never; Returns: undefined }
      cleanup_old_scraped_jobs: { Args: never; Returns: undefined }
      cleanup_processed_scrapy_jobs: { Args: never; Returns: undefined }
      create_recruiter_notification: {
        Args: {
          p_action_url: string
          p_application_id: string
          p_job_id: string
          p_message: string
          p_metadata?: Json
          p_recruiter_id: string
          p_title: string
          p_type: string
        }
        Returns: string
      }
      generate_referral_code: { Args: never; Returns: string }
      generate_scraped_job_slug: {
        Args: {
          company: string
          job_id: string
          location: string
          title: string
        }
        Returns: string
      }
      get_finalist_candidates: {
        Args: { p_job_id: string }
        Returns: {
          ai_recommendation: string
          application_id: string
          candidate_name: string
          created_at: string
          cv_score: number
          interview_score: number
          overall_score: number
          screening_score: number
          status: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      invoke_auto_apply_edge: { Args: never; Returns: undefined }
      invoke_job_match_notify_edge: { Args: never; Returns: undefined }
      invoke_job_monitors_cron: { Args: never; Returns: undefined }
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
      slugify_text: { Args: { v: string }; Returns: string }
      track_user_usage: {
        Args: { p_action_type: string; p_metadata?: Json; p_user_id: string }
        Returns: undefined
      }
      trigger_employer_email: {
        Args: { p_payload: Json; p_type: string }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
