import express from "express"
import { deleteUser, getSingleUser, getUsers, online } from "../../controllers/admin/usersController.js";

const router = express.Router()

router.get('/', getUsers);
router.get('/:userId', getSingleUser)
router.delete('/:id', deleteUser)
router.put('/:id/online', online);
// router.patch('/:id', )



export default router