import React from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

class SearchBooks extends React.Component {

  render() {
    const {filteredBooks, searchBooks, updateOption} = this.props;

    return (
      <div>

        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              className='search-books-results'
              type='text'
              placeholder='Search books..'
              onChange={(e) => searchBooks(e.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {
              
              filteredBooks.map(book => (
              <Book 
              book={book} key={book.id} updateOption={updateOption} 
            />))
            }
          </ol>
        </div>
      </div>
      
    )
  }
}

export default SearchBooks;
