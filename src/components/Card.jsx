import { clsx } from "clsx";

const Card = ({ children, className, variant = "default", ...props }) => {
  const baseStyles = "rounded-lg shadow-sm";

  const variants = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
    bordered: "bg-white border-2 border-gray-200",
    flat: "bg-gray-50",
  };

  return (
    <div className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className, ...props }) => {
  return (
    <div className={clsx("p-6", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx("px-6 py-4 border-t border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
