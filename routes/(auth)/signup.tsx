import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../components/Button.tsx";
import { InputTextWithLabel } from "../../components/InputText.tsx";
import { authStore } from "../../signals/auth.ts";
import { supabase } from "../../utils/supabase.ts";
import { isString } from "../../utils/validators.ts";

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
      title: "Create Account",
      error: null,
    });
  },
  async POST(req, ctx) {
    try {
      const form = await req.formData();
      const email = isString(form.get("email"));
      const password = isString(form.get("password"));

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const headers = new Headers();

      headers.set("location", "/");
      return new Response(null, {
        status: 303,
        headers,
      });
    } catch (e) {
      return ctx.render({
        title: "Create Account",
        error: e.message,
      });
    }
  },
};

export default function SignUp() {
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
        Sign Up
      </Button>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="/login"
          class="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Login here
        </a>
      </p>
    </form>
  );
}
