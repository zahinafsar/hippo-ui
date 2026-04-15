import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function AlertPreview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>New update available.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  );
}
