import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { authStore, INITIAL_AUTH_STORE } from "../../signals/auth.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const headers = new Headers();
    deleteCookie(headers, "supaLogin");

    headers.set("location", "/");

    authStore.value = INITIAL_AUTH_STORE;

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
