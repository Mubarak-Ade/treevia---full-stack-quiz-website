import User from "../../models/User.js";

const uploadProfilePic = async (userId: string, filename?: string) => {
  const imagePath = `/uploads/${filename}`;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      profilePic: imagePath,
    },
    { new: true, upsert: true }
  );

  return {
    message: "File uploaded successfully",
    user,
  };
};

const getUserInfo = async (userId: string) => {
  return User.findById(userId).lean();
};

export default { uploadProfilePic, getUserInfo };
