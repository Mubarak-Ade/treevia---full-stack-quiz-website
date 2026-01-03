import express from "express"
import multer from "multer";
import { getUserInfo, uploadProfilePic } from "../controllers/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({ storage });

router.get('/me', getUserInfo)
router.patch("/me/upload", upload.single("file"), uploadProfilePic)

export default router