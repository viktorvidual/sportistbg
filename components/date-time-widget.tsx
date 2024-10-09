import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

export default function DateTimeWidget({ timeStamp }: { timeStamp: string }) {
  return (
    <Card className="w-full mx-auto overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-primary">Wednesday</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">09/10/24</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Clock className="w-8 h-8 text-primary mr-2" />
          <span className="text-4xl font-bold text-primary">22:21</span>
        </div>
      </CardContent>
    </Card>
  );
}
