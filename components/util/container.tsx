import React from "react";

export const Container = ({
  children,
  size = "medium",
  width = "large",
  className = "",
  ...props
}) => {
  const verticalPadding = {
    custom: "",
    small: "py-2",
    medium: "py-6",
    large: "py-20",
    default: "py-6",
  };
  const widthClass = {
    small: "max-w-4xl",
    medium: "max-w-5xl",
    large: "max-w-7xl",
    custom: "",
  };

  return (
    <div
      className={`${widthClass[width]} mx-auto ${verticalPadding[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
