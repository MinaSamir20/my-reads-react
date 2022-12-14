import React from 'react';
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const Shelves = props => {
    const {books, changeShelf} = props;
    const shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want To Read' },
        { type: 'read', title: 'Read' }
    ];
    return(
        <div className="list-books-content">
            {shelfTypes.map((shelf, index) => {
                const booksShelf = books.filter(book => book.shelf === shelf.type);
                return (
                <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                        <Shelf books={booksShelf} changeShelf={changeShelf} />
                    </div>
                </div>
                );
            })}
        </div>
    );
};

Shelves.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
};

export default Shelves;