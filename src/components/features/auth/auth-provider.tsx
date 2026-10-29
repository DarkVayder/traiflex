"use client";

import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { firebaseAuth } from "@/lib/firebase/client";

type AuthState =
  | { status: "loading"; user: null }
  | { status: "signed-in"; user: User }
  | { status: "signed-out"; user: null };

const AuthContext = createContext<AuthState>({ status: "loading", user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading", user: null });
  const queryClient = useQueryClient();

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth(), (user) => {
        if (user) {
          setState({ status: "signed-in", user });
        } else {
          // Never let one user's cached list leak into the next session.
          queryClient.clear();
          setState({ status: "signed-out", user: null });
        }
      }),
    [queryClient],
  );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
