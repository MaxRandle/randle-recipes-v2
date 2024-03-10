"use client";

import { seedUsersTable } from "@app/actions";
import { useFormState, useFormStatus } from "react-dom";

const Button = ({ ...props }: { className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="user-select-none rounded-md border border-white px-4 py-1 disabled:pointer-events-none disabled:bg-slate-800 disabled:opacity-50"
      {...props}
    >
      add random user
    </button>
  );
};

export const AddRandomUserForm = ({ ...props }: { className?: string }) => {
  const [_, formAction] = useFormState(() => seedUsersTable(1), undefined);

  return (
    <form action={formAction} {...props}>
      <Button />
    </form>
  );
};
