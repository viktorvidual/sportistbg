import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "./search-bar";

const ElementContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full max-w-3xl">{children}</div>;
};

const HorizontalLine = () => (
  <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
);

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* The h1 below is visible on for screen readers */}
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <ElementContainer>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">
          Your games all at one place{" "}
        </p>
      </ElementContainer>
      <Link
        href="explore-games"
        type="submit"
        className={buttonVariants({ size: "lg" })}
      >
        Explore Games
      </Link>
      <HorizontalLine />
      <p className="text-2xl lg:text-3xl font-bold">Find a game </p>
      <ElementContainer>
        <SearchBar searchParams={{ query: "", onDate: "" }} />
      </ElementContainer>
      <HorizontalLine />
    </div>
  );
}
