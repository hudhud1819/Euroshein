
function AdminHeader({ activePage, onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b border-white/[0.08] bg-[#151515] px-4 py-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="text-xl text-gray-300 lg:hidden"
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div>
          <h1 className="text-xl font-semibold text-white">
            {activePage}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your Euroshein admin panel.
          </p>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
