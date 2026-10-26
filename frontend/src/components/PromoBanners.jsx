
function PromoBanners() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">

        {/* First promotion */}
        <div className="relative flex min-h-[300px] items-center overflow-hidden bg-stone-200 px-7 py-10 sm:px-12">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
            alt="Fashion collection"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 max-w-sm text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              Your style, your rules
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              The Style Edit
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/90">
              Discover fresh looks for every occasion.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-block border border-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition hover:bg-white hover:text-black"
            >
              Explore Collection →
            </a>
          </div>
        </div>

        {/* Second promotion */}
        <div className="relative flex min-h-[300px] items-center overflow-hidden bg-stone-800 px-7 py-10 sm:px-12">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
            alt="Fashion shopping collection"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 max-w-sm text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              Special offers
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Sale Season
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/90">
              Find your favorites at prices you'll love.
            </p>

            <a
              href="/sale"
              className="mt-6 inline-block bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-gray-200"
            >
              Shop the Sale →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PromoBanners;
