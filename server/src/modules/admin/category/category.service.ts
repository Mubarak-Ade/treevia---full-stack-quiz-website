import createHttpError from "http-errors";
import Category, { CategoryModel } from "../../../models/Category.js";

const getCategories = async () => {
  return Category.aggregate([
    {
      $lookup: {
        from: "quizzes",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$category", "$$categoryId"] },
            },
          },
          { $count: "count" },
        ],
        as: "quizCount",
      },
    },
    {
      $addFields: {
        quizCount: {
          $ifNull: [{ $arrayElemAt: ["$quizCount.count", 0] }, 0],
        },
      },
    },
  ]);
};

const createCategory = async (body: CategoryModel) => {
  const { name, description = "", tags = [] } = body;

  if (!name) {
    throw createHttpError(400, "category name is missing");
  }

  const category = new Category({
    name,
    description,
    tags: tags.map((t) => ({ name: t })),
  });

  await category.save();

  return {
    message: "category created successfully",
    category,
  };
};

const deleteCategory = async (categoryId: string) => {
  if (!categoryId) {
    throw createHttpError(400, "category id is not provided");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw createHttpError(404, "category not found");
  }

  await Category.findByIdAndDelete(categoryId);

  return {
    message: "Category deleted successfully",
    category,
  };
};

const updateCategory = async (categoryId: string, body: CategoryModel) => {
  const { name, description, tags } = body;

  const update: any = {};
  if (name !== undefined) {
    update.name = name;
  }
  if (description !== undefined) {
    update.description = description;
  }
  if (tags !== undefined) {
    update.tags = tags.map((t) => ({ name: t }));
  }

  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: update,
    },
    { new: true, runValidators: true }
  );

  if (!category) {
    throw createHttpError(404, "category does not exist");
  }

  return {
    message: "Updated Successfully",
    category,
  };
};

export default { getCategories, createCategory, deleteCategory, updateCategory };
