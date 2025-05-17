export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          answered_by: string
          complaint: string
          created_at: string
          id: number
          organization: number
        }
        Insert: {
          answer: string
          answered_by?: string
          complaint: string
          created_at?: string
          id?: number
          organization: number
        }
        Update: {
          answer?: string
          answered_by?: string
          complaint?: string
          created_at?: string
          id?: number
          organization?: number
        }
        Relationships: [
          {
            foreignKeyName: "answers_complaint_fkey"
            columns: ["complaint"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "answers_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["org_id"]
          },
        ]
      }
      categories: {
        Row: {
          cat_id: string
          created_at: string
          name: string
          org_id: number | null
        }
        Insert: {
          cat_id?: string
          created_at?: string
          name: string
          org_id?: number | null
        }
        Update: {
          cat_id?: string
          created_at?: string
          name?: string
          org_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["org_id"]
          },
        ]
      }
      complaints: {
        Row: {
          category_id: string | null
          created_at: string
          description: string
          email: string
          files: string[] | null
          id: number
          name: string
          phone: string
          status: Database["public"]["Enums"]["Complaint Status"]
          ticket_id: string | null
          title: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description: string
          email: string
          files?: string[] | null
          id?: number
          name: string
          phone: string
          status?: Database["public"]["Enums"]["Complaint Status"]
          ticket_id?: string | null
          title: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string
          email?: string
          files?: string[] | null
          id?: number
          name?: string
          phone?: string
          status?: Database["public"]["Enums"]["Complaint Status"]
          ticket_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["cat_id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          description: string
          logo: string
          name: string
          org_id: number
          site: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          logo: string
          name: string
          org_id?: number
          site: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          logo?: string
          name?: string
          org_id?: number
          site?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "Complaint Status": "submitted" | "solved" | "reviewing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "Complaint Status": ["submitted", "solved", "reviewing"],
    },
  },
} as const
