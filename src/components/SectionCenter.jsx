import React from "react";
import clsx from "clsx";

const SectionCenter = ({ children, className }) => {
  return <div className={clsx("p-4 w-full h-full", className)}>{children}</div>;
};

export default SectionCenter;
