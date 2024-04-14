import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
} from "react";
import useGetUserCookie from "~/hooks/useGetUserCookie";
import { api } from "~/utils/api";

export default function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array.from({ length: 8 }, () => ""));
  const otpInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const user = useGetUserCookie();

  useEffect(() => {
    if (user.isVerified) {
      void router.push("/");
    }
  }, []);

  const mutation = api.auth.verifyOtp.useMutation();

  const handleVerify = async () => {
    try {
      const pin = otp.join("");
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

  const handleChange = (
    index: number,
    value: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (/\d/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value.length === 1 && index < otpInputsRef.current.length - 1) {
        const nextInput = otpInputsRef.current[index + 1];
        nextInput?.focus();
      }
    } else if (event.target.value === "") {
      if (index > 0) {
        const prevInput = otpInputsRef.current[index - 1];
        prevInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && index > 0) {
      if (!otp[index]) {
        event.preventDefault();
        otpInputsRef?.current[index - 1]?.focus();
        setOtp((prevOtp) => {
          const updatedOtp = [...prevOtp];
          updatedOtp[index - 1] = "";
          return updatedOtp;
        });
      }
    }
  };

  return (
    <div className="m-10 flex items-center justify-center">
      <div className="rounded-lg border border-solid border-gray-500 bg-white p-12">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Verify your email
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Enter the 8-digit code you received on{" "}
          <span className="block font-semibold">
            {user?.email?.replace(/(?<=.{2}).(?=[^@]*?@)/g, "*")}
          </span>
          .
        </p>
        <div className="flex items-center justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-2xl font-semibold"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value, e)}
              ref={(el) => {
                if (el) otpInputsRef.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="mt-6 w-full rounded bg-black px-6 py-2 text-xl font-medium uppercase text-white"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
