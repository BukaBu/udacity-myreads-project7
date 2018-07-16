import React from 'react';

class Book extends React.Component {

  render() {
    const {book, updateOption} = this.props;
    let shelfValue = (book.shelf) ? book.shelf : 'move';

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && (
              <div
                className="book-cover"
                style={{
                width: 130,
                height: 190,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
                }} 
              />
             
            )}
            <div className="book-shelf-changer">
              <select
                value={shelfValue}
                onChange={(event) => updateOption(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.author && book
            .authors
            .map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

export default Book;
