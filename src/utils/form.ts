import { State } from "@app/actions.utils";
import { useEffect, useState } from "react";

export const useFieldErrors = (formState: State) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formState?.status === "error" && formState.errors) {
      console.log("formState?.errors", formState?.errors);
      const newFormErrors = formState.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {},
      );

      setFieldErrors(newFormErrors);
    }
  }, [formState]);

  return fieldErrors;
};
