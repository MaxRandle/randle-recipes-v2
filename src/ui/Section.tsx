import React from "react";

import clsx from "clsx";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

export const Section = React.forwardRef(
  ({ className, ...props }: SectionProps, ref: React.Ref<HTMLElement>) => {
    return (
      <section ref={ref} className={clsx("my-24", className)} {...props} />
    );
  },
);

Section.displayName = "Section";
