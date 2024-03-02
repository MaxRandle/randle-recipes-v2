"use client";

import { deleteFirstUser } from "@/app/actions";
import { useFormState } from "react-dom";

export const DeleteUserForm = ({ ...props }: { className?: string }) => {
  const [_, formAction] = useFormState(() => deleteFirstUser(), undefined);
  return (
    <form action={formAction} {...props}>
      <button
        type="submit"
        className="px-4 py-1 border border-white rounded-md"
      >
        delete user
      </button>
    </form>
  );
};
