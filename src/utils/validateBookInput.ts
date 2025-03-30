export function validateBookInput(
  title: any,
  author: any,
  year: any,
  available: any
) {
  //validate title

  console.log(title, author, year, available);

  if (!title || typeof title !== "string") {
    console.log("1");
    return false;
  }

  //validate author
  if (!author || typeof author !== "string") {
    console.log("2");
    return false;
  }

  //validate year
  const currentYear = new Date().getFullYear();
  if (!year || !Number.isInteger(year) || year < 1000 || year > currentYear) {
    console.log("3");
    return false;
  }
  //validate available
  if (available == null || typeof available !== "boolean") {
    console.log("4");
    return false;
  }

  return true;
}
