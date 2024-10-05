import { Camelize } from "camelize-ts";

type EventResult = {
  id: number;
  name: string;
  location: string;
  image?: string;
  scheduled_at: string;
};

export type Event = Camelize<EventResult>;
