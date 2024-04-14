import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Login() {
  const router = useRouter();

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
      const response = await mutation.mutateAsync({ email, password });

      if (response.success) {
        console.log("Login successful:", response.user);

        setCookie("userDetails", JSON.stringify(response.user));
        setCookie("token", JSON.stringify(response.token));

        void router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
    }
  };
  return (
    <div className="my-14 flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg border  border-solid border-gray-500 bg-white p-10">
        <h1 className="mb-2 text-center text-3xl font-bold">Login</h1>
        <p className="mb-4 text-center text-lg text-gray-600">
          Welcome back to ECOMMERCE
        </p>
        <p className="mb-4 text-center text-sm text-gray-500">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 underline focus:outline-none"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none"
            >
              LOGIN
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
            <Link href="/signup" className="text-black hover:underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
