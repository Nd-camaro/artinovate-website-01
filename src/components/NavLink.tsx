import { Link, useLocation } from "@/lib/router-compat";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<ComponentProps<typeof Link>, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const location = useLocation();
    const target = typeof to === "string" ? to.split(/[?#]/)[0] : "";
    const isActive = location.pathname === target;
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
