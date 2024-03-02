"use client";

import { seedUsersTable } from "@app/actions";
import { useFormState } from "react-dom";

export const AddUserForm = ({ ...props }: { className?: string }) => {
  const [_, formAction] = useFormState(() => seedUsersTable(1), undefined);
  return (
    <form action={formAction} {...props}>
      <button
        type="submit"
        className="px-4 py-1 border border-white rounded-md"
      >
        add user
      </button>
    </form>
  );
};
