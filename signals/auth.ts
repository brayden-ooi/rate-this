import { signal } from "@preact/signals";

export type AuthStoreType = {
  token: string | null;
};

export const INITIAL_AUTH_STORE: AuthStoreType = {
  token: null,
};

export const authStore = signal<AuthStoreType>(INITIAL_AUTH_STORE);
