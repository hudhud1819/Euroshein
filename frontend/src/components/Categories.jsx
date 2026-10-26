const categories = [
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tops",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80",
  },
];

const Categories = () => {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-5">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Shop by Category
        </h2>

        <button className="text-xs text-gray-600 hover:text-black">
          View All →
        </button>

      </div>

      <div className="flex justify-between gap-3 overflow-x-auto pb-2">

        {categories.map((category) => (
          <div
            key={category.name}
            className="min-w-[85px] cursor-pointer text-center"
          >

            <div className="mx-auto h-[82px] w-[82px] overflow-hidden rounded-full bg-gray-100">

              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-300 hover:scale-110"
              />

            </div>

            <p className="mt-2 text-[11px] font-medium">
              {category.name}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;