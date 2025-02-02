const Book = ({ book, toggleFavorite, deleteBook }) => {
  const label = book.favorite ? 'unfavorite' : 'favorite'
  
  return (
    <li className="book">
      {book.title} by {book.author}
      <button onClick={() => deleteBook(book.id)}>Delete</button>
      <button onClick={() => toggleFavorite(book.id)}>{label}</button>
    </li>
  )
}

export default Book