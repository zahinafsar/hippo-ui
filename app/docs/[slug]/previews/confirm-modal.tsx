"use client";
import { useConfirm } from "@/components/ui/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ConfirmModalPreview() {
  const { confirm } = useConfirm();
  return (
    <Button
      variant="danger"
      onClick={() =>
        confirm({
          title: "Are you sure?",
          message: "This action cannot be undone.",
          confirmText: "Delete",
          variant: "danger",
          onConfirm: () => toast({ title: "Deleted", variant: "success" }),
        })
      }
    >
      Delete account
    </Button>
  );
}
