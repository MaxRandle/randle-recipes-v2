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

export const isZodValidationError = (error: any) => error instanceof z.ZodError;

export const handleZodValidationError = (error: z.ZodError): ErrorState => {
  return {
    status: "error",
    message: "Validation failed",
    errors: error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    })),
  };
};

export type DBError = {
  length: number;
  name: "error";
  severity: "ERROR";
  code: string;
  detail: string;
  schema: "public";
  table: string;
  constraint: string;
  file: string;
  line: string;
  routine: string;
};

export const isDuplicateKeyError = (error: any) => error.code === "23505";

export const handleDuplicateKeyError = (error: DBError): ErrorState => {
  // eg: "Key (email)=(greg.grog@gmail.com) already exists."
  const matches =
    error.detail.match(/Key \((.+)\)=\((.+)\) already exists\./) ?? [];
  const [_, keyName, keyValue] = matches;

  return {
    status: "error",
    message: `Duplicate error: ${keyName} ${keyValue} already exists.`,
  };
};

export const isTableNotExistsError = (error: any) => error.code === "42P01";
