import Link from "next/link";

export default function Signup() {
  return (
    <div className="m-10 flex items-center justify-center">
      <div className="rounded-lg bg-white p-20 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create your account
        </h1>
        <form>
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
              className="focus:shadow-outline w-96 appearance-none rounded  border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Enter"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="focus:shadow-outline  w-96  rounded bg-black px-4 py-2 font-bold text-white focus:outline-none"
              type="button"
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
