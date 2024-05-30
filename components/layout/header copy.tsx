import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // State to track open submenu, using submenu title as identifier
  const [activeLink, setActiveLink] = useState<string>(""); // State to track active link for page navigation
  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const isActiveSubmenu = (title: string) => {
    return openSubmenu === title;
  };

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setOpenSubmenu(null); // Close submenu on link click
  };

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    tint: "text-gray-900 dark:text-gray-100 bg-gradient-to-br from-gray-100 dark:from-gray-1000 to-transparent",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
    orange: "text-white from-orange-400 to-orange-500",
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : data.color === "orange"
      ? headerColor.orange[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
      "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
      "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
      "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
      "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`relative bg-gradient-to-b ${headerColorCss}`}>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              data-tina-field={tinaField(data.logo, "src")}
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <img src={data.logo.src} alt={data.logo.alt} className="w-40" />
            </Link>
          </h4>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  (item.href === ""
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href)) && isClient;

                const hasSubmenu = item.submenu && item.submenu.length > 0;

                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={`relative ${
                      activeItem ? activeItemClasses[theme.color] : ""
                    }`}
                  >
                    {hasSubmenu ? (
                      <div
                        onClick={() => toggleSubmenu(item.label)}
                        className={`select-none cursor-pointer text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                          isActiveSubmenu(item.label) ? `` : `opacity-70`
                        }`}
                      >
                        {item.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline align-sub ms-2"
                          width={20}
                          height={20}
                          viewBox="0 0 320 512"
                        >
                          <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                        </svg>
                      </div>
                    ) : (
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className={`select-none text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                          activeItem ? `` : `opacity-70`
                        }`}
                        onClick={() => handleLinkClick(`/${item.href}`)}
                      >
                        {item.label}
                      </Link>
                    )}

                    {isActiveSubmenu(item.label) && item.submenu && (
                      <ul className="absolute left-0 top-20 px-8 py-4 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-md z-10">
                        {item.submenu.map((submenu) => (
                          <li
                            key={submenu.title}
                            className="cursor-pointer py-2.5"
                          >
                            <Link data-tina-field={tinaField(submenu, "title")} href={`/${submenu.link}`}>{submenu.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary"
              ? `via-white`
              : data.color === "orange"
              ? `via-white`
              : `via-black dark:via-white`
          } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
        />
      </Container>
    </div>
  );
};