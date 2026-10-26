
import { useCallback, useEffect, useState } from "react";

const PRODUCTS_URL = "http://localhost:5000/api/admin/products";
const CATEGORIES_URL = "http://localhost:5000/api/admin/categories";

const emptyForm = {
  name: "",
  description: "",
  categoryId: "",
  price: "",
  oldPrice: "",
  stock: "0",
  imageUrl: "",
  isActive: true,
};

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "The request failed.");
  }

  return data;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = () => sessionStorage.getItem("eurosheinAdminToken");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const adminToken = token();

      if (!adminToken) {
        throw new Error("Your admin session has expired. Please log in again.");
      }

      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };

      const [productResponse, categoryResponse] = await Promise.all([
        fetch(PRODUCTS_URL, { headers }),
        fetch(CATEGORIES_URL, { headers }),
      ]);

      const [productData, categoryData] = await Promise.all([
        readResponse(productResponse),
        readResponse(categoryResponse),
      ]);

      setProducts(productData.products || []);
      setCategories(categoryData.categories || []);
    } catch (err) {
      setError(err.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormOpen(true);
    setError("");
    setMessage("");
  }

  function openEditForm(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      categoryId: product.categoryId || "",
      price: String(product.price ?? ""),
      oldPrice: product.oldPrice == null ? "" : String(product.oldPrice),
      stock: String(product.stock ?? 0),
      imageUrl: product.imageUrl || "",
      isActive: product.isActive ?? true,
    });
    setFormOpen(true);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);
    const oldPrice =
      form.oldPrice.trim() === "" ? null : Number(form.oldPrice);

    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid price of zero or more.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock must be a whole number of zero or more.");
      return;
    }

    if (
      oldPrice !== null &&
      (!Number.isFinite(oldPrice) || oldPrice < 0)
    ) {
      setError("Enter a valid original price or leave it empty.");
      return;
    }

    setSaving(true);

    try {
      const adminToken = token();

      if (!adminToken) {
        throw new Error("Your admin session has expired. Please log in again.");
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        categoryId: form.categoryId,
        price,
        oldPrice,
        stock,
        imageUrl: form.imageUrl.trim() || null,
        isActive: form.isActive,
      };

      const response = await fetch(
        editingId ? `${PRODUCTS_URL}/${editingId}` : PRODUCTS_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await readResponse(response);

      setMessage(
        data.message ||
          (editingId ? "Product updated successfully." : "Product created successfully.")
      );
      setFormOpen(false);
      setEditingId(null);
      setForm({ ...emptyForm });

      await loadData();
    } catch (err) {
      setError(err.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Delete "${product.name}" permanently?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${PRODUCTS_URL}/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      const data = await readResponse(response);

      setMessage(data.message || "Product deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message || "Unable to delete product.");
    }
  }

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalStock = products.reduce(
    (sum, product) => sum + (Number(product.stock) || 0),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.stock) < 10
  ).length;

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
            Store management
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your real product listings, prices, images, and stock.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          disabled={categories.length === 0}
          className="rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add new product
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div role="status" className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
          {message}
        </div>
      )}

      {categories.length === 0 && !loading && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-200">
          Add a category first before creating a product.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Products", value: products.length },
          { label: "Total Stock", value: totalStock },
          { label: "Low Stock", value: lowStock },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-[#171717] p-5">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-amber-400/20 bg-[#171717] p-5 sm:p-6"
        >
          <div>
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit product" : "Add a product"}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Fields marked with * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>Product name *</span>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                required
                maxLength={160}
                placeholder="e.g. Elegant Everyday Blazer"
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Category *</span>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={updateField}
                required
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm">
              <span>Selling price (ETB) *</span>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={updateField}
                required
                placeholder="1850"
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Original price (ETB)</span>
              <input
                name="oldPrice"
                type="number"
                min="0"
                step="0.01"
                value={form.oldPrice}
                onChange={updateField}
                placeholder="Optional"
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Stock quantity *</span>
              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={updateField}
                required
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Product image URL</span>
              <input
                name="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={updateField}
                placeholder="https://..."
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows={4}
              placeholder="Describe the product, material, fit, or other details..."
              className="w-full resize-y rounded-lg border border-white/10 bg-[#101010] px-4 py-3 outline-none focus:border-amber-400"
            />
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={updateField}
              className="h-4 w-4 accent-amber-400"
            />
            Product is active and available to display
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-300 disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save changes" : "Create product"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setEditingId(null);
                setForm({ ...emptyForm });
                setError("");
              }}
              className="rounded-lg border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#171717]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold">Your products</h2>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products or categories..."
            className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm outline-none focus:border-amber-400 sm:max-w-md"
          />
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-400">Loading products from the database...</p>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="font-medium">No products yet</h3>
            <p className="mt-2 text-sm text-gray-400">
              Create your first product to save it to your database.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">
            No products match your search.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-xs text-gray-500">
                            No img
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.oldPrice != null && (
                            <p className="mt-1 text-xs text-gray-500 line-through">
                              ETB {Number(product.oldPrice).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {product.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-5 py-4">
                      ETB {Number(product.price).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className={Number(product.stock) < 10 ? "text-red-400" : "text-gray-300"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={product.isActive ? "rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400" : "rounded-full bg-gray-500/10 px-3 py-1 text-xs text-gray-400"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(product)}
                          className="rounded-md border border-white/15 px-3 py-2 text-xs hover:bg-white/5"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          className="rounded-md border border-red-500/30 px-3 py-2 text-xs text-red-300 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
