import { useState, useEffect } from 'react'
import List from './components/List'
import NewBookForm from './components/NewBookForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import bookService from './services/books'

const App = () => {
  const [books, setBooks] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    bookService
      .getAllBooks()
      .then(returnedBooks => {
        setBooks(returnedBooks)
      })
  }, [])
  
  return (
    <div>
      <h1>BookNook</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <form>
        <div>
          filter titles with <input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>

      <NewBookForm books={books} setBooks={setBooks} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />

      <List books={books} searchText={newSearch} setBooks={setBooks} setSuccessMessage={setSuccessMessage} />

      <Footer />
    </div>
  )
}

export default App