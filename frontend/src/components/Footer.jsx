
function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/15 px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Join the Euroshein Community
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Get updates about new arrivals and special offers.
            </p>
          </div>

          <form
            className="flex w-full max-w-md"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 border border-white/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500 focus:border-white"
              required
            />
            <button
              type="submit"
              className="bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 sm:px-10 md:grid-cols-4 lg:px-12">
        <div className="col-span-2 md:col-span-1">
          <a
            href="/"
            className="text-2xl font-black tracking-widest"
          >
            EUROSHEIN
          </a>

          <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
            Discover your style. Find your confidence. Shop fashion for
            every moment.
          </p>

          <p className="mt-5 text-xs text-gray-500">
            Fashion for your everyday life.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">
            Shop
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/shop" className="hover:text-white">All Products</a></li>
            <li><a href="/women" className="hover:text-white">Women</a></li>
            <li><a href="/men" className="hover:text-white">Men</a></li>
            <li><a href="/accessories" className="hover:text-white">Accessories</a></li>
            <li><a href="/sale" className="hover:text-white">Sale</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">
            Customer Care
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Information</a></li>
            <li><a href="/returns" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/faq" className="hover:text-white">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">
            About
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white">About Euroshein</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/15 px-6 py-6 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Euroshein. All rights reserved.</p>
          <p>Made with care for your everyday style.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
