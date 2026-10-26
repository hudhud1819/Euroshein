
function ProductCard({ product }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.discount && (
          <span className="absolute left-3 top-3 bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            -{product.discount}%
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-gray-800 shadow-sm transition hover:bg-black hover:text-white"
        >
          ♡
        </button>

        <button
          type="button"
          className="absolute bottom-0 left-0 w-full translate-y-full bg-white/95 py-3 text-xs font-semibold uppercase tracking-wider text-gray-900 transition-transform duration-300 group-hover:translate-y-0"
        >
          Quick Add +
        </button>
      </div>

      <div className="pt-4">
        <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
          {product.category}
        </p>

        <h3 className="truncate text-sm font-medium text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-950">
            {product.price.toLocaleString()} ETB
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.oldPrice.toLocaleString()} ETB
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
