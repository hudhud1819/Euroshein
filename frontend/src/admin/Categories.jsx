
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/admin/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getToken = () => sessionStorage.getItem("eurosheinAdminToken");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Your admin session has expired. Please log in again.");
      }

      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load categories.");
      }

      setCategories(data.categories || []);
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter a category name.");
      return;
    }

    setSaving(true);

    try {
      const token = getToken();

      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmedName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save category.");
      }

      setName("");
      setEditingId(null);
      setMessage(data.message || "Category saved successfully.");
      await loadCategories();
    } catch (err) {
      setError(err.message || "Could not save category.");
    } finally {
      setSaving(false);
    }
  }

  function startEditing(category) {
    setEditingId(category.id);
    setName(category.name);
    setError("");
    setMessage("");
  }

  async function handleDelete(category) {
    const confirmed = window.confirm(
      `Delete the "${category.name}" category? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${category.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete category.");
      }

      if (editingId === category.id) {
        setEditingId(null);
        setName("");
      }

      setMessage(data.message || "Category deleted successfully.");
      await loadCategories();
    } catch (err) {
      setError(err.message || "Could not delete category.");
    }
  }

  function cancelEditing() {
    setEditingId(null);
    setName("");
    setError("");
    setMessage("");
  }

  return (
    <div className="space-y-6 text-white">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
          Store management
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Categories</h1>
        <p className="mt-2 text-sm text-gray-400">
          Organize the products available in your Euroshein store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-[#171717] p-5 sm:p-6"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit category" : "Add a category"}
        </h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter category name"
            maxLength={80}
            required
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm outline-none transition focus:border-amber-400"
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Save changes"
                : "Add category"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-lg border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300"
        >
          {message}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-semibold">Your categories</h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300">
            {categories.length} total
          </span>
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-400">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="p-6 text-sm text-gray-400">
            No categories found. Add your first category above.
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="mt-1 break-all text-xs text-gray-500">
                    Slug: {category.slug}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {category._count?.products ?? 0} products
                  </p>
                </div>

                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => startEditing(category)}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
