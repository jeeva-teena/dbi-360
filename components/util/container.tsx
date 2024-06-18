import React from "react";

export const Container = ({
  children,
  size = "large",
  // width = "large",
  bgimg = "",
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
    default: "max-w-7xl",
    custom: "",
  };
  const style = bgimg ? { backgroundImage: `url(${bgimg})` } : {};
  return (
    <div
      className={`${widthClass[size]} mx-auto ${verticalPadding[size]} ${className}`}
      {...props}
      style={style}
    >
      {children}
    </div>
  );
};
