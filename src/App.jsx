import { useState, useEffect } from 'react'
import List from './components/List'
import NewBookForm from './components/NewBookForm'
import Notification from './components/Notification'
import bookService from './services/books'

const Header = () => {
  return (
    <h1>BookNook</h1>
  )
}

const SubHeader = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontsize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Copyright 2025</em>
    </div>
  )
}

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
      <Header />
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <form>
        <div>
          filter titles with <input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>

      <SubHeader text='Add a Book' />
      <NewBookForm books={books} setBooks={setBooks} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />

      <SubHeader text='Book List' />
      <List books={books} searchText={newSearch} setBooks={setBooks} setSuccessMessage={setSuccessMessage} />

      <Footer />
    </div>
  )
}

export default App