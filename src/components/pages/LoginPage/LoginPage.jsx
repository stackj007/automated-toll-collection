export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Login to your account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full"
              id="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" />
              <label
                className="text-sm ml-2"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <a
              className="text-sm text-orange-500 hover:underline"
              href="#"
            >
              Forgot your password?
            </a>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <a
            className="text-orange-500 hover:underline"
            href="#"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
