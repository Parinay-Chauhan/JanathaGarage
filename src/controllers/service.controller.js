import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 1. Get all services with optional category filtering (Public)
export const getServices = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;

  const filter = {};
  if (categoryId) {
    filter.categoryId = categoryId;
  }

  const services = await prisma.service.findMany({
    where: filter,
    include: {
      category: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, services, "Services fetched successfully"));
});

// 2. Get single service details by ID (Public)
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Service ID is required");
  }

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service details fetched successfully"));
});

// 3. Create service (Admin Only)
export const createService = asyncHandler(async (req, res) => {
  const { title, defaultPrice, categoryId, description } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new ApiError(400, "Service title is required");
  }

  if (defaultPrice === undefined || isNaN(Number(defaultPrice)) || Number(defaultPrice) < 0) {
    throw new ApiError(400, "Valid default price is required");
  }

  if (!categoryId) {
    throw new ApiError(400, "Category ID is required");
  }

  // Check if parent category exists
  const categoryExists = await prisma.serviceCategory.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new ApiError(404, "Parent service category not found");
  }

  const service = await prisma.service.create({
    data: {
      title: title.trim(),
      defaultPrice: Number(defaultPrice),
      categoryId,
      description: description ? description.trim() : null,
    },
    include: {
      category: true,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully"));
});

// 4. Update service (Admin Only)
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, defaultPrice, categoryId, description } = req.body;

  if (!id) {
    throw new ApiError(400, "Service ID is required");
  }

  const serviceExists = await prisma.service.findUnique({
    where: { id },
  });

  if (!serviceExists) {
    throw new ApiError(404, "Service not found");
  }

  const data = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new ApiError(400, "Valid service title is required");
    }
    data.title = title.trim();
  }

  if (defaultPrice !== undefined) {
    if (isNaN(Number(defaultPrice)) || Number(defaultPrice) < 0) {
      throw new ApiError(400, "Valid default price is required");
    }
    data.defaultPrice = Number(defaultPrice);
  }

  if (categoryId !== undefined) {
    const categoryExists = await prisma.serviceCategory.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      throw new ApiError(404, "Parent service category not found");
    }
    data.categoryId = categoryId;
  }

  if (description !== undefined) {
    data.description = description === null ? null : description.trim();
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data,
    include: {
      category: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedService, "Service updated successfully"));
});