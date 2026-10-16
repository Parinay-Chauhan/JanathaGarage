import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 1. Get all categories (Public)
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.serviceCategory.findMany({
    include: {
      _count: {
        select: { services: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

// 2. Get category by slug along with its services (Public)
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug || slug.trim() === "") {
    throw new ApiError(400, "Category slug is required");
  }

  const category = await prisma.serviceCategory.findUnique({
    where: { slug: slug.trim() },
    include: {
      services: true, // Is category ke andar ki saari services
    },
  });

  if (!category) {
    throw new ApiError(404, "Service category not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, category, "Category details fetched successfully")
    );
});

// 3. Create category (Admin Only)
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new ApiError(400, "Category name is required");
  }

  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    throw new ApiError(400, "Category slug is required");
  }

  const existingCategory = await prisma.serviceCategory.findFirst({
    where: {
      OR: [{ name: name.trim() }, { slug: slug.trim().toLowerCase() }],
    },
  });

  if (existingCategory) {
    throw new ApiError(400, "Category with this name or slug already exists");
  }

  const category = await prisma.serviceCategory.create({
    data: {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

// 4. Update category (Admin Only)
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug } = req.body;

  if (!id) {
    throw new ApiError(400, "Category ID is required");
  }

  const categoryExists = await prisma.serviceCategory.findUnique({
    where: { id },
  });

  if (!categoryExists) {
    throw new ApiError(404, "Category not found");
  }

  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new ApiError(400, "Valid category name is required");
    }
    data.name = name.trim();
  }

  if (slug !== undefined) {
    if (typeof slug !== "string" || slug.trim() === "") {
      throw new ApiError(400, "Valid category slug is required");
    }
    data.slug = slug.trim().toLowerCase();
  }

  const updatedCategory = await prisma.serviceCategory.update({
    where: { id },
    data,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});
