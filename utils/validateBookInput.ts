export function validateBookInput(book: any) {
  //validate title
  if (!book.title || typeof book.title !== "string") return false;

  //validate author
  if (!book.author || typeof book.author !== "string") return false;

  //validate year
  const currentYear = new Date().getFullYear();
  if (
    !book.year ||
    !Number.isInteger(book.year) ||
    book.year < 1000 ||
    book.year > currentYear
  )
    return false;

  //validate available
  if (!book.available || typeof book.available !== "boolean") return false;

  return true;
}
