import { Button } from "@/components/ui/button";
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

type Props = {
  triggerText: string;
  onConfirm?: () => void;
  title: string;
  description?: string;
};

export default function ConfirmActionModal({
  triggerText,
  onConfirm,
  title,
  description,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1" variant="outline">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] sm:max-w-sm py-10">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-1 flex-row space-x-2">
            <div className="flex-1">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </div>

            <div className="flex-1">
              <form action={onConfirm} method="post" className="w-full">
                <Button type="submit" className="w-full">
                  Yes
                </Button>
              </form>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
