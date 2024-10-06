import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AuthDropdown from "./auth-dropdown";
import { ROUTES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={ROUTES.createGane}
      >
        Create a Game
      </Link>

      <AuthDropdown />
    </div>
  ) : (
    <div className="flex gap-2">
      <Link className={buttonVariants({ variant: "outline" })} href="/sign-in">
        Sign in
      </Link>

      <Link className={buttonVariants({ variant: "default" })} href="/sign-up">
        Sign up
      </Link>
    </div>
  );
}
