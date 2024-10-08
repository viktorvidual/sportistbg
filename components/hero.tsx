import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* The h1 below is visible on for screen readers */}
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">
        Your games all at one place{" "}
      </p>
      <Link
        href="explore-games"
        type="submit"
        className={buttonVariants({ size: "lg" })}
      >
        Explore Games
      </Link>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p className="text-2xl lg:text-3xl font-bold">Find a game </p>

      <SearchBar searchParams={{ query: "", onDate: "" }} />

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
