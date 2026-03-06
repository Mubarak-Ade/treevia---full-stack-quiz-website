import { RequestHandler } from "express";
import type { CategoryModel } from "../../../models/Category.js";
import CategoryService from "./category.service.js";

interface CategoryParams {
  id: string;
}

export const getCategories: RequestHandler = async (_req, res, next): Promise<void> => {
  try {
    const categories = await CategoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler<unknown, unknown, CategoryModel> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await CategoryService.createCategory(req.body);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler<CategoryParams> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await CategoryService.deleteCategory(req.params.id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler<CategoryParams, unknown, CategoryModel> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await CategoryService.updateCategory(req.params.id, req.body);
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
};
