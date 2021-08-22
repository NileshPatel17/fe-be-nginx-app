const express = require('express');

const router = new express.Router();

const { isLoggedIn } = require('./middlewares');
const { runQuery } = require('./query-db');

// get all of the books in the database
router.get('/', async (req, res) => {
  const SelectQuery = ' SELECT * FROM  books_reviews';
  const _result = await runQuery(SelectQuery);
  const result = _result.map(item => {
    const _item = {
      id: item.id,
      bookName: item.book_name,
      bookReview: item.book_review
    };
    return _item;
  });
  res.send(result);
});

// add a book to the database
router.post('/', async (req, res) => {
  const { bookName, bookReview } = req.body;
  const InsertQuery =
    'INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)';
  const params = [bookName, bookReview];
  const result = await runQuery(InsertQuery, params);
  if (result.affectedRows) {
    const newBook = {
      id: result.insertId,
      bookName,
      bookReview
    };
    res.send(newBook);
  } else {
    res.send({});
  }
});

// delete a book from the database
router.delete('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = 'DELETE FROM books_reviews WHERE id = ?';
  const result = await runQuery(DeleteQuery, [bookId]);
  res.send(result);
});

// update a book review
router.put('/:bookId', (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = 'UPDATE books_reviews SET book_review = ? WHERE id = ?';
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err);
  });
});

module.exports = router;
