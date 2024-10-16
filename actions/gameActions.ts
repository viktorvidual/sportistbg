"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DB_TABLES } from "@/lib/constants";
import moment from "moment";
import camelize from "camelize-ts";
import { Event } from "@/types/Event";
import { User } from "@/types/User";
import { SupabaseError } from "@/types/errors";
import { revalidatePath } from "next/cache";

export const createGame = async (gameData: {
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

export const fetchGamesCreatedByUser = async (
  userId: string
): Promise<{
  data: Event[];
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
    return { data: [], error: "Could not fetch events" };
  }

  return { data: camelize(data) };
};

export const fetchJoinedGamesByUser = async (
  userId: string
): Promise<{
  data: Event[];
  error: SupabaseError | null;
}> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(DB_TABLES.eventUsers)
    .select(`events ( * )`)
    .eq("user_id", userId);

  if (error) {
    return {
      data: [],
      error: error,
    };
  }

  const events = data.map((el: { events: any }) => el.events);

  return { data: events, error: null };
};

export const fetchGameParticipants = async (
  participants: string[]
): Promise<{
  data: User[] | [];
  error: SupabaseError | null;
}> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(DB_TABLES.users)
    .select()
    .in("id", participants);

  if (error) {
    return { data: [], error };
  }

  return { data, error: null };
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

export const deleteGame = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from(DB_TABLES.events).delete().eq("id", id);

  if (error) {
    return { error };
  }

  return redirect("/");
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

  revalidatePath("protected/my-games");

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

  revalidatePath("protected/my-games");

  return { error: null };
};
