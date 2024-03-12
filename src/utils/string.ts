export const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD") // canonical decomposition
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase() // lowercase
    .trim() // remove leading and trailing whitespace
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^\w-]+/g, "") // remove all non-word chars [^a-zA-Z0-9_]
    .replace(/--+/g, "-"); // replace multiple - with single -
