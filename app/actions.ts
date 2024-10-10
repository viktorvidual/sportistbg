"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DB_TABLES } from "../lib/constants";
import moment from "moment";
import camelize from "camelize-ts";
import { Event } from "@/types/Event";
import { SupabaseError } from "@/types/errors";

//AUTH ACTIONS
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

export const signOutUserAfterAuthError = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  encodedRedirect(
    "error",
    "/sign-in",
    "You must be logged in to access this page"
  );
};

//GAME ACTIONS

export const createGameAction = async (gameData: {
  name: string;
  date: string;
  time: string;
  location: string;
  maxPlayers: number;
  city: string;
  playersNeeded: number;
}): Promise<{
  error?: SupabaseError;
}> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect(
      "error",
      "/protected/create-game",
      "You must be logged in to create a game"
    );
  }
  const dateTime = moment(
    `${gameData.date} ${gameData.time}`,
    "YYYY-MM-DD HH:mm"
  );

  const body = {
    name: gameData.name,
    scheduled_at: dateTime.toISOString(),
    location: gameData.location,
    max_players: gameData.maxPlayers,
    players_needed: gameData.playersNeeded,
    city: gameData.city,
    creator_id: user.id,
  };

  const { data, error } = await supabase
    .from(DB_TABLES.events)
    .insert([body])
    .select();

  if (error) {
    return { error };
  } else {
    console.log("game created", data);
    redirect(`/game/${data[0].id}`);
  }
};

export const fetchAllGames = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from(DB_TABLES.events).select();

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return { error: "Could not fetch events" };
  }

  return { data: camelize(data) };
};

export const fetchGames = async ({
  onDate,
  searchQuery,
  page = 1,
  limit = 12,
}: {
  onDate?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
}): Promise<{
  data?: Event[];
  error?: string;
  nPages?: number;
}> => {
  const supabase = createClient();

  let query = supabase.from(DB_TABLES.events).select("*", { count: "exact" });

  // If onDate is provided, filter by that date
  if (onDate) {
    const date = new Date(onDate);
    const startOfDay = moment(date).startOf("day").toISOString();
    const endOfDay = moment(date).endOf("day").toISOString();
    query = query.gte("scheduled_at", startOfDay).lte("scheduled_at", endOfDay);
  }

  // If searchQuery is provided, filter by that query
  if (searchQuery) {
    query = query.ilike("city", `%${searchQuery}%`);
  }

  const start = (page - 1) * limit;
  const end = start + limit - 1;
  query.range(start, end);

  const { data, error, count } = await query.order("scheduled_at", {
    ascending: true,
  });

  const nPages = Math.ceil(count ? count / limit : 1);

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return { error: error.message };
  }

  return { data: camelize(data), nPages };
};

export const fetchTodayGames = async () => {
  const supabase = createClient();

  // Define the start and end of the day using moment
  const startOfDay = moment().startOf("day").toISOString();
  const endOfDay = moment().endOf("day").toISOString();

  const { data, error } = await supabase
    .from(DB_TABLES.events)
    .select()
    .gte("scheduled_at", startOfDay)
    .lte("scheduled_at", endOfDay)
    .order("scheduled_at", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return { error: "Could not fetch events" };
  }

  return { data: camelize(data) };
};

export const fetchGamesByUser = async (
  userId: string
): Promise<{
  data?: Event[];
  error?: string;
}> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(DB_TABLES.events)
    .select()
    .eq("creator_id", userId)
    .order("scheduled_at", { ascending: true });

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

export const joinGame = async (
  eventId: string
): Promise<{
  data?: Event[];
  error: SupabaseError | null;
}> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect(
      "error",
      "/protected/create-game",
      "You must be logged in to create a game"
    );
  }

  const body = {
    user_id: user.id,
    event_id: eventId,
  };

  // Insert row in event_users
  const { error: insertError } = await supabase
    .from(DB_TABLES.eventUsers)
    .insert([body]);

  if (insertError) {
    return { error: insertError };
  }

  // Fetch participants array in events
  const { data: participantsData, error: fetchError } = await supabase
    .from(DB_TABLES.events)
    .select("participants")
    .eq("id", eventId)
    .single(); // .single() ensures you get only one row

  if (fetchError) {
    return { error: fetchError };
  }

  const participants = participantsData?.participants ?? []; // Default to an empty array if null

  // Ensure user isn't already in the participants array
  if (!participants.includes(user.id)) {
    const updatedParticipants = [...participants, user.id];

    // Update the participants array in the events table
    const { error: updateError } = await supabase
      .from(DB_TABLES.events)
      .update({ participants: updatedParticipants }) // Use .update() instead of .select()
      .eq("id", eventId);

    if (updateError) {
      return { error: updateError };
    }
  }

  return { error: null };
};

export const leaveGame = async (
  eventId: string
): Promise<{
  data?: Event[];
  error: SupabaseError | null;
}> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect(
      "error",
      "/protected/join-game",
      "You must be logged in to leave a game"
    );
  }

  // Remove the row from event_users
  const { error: deleteError } = await supabase
    .from(DB_TABLES.eventUsers)
    .delete()
    .eq("user_id", user.id)
    .eq("event_id", eventId);

  if (deleteError) {
    return { error: deleteError };
  }

  // Fetch participants array in events
  const { data: participantsData, error: fetchError } = await supabase
    .from(DB_TABLES.events)
    .select("participants")
    .eq("id", eventId)
    .single(); // .single() ensures you get only one row

  if (fetchError) {
    return { error: fetchError };
  }

  const participants = participantsData?.participants ?? []; // Default to an empty array if null

  // Remove the user from the participants array if they are in it
  if (participants.includes(user.id)) {
    const updatedParticipants = participants.filter(
      (participantId: string) => participantId !== user.id
    );

    // Update the participants array in the events table
    const { error: updateError } = await supabase
      .from(DB_TABLES.events)
      .update({ participants: updatedParticipants })
      .eq("id", eventId);

    if (updateError) {
      return { error: updateError };
    }
  }

  return { error: null };
};
