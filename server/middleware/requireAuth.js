import jwt from "jsonwebtoken";
import User from '../models/User.js'

const requireAuth = async (req, res, next) => {
    // veriry authenticatiion

    const { authorization } = req.headers

    if (!authorization) {
       res.status(401).json({error: 'Authorization token required'})
    } 

    const token = authorization.split(' ')[1]


    try {
        const decode = jwt.verify(token, process.env.SECRET)

        const user = await  User.findOne(decode.userId).select('_id')

        req.user = user
        next()
    } catch (error) {
        console.log(error)
       return res.status(401).json({error: 'Request is not authorized'}); 
    }
}


export default requireAuth;