export function validateBookInput(
  title: any,
  author: any,
  year: any,
  available: any
) {
  //validate title

  if (!title || typeof title !== "string") return false;

  //validate author
  if (!author || typeof author !== "string") return false;

  //validate year
  const currentYear = new Date().getFullYear();
  if (!year || !Number.isInteger(year) || year < 1000 || year > currentYear)
    return false;
  //validate available
  if (available == null || typeof available !== "boolean") return false;

  return true;
}
