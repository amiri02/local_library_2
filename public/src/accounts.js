const { getBooksBorrowedCount } = require("./home");

function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id == id);
  return result ? result : null;
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((accA, accB) =>
    accA.name.last.toLowerCase() < accB.name.last.toLowerCase() ? -1 : 1
  );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let result = 0;
  books.forEach((book) =>
    book.borrows.forEach((bookacc) => (bookacc.id == id ? result++ : 0))
  );
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksByacc = books.filter((book) =>
    book.borrows.some((borrow) => borrow.id == account.id && !borrow.returned)
  );
  const addauthor = (book, authors) =>
    authors.find((author) => author.id == book.authorId);

  let result = booksByacc.map((book) => {
    return { ...book, author: addauthor(book, authors) };
  });

  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
