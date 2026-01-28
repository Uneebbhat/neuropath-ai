import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className="w-14 h-14" />
    </div>
  );
}
