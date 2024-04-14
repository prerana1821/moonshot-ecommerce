import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array.from({ length: 8 }, () => ""));

  const mutation = api.auth.verifyOtp.useMutation();

  const handleVerify = async () => {
    try {
      const pin = otp.join("");

      const user = JSON.parse(getCookie("userDetails") || "{}");

      console.log(user);

      const token = JSON.parse(getCookie("token") || "");

      const mutationResult = await mutation.mutateAsync({
        pin,
        email: user.email,
        encryptedToken: token,
      });

      if (mutationResult.success) {
        console.log("Verification successful.");

        void router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error during verification:", error);
    }
  };
  const handleChange = (index: number, value: string) => {
    if (/\d/.test(value) && value.length <= 1) {
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
