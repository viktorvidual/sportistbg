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

import { signOutAction } from "@/app/actions";
import { redirect } from "next/navigation";

const navigateToMyEvents = async () => {
  "use server";
  return redirect("/my-events");
};

const navigateToSettings = async () => {
  "use server";
  return redirect("/settings");
};

export default async function AuthDropdown() {
  const buttonStyle = "w-full flex justify-start gap-2";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AccountCircleIcon style={{ fontSize: 32 }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="center">
        {/* My Events */}

        <form action={navigateToMyEvents} method="get">
          <DropdownMenuItem asChild>
            <Button variant="ghost" className={buttonStyle}>
              <CalendarMonthIcon />
              <span>My Events</span>
            </Button>
          </DropdownMenuItem>
        </form>

        {/* Settings */}
        <form action={navigateToSettings} method="get">
          <DropdownMenuItem asChild>
            <Button variant="ghost" className={buttonStyle}>
              <SettingsIcon />
              <span>Settings</span>
            </Button>
          </DropdownMenuItem>
        </form>

        {/* Sign Out */}
        <form action={signOutAction} method="post">
          <DropdownMenuItem asChild>
            <Button type="submit" variant="ghost" className={buttonStyle}>
              <LogoutIcon />
              <span>Sign out</span>
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
