import { type LayoutProps } from "$fresh/src/server/types.ts";

export type AuthPageDataType = {
  title: string;
  error: string | null;
};

export default function Layout(
  { Component, data }: LayoutProps<AuthPageDataType>,
) {
  return (
    <section class="bg-gray-200">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="mx-auto">
          <h2 class="text-2xl font-bold mb-5 text-center">{data.title}</h2>
        </div>
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            {!!data.error && (
              <div class="bg-red-400 border-l-4 p-4" role="alert">
                <p class="font-bold">Error</p>
                <p>{data.error}</p>
              </div>
            )}
            <Component />
          </div>
        </div>
      </div>
    </section>
  );
}
