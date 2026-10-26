
function Overview({ customerCount = 0, adminName = "Admin", setActivePage }) {
  const stats = [
    {
      label: "Total Customers",
      value: customerCount,
      icon: "♙",
      change: "Registered customers",
    },
    {
      label: "Total Products",
      value: 0,
      icon: "▣",
      change: "Products in your store",
    },
    {
      label: "Total Orders",
      value: 0,
      icon: "▤",
      change: "Orders received",
    },
    {
      label: "Total Revenue",
      value: "ETB 0",
      icon: "₿",
      change: "Total store revenue",
    },
  ];

  return (
    <div className="space-y-6 text-white">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-amber-400">YOUR STORE AT A GLANCE</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Welcome back, {adminName.split(" ")[0]}.
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Here is an overview of your Euroshein store.
          </p>
        </div>
        <button
          onClick={() => setActivePage("Products")}
          className="w-fit rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          + Add new product
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.08] bg-[#171717] p-5 transition hover:border-amber-400/30"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-lg text-amber-400">
                {stat.icon}
              </span>
            </div>
            <p className="mt-5 text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-gray-500">{stat.change}</p>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${[70, 45, 60, 35][index]}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-xl border border-white/[0.08] bg-[#171717] p-5 sm:p-6 xl:col-span-2">
          <h3 className="font-semibold">Sales overview</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your store's sales performance
          </p>
          <div className="mt-8 flex h-48 items-end justify-between gap-2 border-b border-l border-white/10 px-2 sm:gap-4">
            {[25, 42, 32, 65, 48, 78, 55].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <div
                  className="w-full rounded-t-md bg-amber-400/70 transition hover:bg-amber-400"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-600">
            Preview chart — connect sales data to display real figures.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#171717] p-5 sm:p-6">
          <h3 className="font-semibold">Quick actions</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your store</p>
          <div className="mt-5 space-y-3">
            {[
              ["＋", "Add a product", "Products"],
              ["◇", "Manage categories", "Categories"],
              ["%", "Create a coupon", "Discounts & Coupons"],
              ["▤", "View all orders", "Orders"],
              ["✉", "Read feedback", "Feedback"],
            ].map(([icon, label, page]) => (
              <button
                key={label}
                onClick={() => setActivePage(page)}
                className="flex w-full items-center gap-3 rounded-lg border border-white/[0.07] p-3 text-left text-sm transition hover:border-amber-400/30 hover:bg-white/[0.03]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  {icon}
                </span>
                <span className="flex-1">{label}</span>
                <span className="text-gray-500">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.08] bg-[#171717] p-6">
        <h3 className="font-semibold">Recent orders</h3>
        <p className="mt-2 text-sm text-gray-500">
          Real orders will appear here after backend integration.
        </p>
        <button
          onClick={() => setActivePage("Orders")}
          className="mt-4 text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          View all orders →
        </button>
      </section>
    </div>
  );
}

export default Overview;
