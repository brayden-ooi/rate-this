import { JSX } from "preact";
import type PropsWithChildren from "../types/PropsWithChildren.ts";

interface NavProps {
  loggedIn: boolean;
}

const getMenus = (
  isLoggedIn: boolean,
): Array<{ name: string; href: string }> => {
  const menus = [
    { name: "Home", href: "/" },
  ];

  if (isLoggedIn) {
    menus.push({ name: "Logout", href: "/logout" });
  } else {
    menus.push(
      { name: "Login", href: "/login" },
      { name: "Sign Up", href: "/signup" },
    );
  }

  return menus;
};

export default function Nav({ loggedIn }: NavProps) {
  return (
    <NavContainer>
      <LogoContainer>
        <img
          src="/logo.svg"
          width="40"
          height="40"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </LogoContainer>
      <ul class="flex gap-6">
        {getMenus(loggedIn).map((menu) => (
          <li>
            <NavLink label={menu.name} link={menu.href} />
          </li>
        ))}
      </ul>
    </NavContainer>
  );
}

const NavContainer = (
  { children }: PropsWithChildren,
) => (
  <div class="bg-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {children}
  </div>
);

const LogoContainer = (
  { children, ...props }: PropsWithChildren<JSX.HTMLAttributes<HTMLDivElement>>,
) => (
  <a href="/">
    <div
      class="ml-1 font-bold"
      {...props}
    >
      {children}
    </div>
  </a>
);

const NavLink = ({
  link,
  label,
}: {
  link: string;
  label: string;
}) => (
  <a
    href={link}
    class="text-gray-500 hover:text-gray-700 py-1 border-gray-500"
  >
    {label}
  </a>
);
