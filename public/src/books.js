
function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id == id);
  return result;
}

function findBookById(books, id) {
  const result = books.find((book) => book.id == id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let checked = books.filter((book) =>
    book.borrows.some((account) => account.returned == false)
  );
  let returned = books.filter((book) =>
    book.borrows.every((account) => account.returned == true)
  );
  result = [checked, returned];
  return result;
}

function getBorrowersForBook(book, accounts) {
  const bFbooks = accounts.filter((account) =>
    book.borrows.some((borrow) => borrow.id == account.id)
  );
  // update returned value for most recent borrow object
  let result = bFbooks.map((account) => {
    let returned = true;
    const bookA = book.borrows[0].id == account.id;
    bookA ? (returned = book.borrows[0].returned) : 0;
    return { ...account, returned };
  });
  result.slice(0, 10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
