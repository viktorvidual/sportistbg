import Link from "next/link";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function GameNotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 py-20">
      <SentimentVeryDissatisfiedIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested game.</p>
      <Link
        href="/"
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors text-l"
      >
        Go Back
      </Link>
    </main>
  );
}
