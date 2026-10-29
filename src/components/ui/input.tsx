import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-md border border-border bg-surface-raised px-4 text-base text-foreground placeholder:text-subtle",
        "aria-[invalid=true]:border-danger",
        className,
      )}
      {...props}
    />
  );
});
