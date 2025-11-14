import { render, screen, fireEvent, logRoles } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import WrapperLogin from './Login'
import userEvent from '@testing-library/user-event'
import { Login } from './Login'
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_TEST_CLIENT_ID = "test-client-id";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });

  jest.clearAllMocks();
});

test('renders login', () => {

  const view = render(
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>

      <MemoryRouter>
      <WrapperLogin />
      </MemoryRouter>
    </GoogleOAuthProvider>
  )
  // logRoles(view.container)
  const heading = screen.getByRole('heading', {
    level: 5
  })
  expect(heading).toBeInTheDocument()

  const usernameInput = screen.getByRole('textbox', {
    name: "Username"
  })
  expect(usernameInput).toBeInTheDocument()
  expect(usernameInput).toHaveAttribute('type', 'text')

  const passwordInput = screen.getByPlaceholderText(/password/i)
  expect(passwordInput).toBeInTheDocument()
  expect(passwordInput).toHaveAttribute('type', 'password')


  const passwordInput2 = screen.getByLabelText(/Password/i)
  expect(passwordInput2).toBeInTheDocument()

  const usernameInput2 = screen.getByLabelText(/Username/)
  expect(usernameInput2).toBeInTheDocument()

  const usernameInputplaceholer = screen.getByPlaceholderText(/nameuser/)
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

test('allows user to type in username and password and submit', async () => {
  render(
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>

      <MemoryRouter>
      <WrapperLogin />
      </MemoryRouter>
    </GoogleOAuthProvider>
  )

  const usernameInput = screen.getByRole('textbox', {
    name: "Username"
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

test('login with empty fields shows validation errors', async () => {
  render(
    
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>

      <MemoryRouter>
      <WrapperLogin />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  const submitButton = screen.getByRole('button', { name: /login/i });
  await userEvent.click(submitButton);


  const usernameError = await screen.findByText(/Username is required/i);
  const passwordError = await screen.findByText(/Password is required/i);

  expect(usernameError).toBeInTheDocument();
  expect(passwordError).toBeInTheDocument();
});

test('allows user to login successfully', async () => {
  const users = [{ username: 'testuser', password: 'mypassword', email: 'test@example.com' }];
  localStorage.setItem('users', JSON.stringify(users));
  // const navigateMock = vi.fn();
  const navigateMock = jest.fn();


  render(
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>

      <MemoryRouter>
        <Login navigate={navigateMock} />
      </MemoryRouter>test("allows user to login successfully", async () => {
  
  localStorage.getItem.mockReturnValueOnce(
    JSON.stringify([{ username: "testuser", password: "mypassword" }])
  )

  const navigateMock = jest.fn();

  render(
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>
      <MemoryRouter>
        <Login navigate={navigateMock} />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  await userEvent.type(screen.getByLabelText(/username/i), "testuser");
  await userEvent.type(screen.getByLabelText(/password/i), "mypassword");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));


  expect(localStorage.setItem).toHaveBeenCalledWith("loggedInUser", "testuser");
  expect(localStorage.setItem).toHaveBeenCalledWith("token", "true");

  expect(navigateMock).toHaveBeenCalledWith("/");
});

    </GoogleOAuthProvider>
  );

  await userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
  await userEvent.type(screen.getByLabelText(/Password/i), 'mypassword');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(localStorage.getItem('loggedInUser')).toBeTruthy();
  expect(localStorage.getItem('token')).toBe('true');
  expect(navigateMock).toHaveBeenCalledWith('/');
});

////////////////////

// test("allows user to login successfully mocking localStorage", async () => {
  
//   localStorage.getItem.mockReturnValueOnce(
//     JSON.stringify([{ username: "testuser", password: "mypassword" }])
//   );

//   const navigateMock = jest.fn();

//   render(
//     <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>
//       <MemoryRouter>
//         <Login navigate={navigateMock} />
//       </MemoryRouter>
//     </GoogleOAuthProvider>
//   );

//   await userEvent.type(screen.getByLabelText(/username/i), "testuser");
//   await userEvent.type(screen.getByLabelText(/password/i), "mypassword");
//   await userEvent.click(screen.getByRole("button", { name: /login/i }));

  
//   // expect(localStorage.setItem).toHaveBeenCalledWith("loggedInUser", "testuser");
//   expect(localStorage.setItem).toHaveBeenCalledWith(
//   "loggedInUser",
//   JSON.stringify({ username: "testuser", password: "mypassword" })
// );

//   expect(localStorage.setItem).toHaveBeenCalledWith("token", "true");

//   expect(navigateMock).toHaveBeenCalledWith("/");
// });
/////////////////



test("allows user to sign up successfully", async () => {
  const navigateMock = jest.fn();

  localStorage.getItem.mockReturnValueOnce(null);

  render(
    <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>
      <MemoryRouter>
        <Login navigate={navigateMock} />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  fireEvent.click(screen.getByText(/new user\? create an account/i));

  await userEvent.type(screen.getByLabelText(/Username/i), "newuser");
  await userEvent.type(screen.getByLabelText(/Password/i), "newpassword");
  await userEvent.type(screen.getByLabelText(/Email/i), "new@example.com");
  await userEvent.click(screen.getByRole("button", { name: /sign up/i }));

  expect(localStorage.setItem).toHaveBeenCalled();

  expect(navigateMock).toHaveBeenCalledWith("/");
});


// test('allows user to sign up successfully', async () => {
//   // const navigateMock = vi.fn();
//   const navigateMock = jest.fn();


//   render(
//   <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>

//       <MemoryRouter>
//         <Login navigate={navigateMock} />
//       </MemoryRouter>
//     </GoogleOAuthProvider>
//   );
 

//   fireEvent.click(screen.getByText(/New user\? Create an account/i));

//   await userEvent.type(screen.getByLabelText(/Username/i), 'newuser');
//   await userEvent.type(screen.getByLabelText(/Password/i), 'newpassword');
//   await userEvent.type(screen.getByLabelText(/Email/i), 'newuser@example.com');
//   await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

//   const usersInStorage = JSON.parse(localStorage.getItem('users'));
//   expect(usersInStorage.some(u => u.username === 'newuser')).toBe(true);
//   expect(localStorage.getItem('loggedInUser')).toBeTruthy();
//   expect(localStorage.getItem('token')).toBe('true');
//   expect(navigateMock).toHaveBeenCalledWith('/');
// });

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
