import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { AuthProvider, useAuth } from './AuthContext'

jest.mock('axios')

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should render children and provide auth methods', () => {
    const TestComponent = () => {
      const auth = useAuth()

      return (
        <div>
          <button
            onClick={() =>
              auth.login('test@example.com', 'password')
            }
          >
            Login
          </button>
          <button onClick={auth.logout}>Logout</button>
          <button
            onClick={() =>
              auth.register(
                'test@example.com',
                'password',
                'password'
              )
            }
          >
            Register
          </button>
          <button onClick={auth.fetchUser}>
            Fetch User
          </button>
          <div data-testid="user">
            {JSON.stringify(auth.user)}
          </div>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Test login
    userEvent.click(screen.getByText('Login'))
    expect(axios.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password',
    })

    // Test logout
    userEvent.click(screen.getByText('Logout'))
    expect(axios.post).toHaveBeenCalledWith('/logout')

    // Test register
    userEvent.click(screen.getByText('Register'))
    expect(axios.post).toHaveBeenCalledWith('/register', {
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
    })

    // Test fetchUser
    userEvent.click(screen.getByText('Fetch User'))
    expect(axios.get).toHaveBeenCalledWith('/user')

    // Test user state
    expect(screen.getByTestId('user').textContent).toBe(
      '{}'
    )
  })
})
