"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGame } from "@/actions/gameActions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import moment from "moment";

const InputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 gap-2.5 flex-col">{children}</div>
);
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(12);
  const [playersNeeded, setPlayersNeeded] = useState(0);

  const onComplete = async () => {
    try {
      setIsLoading(true);
      const { error } =
        (await createGame({
          name,
          date,
          time,
          location,
          maxPlayers,
          playersNeeded,
          city,
        })) || {};

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Game created successfully",
        description: "You can now view the game in the list of games.",
      });
    } catch (e) {
      return toast({
        title: "Could not create game",
        description: e instanceof Error && e.message,
      });
    }
  };

  return (
    <main className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Create a Game</h1>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-3 mt-3">
          <InputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>
          <div className="flex flox-row gap-2">
            <InputContainer>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                name="date"
                required
                onChange={(e) => setDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </InputContainer>
            <div className="gap-3">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                name="time"
                required
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <InputContainer>
            <Label htmlFor="date">City</Label>
            <Input
              name="city"
              required
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              min={moment().format("YYYY-MM-DD")}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="location">Stadium</Label>
            <Input
              name="location"
              placeholder="Game location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputContainer>
          <div className="flex flox-row gap-2">
            <InputContainer>
              <Label htmlFor="maxPlayers">Max Players</Label>
              <Input
                type="number"
                name="maxPlayers"
                placeholder="Max players"
                required
                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
              />
            </InputContainer>

            <InputContainer>
              <Label htmlFor="playersNeeded">Players needed</Label>
              <Input
                type="number"
                name="playersNeeded"
                placeholder="Players needed"
                required
                onChange={(e) => setPlayersNeeded(parseInt(e.target.value))}
              />
            </InputContainer>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onComplete();
            }}
            disabled={
              !name ||
              !date ||
              !time ||
              !location ||
              !maxPlayers ||
              !playersNeeded ||
              !city
            }
          >
            {isLoading ? "Creating Game..." : "Create Game"}
          </Button>
        </div>
      </form>
    </main>
  );
}
