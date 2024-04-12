export default function EmailVerification() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      <div className="rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Verify your email</h1>
        <p className="mb-6 text-gray-600">
          Enter the 8-digit code you received on swa****@gmail.com
        </p>
        <div className="flex items-center justify-center space-x-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-2xl font-semibold"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
