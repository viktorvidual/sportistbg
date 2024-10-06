"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGameAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(12);

  const onComplete = async () => {
    try {
      setIsLoading(true);
      await createGameAction({
        name,
        date,
        time,
        location,
        maxPlayers,
      });
      toast({
        title: "Game created successfully",
        description: "You can now view the game in the list of games.",
      });

    } catch (e) {
      return toast({
        title: "Could not create game, please try again.",
      });
    }
  };

  return (
    <main>
      <h1 className="text-2xl">Create a Game</h1>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Game name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            name="time"
            required
            onChange={(e) => setTime(e.target.value)}
          />
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            placeholder="Game location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          <Label htmlFor="maxPlayers">Max Players</Label>
          <Input
            type="number"
            name="maxPlayers"
            placeholder="Max players"
            required
            defaultValue={12}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
          />
          <Button
            onClick={(e) => { 
              e.preventDefault();
              onComplete();
            } }
            disabled={!name || !date || !time || !location || !maxPlayers}
          >
            {isLoading ? "Creating Game..." : "Create Game"}
          </Button>
          {/* <FormMessage message={searchParams} /> */}
        </div>
      </form>
    </main>
  );
}
