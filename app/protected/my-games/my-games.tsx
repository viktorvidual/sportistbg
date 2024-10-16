"use client";
import GamesList from "@/components/games-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types/Event";
import { motion } from "framer-motion";

type Props = {
  eventsCreatedData: Event[];
  joinedEventsData: Event[];
  userId: string;
};

export default async function MyGames({
  eventsCreatedData,
  joinedEventsData,
  userId,
}: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-secondary rounded">
      <Tabs defaultValue="my-games" className="w-full">
        <TabsList className="flex justify-start mb-8 bg-transparent">
          <TabsTrigger
            value="my-games"
            className="px-6 py-3 text-lg font-semibold transition-all duration-300 ease-in-out rounded-t-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            My Games
          </TabsTrigger>
          <TabsTrigger
            value="joined-games"
            className="px-6 py-3 text-lg font-semibold transition-all duration-300 ease-in-out rounded-t-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Joined Games
          </TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TabsContent
            value="my-games"
          >
            {eventsCreatedData ? (
              <GamesList games={eventsCreatedData} userId={userId} />
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                You don't have any active games
              </p>
            )}
          </TabsContent>
          <TabsContent
            value="joined-games"
          >
            {joinedEventsData ? (
              <GamesList games={joinedEventsData} userId={userId} />
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                You don't have any active games
              </p>
            )}
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
