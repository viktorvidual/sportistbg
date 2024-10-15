import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { buttonVariants } from "@/components/ui/button";
import { signOutAction } from "@/actions/authActions";

export default async function AuthDropdown() {
  const textStyle = "font-lg";
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
          <p className={textStyle}>My Games</p>
        </Link>

        <Link
          className={`${buttonVariants({ variant: "ghost" })} gap-1 flex justify-start items-center`}
          href="/protected/settings"
        >
          <SettingsIcon />
          <p className={textStyle}>Settings</p>
        </Link>

        <form action={signOutAction} method="post" className="w-full">
          <div></div>
          <Button type="submit" variant={"ghost"} className="w-full gap-1">
            <LogoutIcon />

            <p className={textStyle}>Sign out</p>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
