import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ErrorAlert = ({ err }: { err: string }) => (
  <div className="fixed right-4 z-50 animate-slide-in-right">
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>{err}</AlertTitle>
    </Alert>
  </div>
);
