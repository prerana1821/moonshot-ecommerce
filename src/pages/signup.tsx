import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const mutation = api.auth.signup.useMutation();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const mutationResult = await mutation.mutateAsync({
        name,
        email,
        password,
      });

      if (mutationResult.success) {
        console.log(mutationResult.user);
        setCookie("userDetails", JSON.stringify(mutationResult.user));
        setCookie("token", JSON.stringify(mutationResult.token));

        void router.push("/email-verification");
      }
    } catch (error) {
      console.error("Unexpected error during signup:", error);
    }
  };

  return (
    <div className="m-10 flex items-center justify-center">
      <div className="rounded-lg bg-white p-20 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create your account
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:shadow-outline w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Enter"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Enter"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Enter"
            />
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="focus:shadow-outline  w-96  rounded bg-black px-4 py-2 font-bold text-white focus:outline-none"
              type="submit"
            >
              CREATE ACCOUNT
            </button>
            <div>
              <Link
                href="/login"
                className="inline-block align-baseline text-sm font-bold text-black "
              >
                Have an Account? LOGIN
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
