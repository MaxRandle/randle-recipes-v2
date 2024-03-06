"use client";

import { createNewUser } from "@app/actions";
import { State } from "@app/actions.utils";
import clsx from "clsx";
import { useId } from "react";
import { useFormState, useFormStatus } from "react-dom";

const AddUserButton = ({ className, ...props }: { className?: string }) => {
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
      add user
    </button>
  );
};

export const AddUserForm = ({ ...props }: { className?: string }) => {
  const [_, formAction] = useFormState<State, FormData>(createNewUser, null);

  const nameFieldId = useId();
  const emailFieldId = useId();

  return (
    <form className="w-full" action={formAction} {...props}>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block" htmlFor={nameFieldId}>
            Name
          </label>
          <input
            className="block w-full rounded-md border border-white bg-transparent px-2 py-1"
            id={nameFieldId}
            name="name"
            type="text"
          />
        </div>

        <div className="w-1/2">
          <label className="block" htmlFor={emailFieldId}>
            Email
          </label>
          <input
            className="block w-full rounded-md border border-white bg-transparent px-4 py-1"
            id={emailFieldId}
            name="email"
            type="email"
          />
        </div>
      </div>

      <AddUserButton className="mt-4" />
    </form>
  );
};
