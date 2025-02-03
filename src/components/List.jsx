import Book from './Book'
import bookService from '../services/books'

const List = ({ books, setBooks, searchText, setSuccessMessage }) => {
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()))
  books = searchText.length !== 0 ? filteredBooks : books // filter search

  const toggleFavorite = (id) => {
    const book = books.find(b => b.id === id)
    const modifiedBook = { ...book, favorite: !book.favorite }

    bookService
      .updateBook(id, modifiedBook)
      .then(returnedBook => {
        const modifiedBooks = books.map(book => book.id === id ? returnedBook : book)
        setBooks(modifiedBooks)
      })
  }

  const handleDelete = (id) => {
    const book = books.find(b => b.id === id)
    const userConfirmed = window.confirm(`Do you really want to delete ${book.title}?`)

    if (userConfirmed) {
      setSuccessMessage(`${book.title} was deleted successfully.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      bookService
        .removeBook(id)
        .then(() => {
          const modifiedBooks = books.filter(book => book.id !== id)
          setBooks(modifiedBooks)
        })
    }
  }

  return (
    <ul>
      {books.map(book => <Book key={book.id} book={book} toggleFavorite={toggleFavorite} deleteBook={handleDelete} />)}
    </ul>
  )
}

export default List