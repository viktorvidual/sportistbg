import { Camelize } from "camelize-ts";

export type EventResult = {
  id: string;
  creator_id: string;
  name: string;
  location: string;
  city: string;
  scheduled_at: string;
  max_players: number;
  players_needed: number;
  participants: string[];
};

export type Event = Camelize<EventResult>;
