import { getCookie } from "cookies-next";

const useGetUserCookie = () => {
  const user = JSON.parse(getCookie("userDetails") || "{}");
  return user;
};

export default useGetUserCookie;
