import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="mr-4 flex justify-end p-2">
        <Link
          href="/"
          className="mr-4 text-sm text-gray-600 hover:text-gray-900 "
        >
          Help
        </Link>
        <Link
          href="/"
          className="mr-4 text-sm text-gray-600 hover:text-gray-900 "
        >
          Orders & Returns
        </Link>
        <Link
          href="/"
          className="mr-4 text-sm text-gray-600 hover:text-gray-900 "
        >
          Hi, John
        </Link>
        {/* <div className='relative'>
          <button className='flex items-center text-sm font-medium text-gray-600 hover:text-gray-900'>
            Hi, John
          </button>
        </div> */}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ECOMMERCE</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Sale
              </Link>
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Clearance
              </Link>
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                New stock
              </Link>
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Trending
              </Link>
            </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-200 text-black">
        <Link href="/" className="relative inline-block  px-4 py-2 font-bold">
          Get 10% off on business sign up
        </Link>
      </div>
    </nav>
  );
};

export default Header;
