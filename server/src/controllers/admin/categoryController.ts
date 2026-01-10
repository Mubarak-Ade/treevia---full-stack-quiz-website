import { RequestHandler } from 'express';
import Category, { CategoryModel } from '../../models/Category.js';
import createHttpError from "http-errors"
import { isArray } from 'util';
import { listenerCount } from 'nodemailer/lib/xoauth2/index.js';


export const getCategories: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		// logic
		const categories = await Category.aggregate([
			{
				$lookup: {
					from: "quizzes",
					let: { categoryId: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$category", "$$categoryId"] }
							}
						},
						{ $count: "count" }
					],
					as: "quizCount"
				}
			},
			{
				$addFields: {
					quizCount: {
						$ifNull: [{ $arrayElemAt: ["$quizCount.count", 0] }, 0]
					}
				}
			}
		])
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

export const createCategory: RequestHandler<unknown, unknown, CategoryModel, unknown> = async (req, res, next): Promise<void> => {
	try {
		// logic
		const { name, description = "", tags = [] } = req.body
		if (!name) throw createHttpError(400, "category name is missing")
		const category = new Category({
			name,
			description,
			tags: tags.map(t => ({
				name: t
			}))
		})
		await category.save()
		res.status(200).json({ message: "category created successfully", category });
	} catch (error) {
		next(error)
	}
};

export const deleteCategory: RequestHandler<CategoryParams, unknown, unknown, unknown> = async (req, res, next): Promise<void> => {
	try {
		// logic
		const categoryId = req.params.id
		if (!categoryId) throw createHttpError(400, "category id is not provided")
		const category = await Category.findById(categoryId)
		if (!category) throw createHttpError(404, "category not found")
		await Category.findByIdAndDelete(categoryId)
		res.status(200).json({ message: "Category deleted successfully", category })
	} catch (error) {
		next(error)
	}
};

interface CategoryParams {
	id: string
}

export const updateCategory: RequestHandler<CategoryParams, unknown, CategoryModel, unknown> = async (req, res, next): Promise<void> => {
	try {
		const categoryId = req.params.id
		let { name, description, tags } = req.body

		// const category = await Category.findById(categoryId)

		
		
		const update: any = {}

		if (name !== undefined) update.name = name
		if (description !== undefined) update.description = description
		if (tags !== undefined) {
			update.tags = tags.map(t => ({
				name: t
			}))
		}
		
		const category = await Category.findByIdAndUpdate(categoryId, {
			$set: update 
		}, { new: true, runValidators: true })
		
		if (!category) {
			throw createHttpError(404, "category does not exist")
		}
		res.status(201).json({ message: "Updated Successfully", category });
	} catch (error) {
		next(error);
	}
};