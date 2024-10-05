"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DB_TABLES } from "../lib/constants";
import moment from "moment";
import camelize from "camelize-ts";
import { Event } from "./protected/page";
import { ROUTES } from "../lib/constants";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createGameAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const maxPlayers = formData.get("maxPlayers") as string;
  const supabase = createClient();

  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

  const body = {
    name,
    scheduled_at: dateTime.toISOString(),
    location,
    max_players: parseInt(maxPlayers),
  };

  const { data, error } = await supabase
    .from(DB_TABLES.events)
    .insert([body])
    .select();

  if (error) {
    console.error("Supabase Insert Error:", error);
    console.error("Error Details:", error.message);
    return encodedRedirect(
      "error",
      "/protected/create-game",
      "Could not create game"
    );
  } else {
    console.log("game created", data);
  }

  return encodedRedirect("success", "/protected/create-game", "Game created");
};

export const fetchGames = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from(DB_TABLES.events).select();

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return { error: "Could not fetch events" };
  }

  return { data: camelize(data) };
};

export const fetchGame = async (
  id: string
): Promise<{
  data?: Event[];
  error?: string;
}> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(DB_TABLES.events)
    .select()
    .eq("id", id);

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return { error: "Could not fetch event" };
  }

  return { data: camelize(data) };
};

export const deleteGameAction = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from(DB_TABLES.events).delete().eq("id", id);

  if (error) {
    console.error("Supabase Delete Error:", error);
    return { error: "Could not delete game" };
  }

  return redirect("/protected");
};
