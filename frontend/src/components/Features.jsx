
const features = [
  {
    icon: '🚚',
    title: 'Reliable Delivery',
    description: 'Convenient delivery for your orders.',
  },
  {
    icon: '↩',
    title: 'Easy Returns',
    description: 'A simple process for eligible returns.',
  },
  {
    icon: '🔒',
    title: 'Secure Shopping',
    description: 'Your shopping experience matters to us.',
  },
  {
    icon: '💬',
    title: 'Customer Support',
    description: 'We are here to help when you need us.',
  },
];

function Features() {
  return (
    <section className="border-y border-gray-200 bg-white px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-stone-100 text-2xl">
              {feature.icon}
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
