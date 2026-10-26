
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Elegant Everyday Blazer',
    category: 'Women',
    price: 1850,
    oldPrice: 2300,
    discount: 20,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Classic Casual Shirt',
    category: 'Men',
    price: 950,
    oldPrice: 1200,
    discount: 21,
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Minimal Shoulder Bag',
    category: 'Bags',
    price: 1450,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Modern Everyday Sneakers',
    category: 'Shoes',
    price: 2200,
    oldPrice: 2600,
    discount: 15,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Essential Knit Sweater',
    category: 'Women',
    price: 1350,
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Statement Sunglasses',
    category: 'Accessories',
    price: 650,
    oldPrice: 800,
    discount: 19,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Elegant Gold Jewelry',
    category: 'Jewelry',
    price: 750,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    name: 'Active Lifestyle Set',
    category: 'Sportswear',
    price: 1750,
    oldPrice: 2100,
    discount: 17,
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
  },
];

function NewArrivals() {
  return (
    <section className="bg-stone-50 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Fresh Finds
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Your next favorite pieces are waiting.
            </p>
          </div>

          <a
            href="/shop"
            className="shrink-0 border-b border-black pb-1 text-sm font-semibold text-gray-900 hover:text-gray-500"
          >
            View All →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
