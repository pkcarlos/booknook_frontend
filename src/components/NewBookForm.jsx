import { useState } from 'react'
import bookService from '../services/books'

const NewBookForm = ({ books, setBooks, setSuccessMessage, setErrorMessage }) => {
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
      favorite: true
    }

    bookService
      .createBook(newBook)
      .then(returnedBooks => {
        setBooks(books.concat(returnedBooks))
        setSuccessMessage(`${newBook.title} has been added to the list.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })

    setNewTitle('')
    setNewAuthor('')
    setNewGenre('')
  }

  return (
    <div className="formDiv">
      <h2>Add a book</h2>

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
    </div>

  )
}

export default NewBookForm