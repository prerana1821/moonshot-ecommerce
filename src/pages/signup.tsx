import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { name, email, password, error, loading } = formData;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value, error: "" });
  };

  const mutation = api.auth.signup.useMutation();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setFormData({ ...formData, loading: true });

      const mutationResult = await mutation.mutateAsync({
        name,
        email,
        password,
      });

      if (mutationResult.success) {
        setCookie("userDetails", JSON.stringify(mutationResult.user));
        setCookie("token", JSON.stringify(mutationResult.token));
        void router.push("/email-verification");
      }
    } catch (error) {
      setFormData({
        ...formData,
        error: "Failed to create account. Please try again.",
        loading: false,
      });
      console.error("Unexpected error during signup:", error);
    }
  };

  return (
    <div className="m-10 flex items-center justify-center">
      <div className="rounded-lg border border-solid border-gray-500 bg-white p-12">
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
              name="name"
              value={name}
              onChange={handleChange}
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
              name="email"
              value={email}
              onChange={handleChange}
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
              name="password"
              value={password}
              onChange={handleChange}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Enter"
            />
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="focus:shadow-outline  w-96  rounded bg-black px-4 py-2  text-white focus:outline-none"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
            <div className="mt-4 text-center">
              <p>
                Have an Account?{" "}
                <Link href="/login" className="text-black hover:underline">
                  LOGIN
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
