import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { generateEncodedRedirect } from "@/utils/utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

//dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOutAction}>
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/create-game">Create a Game</Link>
        </Button>
        {/* <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button> */}
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AccountCircleIcon
            style={{
              fontSize: 32,
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-content" align="center">
          <DropdownMenuItem className="flex gap-2 ">
            <CalendarMonthIcon />
            <span>My Events</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 ">
            <SettingsIcon />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 ">
            <LogoutIcon />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link
          href={generateEncodedRedirect(
            "error",
            "/sign-up",
            "Please sign up to create a game"
          )}
        >
          Create a Game
        </Link>
      </Button>
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
