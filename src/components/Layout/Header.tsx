import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const user = JSON.parse(getCookie("userDetails") || "{}");

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("userDetails");
    void router.push("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mr-4 flex items-center justify-end p-2">
        <p className="mr-4 cursor-pointer text-sm text-gray-600 hover:text-gray-900 ">
          Help
        </p>
        <p className="mr-4 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
          Orders & Returns
        </p>
        {user.email && (
          <p className="mr-4 text-sm text-gray-600 hover:text-gray-900 ">
            Hi, {user.name}
          </p>
        )}
        {user.email && (
          <button
            className="cursor-pointer rounded-md bg-black p-1 px-2 text-sm text-white shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ECOMMERCE</h1>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <p className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Categories
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Sale
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Clearance
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                New stock
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Trending
              </p>
            </nav>
          </div>

          <div className="relative ml-4">
            <div className="flex items-center">
              <button className=" p-2">
                <svg
                  className="h-5 w-5 "
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button className="p-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-200 text-black">
        <p className="relative inline-block  px-4 py-2 font-bold">
          Get 10% off on business sign up
        </p>
      </div>
    </header>
  );
};

export default Header;
