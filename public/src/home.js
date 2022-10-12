function getTotalBooksCount(books) {
  const result = books.length;
  return result;
}

function getTotalAccountsCount(accounts) {
  const result = accounts.length;
  return result;
}

function getBooksBorrowedCount(books) {
  const booksb = books.filter((book) => book.borrows[0].returned == false);
  const result = booksb.length;
  return result;
}

function getMostCommonGenres(books) {
  let result = [];
  books.forEach((book) => {
    const genre = result.find((genre) => genre.name == book.genre);
    genre ? genre.count++ : result.push({ name: book.genre, count: 1 });
  });
  result = result.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
  return result;
}

function getMostPopularBooks(books) {
  let result = books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);
  return result;
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
    let authora = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) =>
      book.authorId == author.id
        ? (authora.count += book.borrows.length)
        : (count = 0)
    );

    result.push(authora);
  });
  //console.log("result", result);
  result = result.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
