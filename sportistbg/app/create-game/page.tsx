import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { createGameAction } from "@/app/actions";

export default function Page() {
  return (
    <main>
      <h1>Create Game</h1>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Game name" required />
          <Label htmlFor="description">Description</Label>
          <Input name="description" placeholder="Game description (optional)" />
          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" required />
          <Label htmlFor="time">Time</Label>
          <Input type="time" name="time" required />
          <Label htmlFor="location">Location</Label>
          <Input name="location" placeholder="Game location" required />
          <Label htmlFor="maxPlayers">Max Players</Label>
          <Input
            type="number"
            name="maxPlayers"
            placeholder="Max players"
            required
            defaultValue={12}
          />
          <SubmitButton
            pendingText="Creating Game..."
            formAction={createGameAction}
          >
            Create Game
          </SubmitButton>
        </div>
      </form>
    </main>
  );
}
