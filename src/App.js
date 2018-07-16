import React from 'react';
import {Switch, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './Components/ListBooks';
import SearchBooks from './Components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    filteredBooks: []
  }

  // gets all the books using BooksAPI getAll method
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // search books using BooksAPI search method
  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((result) => {
          this.updateSearchedResult(result)
          if (result.error !== 'empty query') {
            this.setState({filteredBooks: result})
          } else {
            this.setState({filteredBooks: []})
          }
        })
    } else {
      this.setState({filteredBooks: []})
    }
  }

  //change the shelf of the book using BooksAPI update method
  updateShelf = (book, shelf) => {
  
    BooksAPI.update(book, shelf).then(() => (
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
        this.updateSearchedResult(this.state.filteredBooks)
      })))
  }

  updateSearchedResult = (values) => {
    for (let value of values) {
      for (let book of this.state.books) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
    }
    this.setState({filteredBooks: values})
  }

  render() {
    return (
      <div className="app">

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                books={this.state.books}
                updateOption={(book, shelf) => this.updateShelf(book, shelf)}
              />
            )}
          />

          <Route
            path="/search"
            render={() => (
              <div >
                <SearchBooks
                  filteredBooks={this.state.filteredBooks}
                  searchBooks={(query) => this.searchBooks(query)}
                  updateOption={(book, shelf) => this.updateShelf(book, shelf)}
                />
              </div>
            )}
          />

        </Switch>
      </div>
    )
  }
}

export default BooksApp;
