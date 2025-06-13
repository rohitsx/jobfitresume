import { useErrorStore } from "@/store/store.error";
import { LucideIcon } from "lucide-react";
import { ErrorAlert } from "./ErrorAlert";
import { ReactNode } from "react";

export const SnapSection = ({
  value,
  Icon,
  id,
  children,
}: {
  value: string;
  Icon: LucideIcon;
  id: string;
  children: ReactNode;
}) => {
  const { error } = useErrorStore();

  return (
    <section className="h-screen" id={id}>
      <div className="border-b border-gray-200 text-black p-5 px-4 lg:px-12 flex items-center gap-2">
        <Icon className="size-5" />
        {value}
      </div>

      <div className="p-4 py-8 lg:p-12 space-y-12">
        {error && <ErrorAlert err={error} />}
        {children}
      </div>
    </section>
  );
};
