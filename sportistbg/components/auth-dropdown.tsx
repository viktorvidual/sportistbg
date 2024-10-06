import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

import { signOutAction } from "@/app/actions";
import Link from "next/link";

export default async function AuthDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AccountCircleIcon style={{ fontSize: 40 }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-content" align="center">
        <Link
          href="/protected/my-games"
          className={`${buttonVariants({ variant: "ghost" })} gap-1 flex justify-start items-center`}
        >
          <CalendarMonthIcon />
          <span>My Games</span>
        </Link>

        <Link
          className={`${buttonVariants({ variant: "ghost" })} gap-1 flex justify-start items-center`}
          href="/protected/settings"
        >
          <SettingsIcon />
          <span>Settings</span>
        </Link>

        <form action={signOutAction} method="post" className="w-full">
          <div></div>
          <Button type="submit" variant={"ghost"} className="w-full gap-1">
            <LogoutIcon />
            <span>Sign out</span>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
