import Link from "next/link";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutation = api.auth.login.useMutation();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = mutation.mutate({ email, password });

      console.log({ response });

      // if (response.token) {
      //   console.log(response.token);
      //   console.log("Hello WROLD");

      //   // router.push("/dashboard");
      // } else {
      //   console.error("Login failed:", response.error);
      // }
    } catch (error: unknown) {
      console.error("Login failed:", error);
    }
  };

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
        <form className="space-y-4" onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 focus:outline-none"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
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
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
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
