import { useState } from 'react'
import bookService from '../services/books'

const NewBookForm = ({ books, setBooks, setSuccessMessage }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newGenre, setNewGenre] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleGenreChange = (event) => {
    setNewGenre(event.target.value)
  }
  const addBook = (event) => {
    event.preventDefault()
    const newBook = {
      title: newTitle,
      author: newAuthor,
      genre: newGenre,
    }

    //prevent adding existing books
    if (books.map(book => book.title.toLowerCase()).includes(newTitle.toLowerCase())) {
      alert(`${newTitle} has already been added.`)
    } else {
      bookService
        .createBook(newBook)
        .then(returnedBooks => {
          setBooks(books.concat(returnedBooks))
          setSuccessMessage(`${newBook.title} has been added to the list.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }

    setNewTitle('')
    setNewAuthor('')
    setNewGenre('')
  }

  return (
    <form onSubmit={addBook}>
    <div>
      title: <input value={newTitle} onChange={handleTitleChange} />
    </div>
    <div>
      author: <input value={newAuthor} onChange={handleAuthorChange} />
    </div>
    <div>
      genre: <input value={newGenre} onChange={handleGenreChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default NewBookForm