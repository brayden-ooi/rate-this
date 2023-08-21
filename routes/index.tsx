import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";
import { authStore, AuthStoreType } from "../signals/auth.ts";

export const handler: Handlers<AuthStoreType> = {
  GET(_req, ctx) {
    return ctx.render(authStore.value);
  },
};

export default function Home(props: PageProps<AuthStoreType>) {
  return (
    <>
      <Head>
        <title>Rate This!</title>
      </Head>

      <div class="mt-10 px-5 mx-auto flex max-w-screen-md flex-col justify-center">
        {props.data.token
          ? (
            <div class="mx-auto text-center">
              <h1 class="text-2xl font-bold mb-5">Nice you're logged In!</h1>
              <Button>
                <a href="/secret">
                  Secret
                </a>
              </Button>
            </div>
          )
          : (
            <div class="mx-auto text-center">
              <h1 class="text-2xl font-bold mb-5">Login to access all pages</h1>
              <a href="/login">
                <Button>
                  Login
                </Button>
              </a>
            </div>
          )}
      </div>
    </>
  );
}
