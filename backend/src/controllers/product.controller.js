import Product from "../models/Product.js";

/**
 * ✅ DTO / Sanitizer: only allow these fields from req.body
 * (prevents extra unwanted keys from being saved)
 */
const toProductDTO = (body = {}) => {
  return {
    name: body.name?.trim(),
    sku: body.sku?.trim(),
    description: body.description?.trim() || "",
    category: body.category?.trim(),
    price: Number(body.price),
    quantity: Number(body.quantity),
  };
};

const validateProductDTO = (dto) => {
  if (!dto.name) return "Name is required";
  if (!dto.sku) return "SKU is required";
  if (!dto.category) return "Category is required";

  if (Number.isNaN(dto.price)) return "Price must be a number";
  if (dto.price < 0) return "Price cannot be negative";

  if (Number.isNaN(dto.quantity)) return "Quantity must be a number";
  if (dto.quantity < 0) return "Quantity cannot be negative";

  return null;
};

// ✅ POST /api/products
export const createProduct = async (req, res) => {
  try {
    const dto = toProductDTO(req.body);
    const error = validateProductDTO(dto);
    if (error) return res.status(400).json({ message: error });

    const product = await Product.create(dto);
    return res.status(201).json(product);
  } catch (error) {
    // Friendly duplicate SKU
    if (error?.code === 11000 && error?.keyPattern?.sku) {
      return res.status(400).json({ message: "SKU already exists. Use a unique SKU." });
    }
    return res.status(400).json({ message: error.message });
  }
};

// ✅ GET /api/products
// Supports:
// ?search=mouse (search name/description/sku/category)
// ?category=electronics (filter exact, case-insensitive; use "all" for no filter)
// ?sort=newest|price_asc|price_desc
// ?page=1&limit=10
export const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      sort = "newest", // newest | price_asc | price_desc
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search
    if (search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
        { sku: { $regex: s, $options: "i" } },
        { category: { $regex: s, $options: "i" } },
      ];
    }

    // Filter by category (exact match, case-insensitive)
    if (category && category !== "all") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Sort
    let sortQuery = { createdAt: -1 };
    if (sort === "price_asc") sortQuery = { price: 1 };
    if (sort === "price_desc") sortQuery = { price: -1 };

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortQuery).skip(skip).limit(limitNum),
      Product.countDocuments(query),
    ]);

    return res.json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET /api/products/:id  (optional but helpful)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ✅ PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const dto = toProductDTO(req.body);

    // allow partial update: remove undefined fields
    Object.keys(dto).forEach((k) => dto[k] === undefined && delete dto[k]);

    const updated = await Product.findByIdAndUpdate(req.params.id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    return res.json(updated);
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.sku) {
      return res.status(400).json({ message: "SKU already exists. Use a unique SKU." });
    }
    return res.status(400).json({ message: error.message });
  }
};

// ✅ DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};