import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* The h1 below is visible on for screen readers */}
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">
        Your games all at one place{" "}
      </p>
      <Button type="submit">Explore Games</Button>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p className="text-2xl lg:text-3xl font-bold">Find a game </p>

      <div className="flex w-full max-w-xl items-center space-x-2">
        <Input type="text" placeholder="search by city" />
        <Button type="submit">Search</Button>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
