import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">Login</h1>
        <p className="mb-4 text-center text-sm text-gray-600">
          Welcome back to ECOMMERCE
        </p>
        <p className="mb-4 text-center text-xs text-gray-500">
          The next gen business marketplace.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your password"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 focus:outline-none">
                Show
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 flex items-center">
          <div className="h-px w-1/2 bg-gray-300"></div>
          <div className="mx-3 text-gray-500">or</div>
          <div className="h-px w-1/2 bg-gray-300"></div>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an Account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
