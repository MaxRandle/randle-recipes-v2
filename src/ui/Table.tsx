import clsx from "clsx";
import React from "react";

// Table

type TableProps = React.ComponentPropsWithoutRef<"table">;

export const Table = React.forwardRef(
  ({ className, ...props }: TableProps, ref: React.Ref<HTMLTableElement>) => {
    return (
      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        className={clsx("border-separate", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Table.displayName = "Table";

// Thead

type TheadProps = React.ComponentPropsWithoutRef<"thead">;

export const Thead = React.forwardRef(
  (
    { className, ...props }: TheadProps,
    ref: React.Ref<HTMLTableSectionElement>,
  ) => {
    return <thead className={clsx(className)} ref={ref} {...props} />;
  },
);

Thead.displayName = "Thead";

// Tbody

type TbodyProps = React.ComponentPropsWithoutRef<"tbody">;

export const Tbody = React.forwardRef(
  (
    { className, ...props }: TbodyProps,
    ref: React.Ref<HTMLTableSectionElement>,
  ) => {
    return <tbody className={clsx(className)} ref={ref} {...props} />;
  },
);

Tbody.displayName = "Tbody";

// Tr

type TrProps = React.ComponentPropsWithoutRef<"tr">;

export const Tr = React.forwardRef(
  ({ className, ...props }: TrProps, ref: React.Ref<HTMLTableRowElement>) => {
    return <tr className={clsx("group/tr", className)} ref={ref} {...props} />;
  },
);

Tr.displayName = "Tr";

// Th

type ThProps = React.ComponentPropsWithoutRef<"th">;

export const Th = React.forwardRef(
  ({ className, ...props }: ThProps, ref: React.Ref<HTMLTableCellElement>) => {
    return (
      <th
        className={clsx(
          "border-b border-t border-white py-1 pl-4 text-left",
          "first:rounded-tl-md first:border-l last:rounded-tr-md last:border-r last:pr-4",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Th.displayName = "Th";

// Td

type TdProps = React.ComponentPropsWithoutRef<"td">;

export const Td = React.forwardRef(
  ({ className, ...props }: TdProps, ref: React.Ref<HTMLTableCellElement>) => {
    return (
      <td
        className={clsx(
          "pl-4 pt-1",
          "first:border-l last:border-r last:pr-4",
          "group-last/tr:border-b group-last/tr:pb-1",
          "group-last/tr:first:rounded-bl-md group-last/tr:last:rounded-br-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Td.displayName = "Td";
