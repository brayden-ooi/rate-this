import { Handlers } from "$fresh/server.ts";
import { InputTextWithLabel } from "../../components/InputText.tsx";
import { supabase } from "../../utils/supabase.ts";
import { isString } from "../../utils/validators.ts";
import { setCookie } from "$std/http/cookie.ts";
import { authStore } from "../../signals/auth.ts";
import { Button } from "../../components/Button.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    // forbidden to access this page if have token
    if (authStore.value.token) {
      const headers = new Headers();

      headers.set("location", "/");
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    return ctx.render({
      title: "Login",
      error: null,
    });
  },
  async POST(req, ctx) {
    try {
      const form = await req.formData();
      const email = isString(form.get("email"));
      const password = isString(form.get("password"));

      const { data, error } = await supabase.auth
        .signInWithPassword({ email, password });

      if (error) throw error;

      if (!data.session) {
        throw new Error("Supabase error: No session returned");
      }

      const headers = new Headers();

      setCookie(headers, {
        name: "supaLogin",
        value: data.session?.access_token,
        maxAge: data.session.expires_in,
      });

      authStore.value = {
        token: data.session?.access_token,
      };

      headers.set("location", "/");
      return new Response(null, {
        status: 303,
        headers,
      });
    } catch (e) {
      return ctx.render({
        title: "Login",
        error: e.message,
      });
    }
  },
};

export default function Login() {
  return (
    <form class="space-y-4 md:space-y-6" method="POST">
      <InputTextWithLabel
        label="Your email"
        type="email"
        name="email"
        id="email"
        placeholder="name@company.com"
      />
      <InputTextWithLabel
        label="Password"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
      />

      <Button type="submit">
        Login
      </Button>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account yet?{" "}
        <a
          href="/signup"
          class="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
