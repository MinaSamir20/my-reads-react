import React from 'react';
import PropTypes from 'prop-types';
import ChangeShelf from './ChangeShelf';
import cover from '../img/no-cover-image.png';

const Book = props => {

  const {book, books, changeShelf} = props;

  const imgCover = book.imageLinks && book.imageLinks.thumbnail
    ? book.imageLinks.thumbnail
    : cover;

    const title = book.title ? book.title : 'No Title Avilable';
    
    return (
      <li>
        <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128, height: 193,
                  backgroundImage:  `url(${imgCover})`
                }}
              />
              <ChangeShelf book={book} books={books} changeShelf={changeShelf}/>
            </div>
            <div className="book-title">{title}</div>
            {
              book.authors && book.authors.map((author, index) => (
                <div className="book-authors" key={index}>
                  {author}
                </div>
              ))
            }
        </div>
      </li>
    );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default Book;