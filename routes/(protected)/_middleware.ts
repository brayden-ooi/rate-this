import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const supaCreds = getCookies(req.headers)["supaLogin"];

  if (!supaCreds) {
    const headers = new Headers();

    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  return await ctx.next();
}
