import axios from 'axios'

const baseUrl = '/api/books'
const getAllBooks = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBook = newBook => {
  const request = axios.post(baseUrl, newBook)
  return request.then(response => response.data)
}

const updateBook = (id, newBook) => {
  const request = axios.put(`${baseUrl}/${id}`, newBook)
  return request.then(response => response.data)
}

const removeBook = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAllBooks, createBook, updateBook, removeBook }