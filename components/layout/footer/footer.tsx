import React from "react";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Container } from "../../util/container";
// import { RawRenderer } from "./rawRenderer";
import { tinaField } from "tinacms/dist/react";
// import { useRouter } from "next/router";
import { useTheme } from "..";
// import { Icon } from "../../util/icon";

export const Footer = ({ data }) => {
  const theme = useTheme();
  // const router = useRouter();
  const [, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const socialIconClasses = "h-4 w-auto";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100",
  };

  const footerColor = {
    default:
      "text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000",
    primary: {
      blue: "text-white from-blue-500 to-blue-700",
      teal: "text-white from-teal-500 to-teal-600",
      green: "text-white from-green-500 to-green-600",
      red: "text-white from-red-500 to-red-600",
      pink: "text-white from-pink-500 to-pink-600",
      purple: "text-white from-purple-500 to-purple-600",
      yellow: "text-white from-yellow-500 to-yellow-600",
    },
    orange: "text-white from-orange-500 to-orange-600",
  };

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[theme.color] : data.color === "orange" ? footerColor.orange[theme.color]
      : footerColor.default;

  return (
    <footer className={`bg-gradient-to-br ${data.sPadding} ${footerColorCss}`}>
      <Container size={data.size} className={`${data.cPadding}`}>
        <div className="grid grid-cols-12 justify-between xs:gap-y-6 gap-y-4">
          <div className="col-start-1 sm:col-span-5 col-span-12 ">
            <Link
              data-tina-field={tinaField(data.footerLogo, "logoSrc")}
              href="/"
              className=""
            >
              <img
                src={data.footerLogo?.logoSrc}
                alt={data.footerLogo?.logoAlt}
                className="md:w-72 w-48"
              />
            </Link>
            <p className="my-5">
              As a software solution company, we are here to deliver intelligent
              systems that can help businesses in streamlining their work
              processes and scale up production
            </p>
            <div className="flex gap-4">
              {data.social && data.social.facebook && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={data.social.facebook}
                  target="_blank"
                >
                  <FaFacebookF
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        data.color === "primary" ? "primary" : data.color ===  "orange" ? "orange" : theme.color
                      ]
                    }`}
                  />
                </a>
              )}
              {data.social && data.social.twitter && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={data.social.twitter}
                  target="_blank"
                >
                  <FaTwitter
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        data.color === "primary" ? "primary" : data.color ===  "orange" ? "orange" : theme.color
                      ]
                    }`}
                  />
                </a>
              )}
              {data.social && data.social.instagram && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={data.social.instagram}
                  target="_blank"
                >
                  <AiFillInstagram
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        data.color === "primary" ? "primary" : data.color === "orange" ? "orange" : theme.color
                      ]
                    }`}
                  />
                </a>
              )}
              {data.social && data.social.github && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={data.social.github}
                  target="_blank"
                >
                  <FaGithub
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        data.color === "primary" ? "primary" : data.color === "orange" ? "orange" : theme.color
                      ]
                    }`}
                  />
                </a>
              )}
            </div>
          </div>

          <div className="sm:col-start-7 col-start-1 sm:col-span-2 xs:col-span-5 col-span-12">
            <p className="md:text-base mb-3 font-bold">Quick Links</p>
            <ul>
              {data.quickLinks &&
                data.quickLinks.map((item, i) => {
                  return (
                    <li key={`${item.label}-${i}`}>
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className={`block transition duration-150 ease-out hover:opacity-100 py-1`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="sm:col-start-10 xs:col-start-7 col-start-1 sm:col-span-3 xs:col-span-5 col-span-12">
            <p className="md:text-base mb-3 font-bold">Important Links</p>
            <ul>
              {data.importantLinks &&
                data.importantLinks.map((item, i) => {
                  return (
                    <li key={`${item.label}-${i}`}>
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className={`block transition duration-150 ease-out hover:opacity-100 py-1`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <p className="mt-12">
          © Copyright 2024 Dietary Business Intelligence LLC. All Rights
          Reserved.
        </p>
      </Container>
    </footer>
  );
};
