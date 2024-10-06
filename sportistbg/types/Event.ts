import { Camelize } from "camelize-ts";

export type EventResult = {
  id: string;
  creator_id: string;
  name: string;
  location: string;
  image?: string;
  scheduled_at: string;
  max_players: number;
};

export type Event = Camelize<EventResult>;
