import { type LayoutProps } from "$fresh/src/server/types.ts";
import Nav from "../components/Nav.tsx";
import { authStore } from "../signals/auth.ts";

export default function Layout(
  { Component }: LayoutProps,
) {
  return (
    <>
      <Nav loggedIn={!!authStore.value.token} />
      <div class="mx-auto">
        <Component />
      </div>
    </>
  );
}
