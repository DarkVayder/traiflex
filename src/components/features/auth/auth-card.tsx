import type { ReactNode } from "react";

export function AuthCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-scrim p-6 shadow-2xl shadow-black/60 ring-1 ring-border/60 sm:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? <p className="text-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function FormAlert({ tone = "error", children }: { tone?: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={
        tone === "error"
          ? "rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          : "rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm text-success"
      }
    >
      {children}
    </p>
  );
}
