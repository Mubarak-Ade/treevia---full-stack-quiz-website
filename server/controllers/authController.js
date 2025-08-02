// Path: server/controllers/authController.js
import User from "../models/User.js";
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken";

const creatJWT = ( _id, role ) =>
{
    return jwt.sign( { _id, role }, process.env.SECRET, { expiresIn: "1d" } );
};

export const register = async ( req, res ) =>
{
    const { username, email, password, role } = req.body;
    try
    {
        let user = await User.findOne( { email } )

        if ( user )
        {
            return res.status( 400 ).json( "User already exists" )
        }

        user = new User( { username, email, password, role: role || "student" } )

        await user.save();

        const token = creatJWT( user._id, user.role );
        res.status( 201 ).json(
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        );
    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( "Server Error" );
    }
};

export const login = async ( req, res ) =>
{
    const { email, password } = req.body;
    try
    {
        const user = await User.findOne( { email } );

        if ( !user )
        {
            return res.status( 400 ).json( { msg: "Invalid credentials" } );
        }

        const isMatch = await user.matchPassword( password );

        if ( !isMatch )
        {
            return res.status( 400 ).json( { msg: "Invalid credentials" } );
        }
        const token = creatJWT( user._id, user.role );
        res.json(
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        );
    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( "Server Error" );
    }
};

export const getUsers = async ( req, res ) =>
{
    try
    {
        const users = await User.find( {}, "-password" );

        res.status( 200 ).json( users );
        if ( !users )
        {
            res.status( 404 ).json( "No users" );
        }
    } catch ( error )
    {
        res.status( 400 ).json( { msg: error.message } );
    }
};

export const online = async ( req, res ) =>
{
    const { isOnline } = req.body;
    try
    {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isOnline },
            { new: true }
        );
        res.status( 200 ).json( user );
    } catch ( error )
    {
        res.status( 400 ).json( { msg: error.message } )
    }
};
