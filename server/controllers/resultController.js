// Path: server/controllers/resultController.js
import Result from "../models/QuizResult.js"

export const getResult = async (req, res) => {
    try {
        const result = await Result.find({user: req.user.id}).populate("user", "username")
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getSingleResult = async (req, res) => {
    try {
        const result = await Result.findOne({user: req.user.id, quiz: req.params.id}).populate("user", "username")
        if (!result) {
            req.status(404).json("Result not found")
        }
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
