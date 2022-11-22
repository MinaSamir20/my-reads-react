import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    state = {
        query:'',
        newBooks:[],
        srchErr:false
    };

    getBooks = event => {

        const query = event.target.value;
        this.setState({query});

        if (query) {
            BooksAPI.search(query.trim(), 25).then(books => {books.length>0
                ? this.setState({newBooks:books, srchErr:false})
                : this.setState({newBooks:[], srchErr: true});
            });
        }else {
            this.setState({newBooks:[], srchErr:false});
        }
    };

    render() {

        const{query, newBooks, srchErr} = this.state;
        const{books, changeShelf} = this.props;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"> close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder ="Search by title, author, or ISBN"
                        value={query}
                        onChange={this.getBooks}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {newBooks.length > 0 && (
                        <div>
                            <h3>Search returned {newBooks.length} Books</h3>
                            <ol className="books-grid">
                                {newBooks.map(book =>(
                                    <Book
                                        book={book}
                                        books={books}
                                        key={book.id}
                                        changeShelf={changeShelf}
                                    />
                                ))}
                            </ol>
                        </div>
                    )}
                    {srchErr && (<h3>Search did not return any Books. Please Try Again..</h3>)}
                </div>
            </div>
        );
    }
}

export default Search;