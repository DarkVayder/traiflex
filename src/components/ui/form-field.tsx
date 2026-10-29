import { cloneElement, useId, type ReactElement } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: ReactElement<{ id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }>;
}

/** Labels a single input and wires its error/hint text for screen readers. */
export function FormField({ label, error, hint, children }: FormFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message ? (
        <p id={messageId} className={error ? "text-sm text-danger" : "text-sm text-subtle"}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
