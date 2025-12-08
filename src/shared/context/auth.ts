"use client"

import { createContext } from "react";
import type { User, Session, SupabaseClient } from "@supabase/supabase-js";
import type { IUserProfile } from "../types/entities/user";

interface IAuthContext {
  loading: boolean;
  user: User | null;
  userProfile: IUserProfile | null;
  session: Session | null;
  supabase: SupabaseClient;
  getUserProfile: () => Promise<{
    data: IUserProfile | null;
    error: any;
  }>;
  refreshUserProfile: () => Promise<{
    data: IUserProfile | null;
    error: any;
  }>;
  updateUserProfileOptimistic: (updates: Partial<IUserProfile>) => void;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);