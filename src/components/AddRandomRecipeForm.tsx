"use client";

import { seedRecipesTable } from "@app/actions";
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";

const AddRecipeButton = ({ className, ...props }: { className?: string }) => {
  const status = useFormStatus();
  const { pending } = status;

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className={clsx(
        "user-select-none rounded-md border border-white px-4 py-1 disabled:pointer-events-none disabled:bg-slate-800 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      add recipe
    </button>
  );
};

export const AddRandomRecipeForm = ({ ...props }: { className?: string }) => {
  const [formState, formAction] = useFormState(
    () => seedRecipesTable(1),
    undefined,
  );

  return (
    <form className="w-full" action={formAction} noValidate {...props}>
      <AddRecipeButton className="mt-4" />
      {formState?.status === "error" && (
        <p className="text-red-500">{formState.message}</p>
      )}
    </form>
  );
};
