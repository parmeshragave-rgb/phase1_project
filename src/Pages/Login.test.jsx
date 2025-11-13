import { render, screen ,fireEvent,logRoles} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import WrapperLogin from './Login'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Login } from './Login'
test('renders login', () => {
 
  const view=render(
    <MemoryRouter>
      <WrapperLogin />
    </MemoryRouter>
  )
  // logRoles(view.container)
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
  
  const emailFieldInitially = screen.queryByLabelText(/email/i)
  expect(emailFieldInitially).toBeNull()

  fireEvent.click(newUserText)
  const emailFieldAfterToggle = screen.getByLabelText(/email/i)
  expect(emailFieldAfterToggle).toBeInTheDocument()

})

 test('allows user to type in username and password and submit', async() => {
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
    
    // fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    // fireEvent.change(passwordInput, { target: { value: 'mypassword' } })

    // expect(usernameInput.value).toBe('testuser')
    // expect(passwordInput.value).toBe('mypassword')
    //     fireEvent.click(submitButton)


  await userEvent.type(usernameInput, 'testuser')
  await userEvent.type(passwordInput, 'mypassword')

  expect(usernameInput.value).toBe('testuser')
  expect(passwordInput.value).toBe('mypassword')

  await userEvent.click(submitButton)

  const emailField = screen.queryByLabelText(/email/i)
  expect(emailField).toBeNull()
  // screen.debug()

   
  })

// test('mocks handleSubmit and toggleMode', async () => {
//   const handleSubmitSpy = vi.spyOn(Login.prototype, 'handleSubmit');
// const toggleModeSpy = vi.spyOn(Login.prototype, 'toggleMode');

// render(
//   <MemoryRouter>
//     <Login navigate={() => {}} />
//   </MemoryRouter>
// );

// const submitButton = screen.getByRole('button', { name: /login/i });
// const toggleLink = screen.getByText(/new user\? create an account/i);

// await userEvent.click(submitButton);
// await userEvent.click(toggleLink);

// expect(handleSubmitSpy).toHaveBeenCalled();
// expect(toggleModeSpy).toHaveBeenCalled();

// handleSubmitSpy.mockRestore();
// toggleModeSpy.mockRestore();

// });
