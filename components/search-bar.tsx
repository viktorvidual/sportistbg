"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function SearchBar({
  searchParams,
}: {
  searchParams: { query?: string; onDate?: string };
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.query || "");
  const [onDate, setOnDate] = useState(
    searchParams.onDate ? moment(searchParams.onDate).format("yyyy-MM-DD") : ""
  );

  const onSubmit = () => {
    router.push(
      `${ROUTES.EXPLORE_GAMES}?searchQuery=${searchQuery}&onDate=${onDate}`
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto item-center">
      {/* Flex direction stays row but search button is stacked on mobile */}

      <div className="flex mb-2">
        <div className="flex-grow mr-2">
          <Input
            type="text"
            name="searchQuery"
            placeholder="Search by city"
            defaultValue={searchQuery}
            className="pr-4 py-2 w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mr-2">
          <Input
            type="date"
            name="onDate"
            defaultValue={onDate}
            className="w-full"
            onChange={(e) => setOnDate(e.target.value)}
          />
        </div>
        <div className="hidden md:block">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Search Games
          </Button>
        </div>
      </div>

      {/* Button is full width on mobile and auto on larger screens */}
      <div className="w-full md:w-auto lg:hidden md:hidden">
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Search Games
        </Button>
      </div>
    </div>
  );
}
