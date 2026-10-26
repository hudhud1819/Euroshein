
const express = require("express");
const prisma = require("../prisma");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// GET /api/admin/dashboard
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const [customerCount, adminCount, totalUsers] = await Promise.all([
      prisma.user.count({
        where: { role: "CUSTOMER" },
      }),
      prisma.user.count({
        where: { role: "ADMIN" },
      }),
      prisma.user.count(),
    ]);

    return res.status(200).json({
      message: "Dashboard data retrieved successfully.",
      stats: {
        customerCount,
        adminCount,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      message: "Unable to load dashboard data.",
    });
  }
});

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET /api/admin/products — list real products
router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ products });
  } catch (error) {
    console.error("List products error:", error);
    return res.status(500).json({ message: "Unable to load products." });
  }
});

// POST /api/admin/products — create a product
router.post("/products", adminAuth, async (req, res) => {
  try {
    const {
      name,
      description = "",
      price,
      oldPrice,
      stock = 0,
      imageUrl,
      categoryId,
      isActive = true,
    } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !categoryId ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res.status(400).json({
        message: "Provide a product name, category, valid price, and non-negative stock.",
      });
    }

    if (
      oldPrice !== undefined &&
      oldPrice !== null &&
      (oldPrice === "" ||
        !Number.isFinite(Number(oldPrice)) ||
        Number(oldPrice) < 0)
    ) {
      return res.status(400).json({ message: "Old price must be a non-negative number." });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(400).json({ message: "Selected category does not exist." });
    }

    const baseSlug = makeSlug(name) || "product";
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        description,
        price: Number(price),
        oldPrice:
          oldPrice === undefined || oldPrice === null || oldPrice === ""
            ? null
            : Number(oldPrice),
        stock: Number(stock),
        imageUrl: imageUrl || null,
        isActive: Boolean(isActive),
        categoryId,
      },
      include: { category: true },
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Unable to create product." });
  }
});

// PUT /api/admin/products/:id — update a product
router.put("/products/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      oldPrice,
      stock,
      imageUrl,
      categoryId,
      isActive,
    } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Product not found." });
    }

    const data = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ message: "Product name is required." });
      }
      data.name = name.trim();
      data.slug = `${makeSlug(name) || "product"}-${Date.now().toString(36)}`;
    }

    if (description !== undefined) data.description = description;

    if (price !== undefined) {
      if (!Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({ message: "Price must be non-negative." });
      }
      data.price = Number(price);
    }

    if (oldPrice !== undefined) {
      if (
        oldPrice !== null &&
        oldPrice !== "" &&
        (!Number.isFinite(Number(oldPrice)) || Number(oldPrice) < 0)
      ) {
        return res.status(400).json({ message: "Old price must be non-negative." });
      }
      data.oldPrice = oldPrice === null || oldPrice === "" ? null : Number(oldPrice);
    }

    if (stock !== undefined) {
      if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({ message: "Stock must be a non-negative integer." });
      }
      data.stock = Number(stock);
    }

    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({ message: "isActive must be true or false." });
      }
      data.isActive = isActive;
    }

    if (categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(400).json({ message: "Selected category does not exist." });
      }
      data.categoryId = categoryId;
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });

    return res.json({ message: "Product updated successfully.", product });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Unable to update product." });
  }
});

// DELETE /api/admin/products/:id — delete a product
router.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Product not found." });
    }

    await prisma.product.delete({ where: { id } });

    return res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      message: "Unable to delete product. Check whether it is referenced elsewhere.",
    });
  }
});

function createCategorySlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET /api/admin/categories
router.get("/categories", adminAuth, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });

    return res.json({ categories });
  } catch (error) {
    console.error("Get categories error:", error);
    return res.status(500).json({ message: "Unable to load categories." });
  }
});

// POST /api/admin/categories
router.post("/categories", adminAuth, async (req, res) => {
  try {
    const name = typeof req.body.name === "string"
      ? req.body.name.trim()
      : "";

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const baseSlug = createCategorySlug(name);
    if (!baseSlug) {
      return res.status(400).json({ message: "Enter a valid category name." });
    }

    const existing = await prisma.category.findFirst({
      where: { OR: [{ name }, { slug: baseSlug }] },
    });

    if (existing) {
      return res.status(409).json({
        message: "A category with that name already exists.",
      });
    }

    const category = await prisma.category.create({
      data: { name, slug: baseSlug },
    });

    return res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    return res.status(500).json({ message: "Unable to create category." });
  }
});

// PUT /api/admin/categories/:id
router.put("/categories/:id", adminAuth, async (req, res) => {
  try {
    const name = typeof req.body.name === "string"
      ? req.body.name.trim()
      : "";

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const existing = await prisma.category.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Category not found." });
    }

    const slug = createCategorySlug(name);
    if (!slug) {
      return res.status(400).json({ message: "Enter a valid category name." });
    }

    const duplicate = await prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
        NOT: { id: req.params.id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        message: "Another category already uses that name.",
      });
    }

    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: { name, slug },
    });

    return res.json({ message: "Category updated successfully.", category });
  } catch (error) {
    console.error("Update category error:", error);
    return res.status(500).json({ message: "Unable to update category." });
  }
});

// DELETE /api/admin/categories/:id
router.delete("/categories/:id", adminAuth, async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    if (category._count.products > 0) {
      return res.status(409).json({
        message: "Move or delete this category's products before deleting it.",
      });
    }

    await prisma.category.delete({ where: { id: req.params.id } });

    return res.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Delete category error:", error);
    return res.status(500).json({ message: "Unable to delete category." });
  }
});

module.exports = router;
