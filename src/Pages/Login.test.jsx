import { render, screen ,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import WrapperLogin from './Login'
import { expect } from 'vitest'

test('renders login', () => {
 
  render(
    <MemoryRouter>
      <WrapperLogin />
    </MemoryRouter>
  )
  const heading=screen.getByRole('heading',{
    level:5
  })
  expect(heading).toBeInTheDocument()
  const usernameInput = screen.getByRole('textbox',{
    name:"Username"
  })
  expect(usernameInput).toBeInTheDocument()
   expect(usernameInput).toHaveAttribute('type', 'text')

 const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')


  const passwordInput2 = screen.getByLabelText(/Password/i)
expect(passwordInput2).toBeInTheDocument()

  const usernameInput2=screen.getByLabelText(/Username/)
  expect(usernameInput2).toBeInTheDocument()

  const usernameInputplaceholer=screen.getByPlaceholderText(/nameuser/)
  expect(usernameInputplaceholer).toBeInTheDocument()

   const newUserText = screen.getByText(/new user\? create an account/i)
    expect(newUserText).toBeInTheDocument()


  const submitButton = screen.getByRole('button')
  expect(submitButton).toBeInTheDocument()
  

})

 test('allows user to type in username and password and submit', () => {
    render(
      <MemoryRouter>
        <WrapperLogin />
      </MemoryRouter>
    )

    const usernameInput = screen.getByRole('textbox',{
    name:"Username"
  })
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const submitButton = screen.getByRole('button')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } })

    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('mypassword')
        fireEvent.click(submitButton)

  })