import { DrizzleError } from "drizzle-orm";
import { z } from "zod";

type SuccessState<T = undefined> = T extends undefined
  ? {
      status: "success";
      message: string;
    }
  : {
      status: "success";
      message: string;
      result: NonNullable<T>;
    };

type ErrorState = {
  status: "error";
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};

export type State<T = undefined> = SuccessState<T> | ErrorState | null;

export const handleZodValidationError = (error: z.ZodError): ErrorState => {
  return {
    status: "error",
    message: "Schema validation failed",
    errors: error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    })),
  };
};

export const handleDrizzlePostgresError = (error: DrizzleError): ErrorState => {
  return {
    status: "error",
    message: error.message,
  };
};
