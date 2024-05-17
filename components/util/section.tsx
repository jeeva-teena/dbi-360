import React, { CSSProperties, ReactNode } from "react";
import { useTheme } from "../layout";

interface SectionProps {
  children: ReactNode;
  color?: string;
  bgimg?: string;
  className?: string;
  size?: string;
  width?: string;
}
export const Section: React.FC<SectionProps> = ({
  children,
  color = "",
  bgimg = "",
  className = "",
  width = "",
}) => {
  const theme = useTheme();
  // const verticalGap = {
  //   custom: "",
  //   small: "mb-2",
  //   medium: "mb-4",
  //   large: "mb-8",
  //   default: "mb-4",
  // };
  const sectionStyle: CSSProperties = {};

  if (bgimg) {
    sectionStyle.backgroundImage = `url(${bgimg})`;
    sectionStyle.backgroundSize = "cover";
    sectionStyle.backgroundPosition = "center center";
    sectionStyle.backgroundRepeat = "no-repeat";
  }

  const sectionColor = {
    default:
      "bg-gradient-to-tl via-transparent to-transparent",
    tint: "text-gray-900 dark:text-gray-100 bg-gradient-to-br from-gray-100 dark:from-gray-1000 to-transparent",
    primary: {
      blue: "text-white bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-600",
      teal: "text-white bg-teal-500 bg-gradient-to-br from-teal-500 to-teal-600",
      green:
        "text-white bg-green-600 bg-gradient-to-br from-green-600 to-green-700",
      red: "text-white bg-red-500 bg-gradient-to-br from-red-500 to-red-600",
      pink: "text-white bg-pink-500 bg-gradient-to-br from-pink-500 to-pink-600",
      purple:
        "text-white bg-purple-500 bg-gradient-to-br from-purple-500 to-purple-600",
      yellow:
        "text-white bg-yellow-500 bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    orange:
      "text-white bg-orange-500 bg-gradient-to-br from-orange-500 to-orange-600",
  };
  const widthClass = {
    small: "max-w-4xl",
    medium: "max-w-5xl",
    large: "max-w-7xl",
    custom: "",
  };
  const sectionColorCss =
    color === "primary"
      ? sectionColor.primary[theme.color]
      : sectionColor[color]
      ? sectionColor[color]
      : sectionColor.default;
      color === "orange"
      ? sectionColor.orange[theme.color]
      : sectionColor[color]
      ? sectionColor[color]
      : sectionColor.default;
  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${sectionColorCss} ${widthClass[width]} ${className}`}
      // className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${verticalGap[size]} ${sectionColorCss} ${className}`}
      style={sectionStyle}
    >
      {children}
    </section>
  );
};
