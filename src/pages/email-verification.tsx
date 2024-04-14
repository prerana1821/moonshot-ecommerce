import { useState } from "react";
import { api } from "~/utils/api";

export default function EmailVerification() {
  const [otp, setOtp] = useState(Array.from({ length: 8 }, () => ""));

  const mutation = api.auth.verifyOtp.useMutation();

  const handleVerify = async () => {
    try {
      const pin = otp.join("");

      const response = mutation.mutate({
        pin,
        email: "swa****@gmail.com", // Provide the email here
        encryptedToken: "your_encrypted_token_here", // Provide the encrypted token here
      });

      console.log({ response });
      // If OTP verification is successful, redirect to the lo6gin page
      // if (response) {
      //   router.push("/login");
      // }
    } catch (error: unknown) {
      console.error("Verification failed:", error);
      // Handle verification failure
    }
  };

  const handleChange = (index: number, value: string) => {
    // Ensure the input is a digit
    if (/\d/.test(value) && value.length <= 1) {
      // Update the OTP array with the new value
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      <div className="rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Verify your email</h1>
        <p className="mb-6 text-gray-600">
          Enter the 8-digit code you received on swa****@gmail.com
        </p>
        <div className="flex items-center justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-2xl font-semibold"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="mt-6 w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
