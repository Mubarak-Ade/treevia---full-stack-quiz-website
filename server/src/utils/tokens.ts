import { Response } from "express";
import env from "../env.js";

export const sendToken = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 60 * 100
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 100
    })
    
}