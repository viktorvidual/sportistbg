import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  onDate?: string;
  searchQuery?: string;
  page: number;
  limit?: number;
  nPages: number;
};

export default function GamesPagination({
  onDate,
  searchQuery,
  page,
  limit,
  nPages,
}: Props) {
  const hasPrevPage = page > 1;
  const prevPage = +page - 1;

  const hasNextPage = page < nPages;
  const nextPage = +page + 1;

  //append params if any
  let route = `explore-games?searchQuery=${searchQuery}&onDate=${onDate}&limit=${limit}`;

  console.log(route);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationPrevious href={`${route}&page=${prevPage}`} />
          )}
        </PaginationItem>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationLink href={`${route}&page=${prevPage}`}>
              {prevPage}
            </PaginationLink>
          )}

          <PaginationLink isActive={true} href={`${route}&page=${page}`}>
            {page}
          </PaginationLink>

          {hasNextPage && (
            <PaginationLink href={`${route}&page=${nextPage}`}>
              {nextPage}
            </PaginationLink>
          )}
        </PaginationItem>

        <PaginationItem>
          {hasNextPage && <PaginationNext href={`${route}&page=${nextPage}`} />}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
