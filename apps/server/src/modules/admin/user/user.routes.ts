import express from "express"
import { deleteUser, getSingleUser, getUsers, online } from "./user.controller.js";
import { rateLimitStrategies } from "../../../middleware/rateLimiter.js";

const router = express.Router()

router.get('/', getUsers);
router.get('/:userId', getSingleUser)
router.delete('/:id', rateLimitStrategies.adminWrite, deleteUser)
router.put('/:id/online', rateLimitStrategies.adminWrite, online);
// router.patch('/:id', )



export default router
