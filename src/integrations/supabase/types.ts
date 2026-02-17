export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          description: string;
          hero_image_url: string | null;
          sort_order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline: string;
          description: string;
          hero_image_url?: string | null;
          sort_order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string;
          description?: string;
          hero_image_url?: string | null;
          sort_order?: number | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          collection_id: string;
          slug: string;
          name: string;
          price: number;
          description: string;
          philosophy: string;
          materials: string[];
          dimensions: string;
          image_url: string | null;
          gallery: string[] | null;
          sort_order: number | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          collection_id: string;
          slug: string;
          name: string;
          price: number;
          description: string;
          philosophy: string;
          materials?: string[];
          dimensions: string;
          image_url?: string | null;
          gallery?: string[] | null;
          sort_order?: number | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          collection_id?: string;
          slug?: string;
          name?: string;
          price?: number;
          description?: string;
          philosophy?: string;
          materials?: string[];
          dimensions?: string;
          image_url?: string | null;
          gallery?: string[] | null;
          sort_order?: number | null;
          active?: boolean;
          created_at?: string;
        };
      };
      consultancy_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          project_type: string | null;
          timeline: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          project_type?: string | null;
          timeline?: string | null;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          project_type?: string | null;
          timeline?: string | null;
          message?: string | null;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          notes: string | null;
          status: string;
          currency: string;
          total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          notes?: string | null;
          status?: string;
          currency?: string;
          total_amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          notes?: string | null;
          status?: string;
          currency?: string;
          total_amount?: number;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          unit_price: number;
          quantity: number;
          material: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          unit_price: number;
          quantity: number;
          material?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          unit_price?: number;
          quantity?: number;
          material?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
    };
    Views: never;
    Functions: never;
    Enums: never;
    CompositeTypes: never;
  };
}
