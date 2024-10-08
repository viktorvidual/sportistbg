import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";

export default function SearchBar({
  searchParams,
}: {
  searchParams: { query?: string; onDate?: string };
}) {
  const query = searchParams.query || "";
  const date = searchParams.onDate
    ? moment(searchParams.onDate).format("yyyy-MM-DD")
    : undefined;

  console.log(date, "in search bar");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Flex direction stays row but search button is stacked on mobile */}
      <form
        action="/explore-games"
        method="get"
        className="flex flex-wrap gap-2"
      >
        <div className="flex flex-grow">
          <Input
            type="text"
            name="searchQuery"
            placeholder="Search by city"
            defaultValue={query}
            className="pr-4 py-2 w-full"
          />
        </div>
        <div className="">
          <Input
            type="date"
            name="onDate"
            defaultValue={date}
            className="w-full"
          />
        </div>

        {/* Button is full width on mobile and auto on larger screens */}
        <div className="w-full md:w-auto">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Search Games
          </Button>
        </div>
      </form>
    </div>
  );
}
