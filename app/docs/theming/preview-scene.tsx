"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PreviewScene() {
  return (
    <div className="h-full w-full overflow-hidden bg-background p-6 text-foreground">
      <div className="mx-auto flex h-full max-w-md flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Project status</h3>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </div>
          <Badge>Live</Badge>
        </div>

        <Card className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="preview-email">Email</Label>
            <Input id="preview-email" placeholder="you@example.com" readOnly />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">Save changes</Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </Card>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Beta</Badge>
          <Badge variant="danger">Deprecated</Badge>
          <span className="text-xs text-muted-foreground">3 tags</span>
        </div>
      </div>
    </div>
  );
}
