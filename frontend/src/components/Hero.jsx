import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[360px] overflow-hidden bg-black">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85"
        alt="Fashion"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-[1080px] items-center px-8">

        <div className="max-w-[430px] text-white">

          <p className="mb-3 text-[11px] tracking-[0.4em]">
            NEW SEASON
          </p>

          <h1 className="text-4xl font-light leading-[1.1] md:text-5xl">
            Style That
            <br />
            Speaks You
          </h1>

          <p className="mt-4 max-w-[360px] text-sm leading-5 text-gray-200">
            Discover the latest trends in fashion, designed
            for your everyday moments.
          </p>

          <button className="mt-5 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-gray-200">
            Shop Now
            <ArrowRight size={15} />
          </button>

        </div>

      </div>

      {/* Previous */}
      <button className="absolute left-8 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white hover:text-black">
        <ChevronLeft size={18} />
      </button>

      {/* Next */}
      <button className="absolute right-8 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white hover:text-black">
        <ChevronRight size={18} />
      </button>

      {/* Slider dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">

        <span className="h-2 w-2 rounded-full bg-white" />

        <span className="h-2 w-2 rounded-full bg-white/50" />

        <span className="h-2 w-2 rounded-full bg-white/50" />

        <span className="h-2 w-2 rounded-full bg-white/50" />

      </div>

    </section>
  );
};

export default Hero;