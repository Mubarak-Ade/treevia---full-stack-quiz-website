import express from "express"
import { deleteUser, getSingleUser, getUsers, online } from "../../modules/admin/user/user.controller.js";

const router = express.Router()

router.get('/', getUsers);
router.get('/:userId', getSingleUser)
router.delete('/:id', deleteUser)
router.put('/:id/online', online);
// router.patch('/:id', )



export default router
