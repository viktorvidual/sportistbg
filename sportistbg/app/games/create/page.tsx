import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { createGameAction } from "@/app/actions";
import { Message, FormMessage } from "@/components/form-message";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { generateEncodedRedirect } from "@/utils/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Message;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const path = generateEncodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to create a game."
    );
    return redirect(path);
  }

  return (
    <main>
      <h1 className="text-2xl">Create a Game</h1>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Game name" required />
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
          <FormMessage message={searchParams} />
        </div>
      </form>
    </main>
  );
}
