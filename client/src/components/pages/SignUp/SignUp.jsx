import {useAuth} from "../../../AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SignUp() {
  const {register} = useAuth()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const [email, password, confirmPassword, name] =
      [e.target.email.value, e.target.password.value, e.target['password-confirm'].value, e.target.name.value]

    console.log(email,password,confirmPassword, name)
    const [result, error] = await register(email, password, confirmPassword, name)
    if (result) {
      navigate('/dashboard')
    } else {
      setError(error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleRegister}
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password-confirm"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  id="password-confirm"
                  name="password-confirm"
                  placeholder="Confirm your password"
                  required
                  type="password"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-s text-center">
                {error}
              </div>
            )}
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
