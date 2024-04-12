const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold text-white">Company</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#">Press</a>
              </li>
              <li className="mb-2">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Support</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="#">Shipping & Returns</a>
              </li>
              <li className="mb-2">
                <a href="#">Store Locator</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Connect</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">Facebook</a>
              </li>
              <li className="mb-2">
                <a href="#">Twitter</a>
              </li>
              <li className="mb-2">
                <a href="#">Instagram</a>
              </li>
              <li className="mb-2">
                <a href="#">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
