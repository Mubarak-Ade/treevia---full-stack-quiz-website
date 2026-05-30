import nodemailer from 'nodemailer'
import env from '../config/env.js'

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
})

export const sendVerificationEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/verify-email?token=${token}`
    await transporter.sendMail({
        from: `Treevia: <${env.SMTP_USER}>`,
        to: email,
        subject: 'Verify your email',
        html: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Welcome to Treevia!</h2>
                    <p>Please verify your email by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Verify Email
                    </a>
                    <p>If you didn’t sign up, ignore this email.</p>
                </div>`,
    })
}

export const resetPasswordEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/reset-password?token=${token}`
    await transporter.sendMail({
        from: `Treevia: <${env.SMTP_USER}>`,
        to: email,
        subject: 'Reset your password',
        html: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Reset your password</h2>
                    <p>Please reset your password by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Reset Password
                    </a>
                    <p>If you didn’t request a password reset, ignore this email.</p>
                </div>`,
    })
}