import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Book from './Book'

test('renders book content', () => {
  const book = {
    title: 'Foster',
    author: 'Claire Keegan'
  }

  render(<Book book={book} />)

  const element = screen.getByText('Foster by Claire Keegan')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const book = {
    title: "Later",
    author: "Stephen King",
    genre: "Horror",
    favorite: false
  }

  const mockHandler = vi.fn()

  render(
    <Book book={book} toggleFavorite={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('favorite')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})