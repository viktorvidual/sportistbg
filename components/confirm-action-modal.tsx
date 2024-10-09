"use client";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Props = {
  triggerText: string;
  onConfirm: () => void;
  title: string;
  description?: string;
  loadingText?: string;
};

export default function ConfirmActionModal({
  triggerText,
  onConfirm,
  title,
  description,
  loadingText,
}: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onComplete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      toast({ title: "Game deleted successfully" });
    } catch (error) {
      toast({ title: "Could not delete game" });
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1" variant="outline">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] sm:max-w-sm py-5 rounded-md">
        {isLoading ? (
          <DialogHeader>
            <DialogTitle>{loadingText}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>

            <DialogFooter>
              <div className="flex flex-1 flex-row space-x-2">
                <div className="flex-1">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </div>

                <div className="flex-1">
                  <Button onClick={onComplete} type="submit" className="w-full">
                    Yes
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
