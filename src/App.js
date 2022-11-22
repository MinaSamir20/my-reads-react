import "./App.css";
import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Search from "./components/Search"
import NotFound from './components/NotFound';
import Shelves from './components/Shelves'

class App extends Component {
  state = { books: [] };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  changeShelf = (chBook, shelf) => {
    BooksAPI.update(chBook, shelf).then(response => {
      chBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== chBook.id)
          .concat(chBook)
      }));
    });
  };

  render (){
    
    const { books } = this.state;

    return (
      <div className="app">
        <Routes>
          {/* search bar */}
          <Route exact path="/search" element={<Search books={books} changeShelf={this.changeShelf} />}/>
          {/* book page */}
          <Route exact path="/" element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <Shelves books={books} changeShelf={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">Add a Book</Link>
                </div>
              </div>
            }
          />
          {/* not found page */}
          <Route component={NotFound} />
        </Routes>
      </div>
    );
  }
}

export default App;
