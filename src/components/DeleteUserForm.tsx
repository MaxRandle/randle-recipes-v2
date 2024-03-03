"use client";

import { deleteFirstUsers } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";

const DeleteUserButton = ({ ...props }: { className?: string }) => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="user-select-none rounded-md border border-white px-4 py-1 disabled:pointer-events-none disabled:bg-slate-800 disabled:opacity-50"
    >
      delete user
    </button>
  );
};

export const DeleteUserForm = ({ ...props }: { className?: string }) => {
  const [_, formAction] = useFormState(() => deleteFirstUsers(1), undefined);
  return (
    <form action={formAction} {...props}>
      <DeleteUserButton />
    </form>
  );
};
