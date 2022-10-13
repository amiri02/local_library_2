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
  let finalResult = books.reduce((result, book) => {
    let currentBcount = book.borrows.reduce((count, bookacc) => {
      bookacc.id == id ? count++ : null;
      return count;
    }, 0);
    return (result += currentBcount);
  }, 0);
  return finalResult;
}

function addauthor(book, authors){
return authors.find((author) => author.id == book.authorId);
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksByacc = books.filter((book) =>
    book.borrows.some((borrow) => borrow.id == account.id && !borrow.returned)
  );
  // const addauthor = (book, authors) =>
  //   authors.find((author) => author.id == book.authorId);

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
