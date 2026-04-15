import { Inbox, Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function EmptyStatePreview() {
  return (
    <EmptyState
      icon={<Inbox className="h-12 w-12" />}
      title="No messages"
      description="When you receive messages, they'll show up here."
      action={
        <Button>
          <Plus className="h-4 w-4" /> New message
        </Button>
      }
    />
  );
}
