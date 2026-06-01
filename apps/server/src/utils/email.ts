import nodemailer from 'nodemailer';
import env from '../config/env.js';
import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: env.BREVO_API_KEY });

console.log("Brevo Key", env.BREVO_API_KEY);

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second
const MAX_DELAY = 10000; // 10 seconds

/**
 * Exponential backoff retry mechanism
 */
const exponentialBackoff = (attempt: number): number => {
    const delay = INITIAL_DELAY * Math.pow(2, attempt);
    return Math.min(delay, MAX_DELAY);
};

/**
 * Retry wrapper with exponential backoff
 */
const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = MAX_RETRIES,
    attempt: number = 0
): Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        if (attempt < maxRetries) {
            const delay = exponentialBackoff(attempt);
            console.warn(
                `Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
                error instanceof Error ? error.message : 'Unknown error'
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            return retryWithBackoff(fn, maxRetries, attempt + 1);
        }
        throw error;
    }
};

/**
 * Error boundary for email operations
 */
const withErrorBoundary = async <T>(
    operation: () => Promise<T>,
    operationName: string
): Promise<T> => {
    try {
        return await operation();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : '';
        
        console.error(`Email operation failed: ${operationName}`);
        console.error(`Error: ${errorMessage}`);
        if (errorStack) console.error(`Stack: ${errorStack}`);
        
        // Re-throw with additional context
        throw new Error(
            `Failed to ${operationName}: ${errorMessage}`
        );
    }
};

const sendMail = brevo.transactionalEmails.sendTransacEmail;

export const sendVerificationEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/verify-email?token=${token}`;
    
    return withErrorBoundary(async () => {
        return retryWithBackoff(async () => {
            return await brevo.transactionalEmails.sendTransacEmail({
                sender: { name: 'Treevia', email: env.SMTP_USER },
                to: [{ email }],
                subject: 'Verify your email',
                htmlContent: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Welcome to Treevia!</h2>
                    <p>Please verify your email by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Verify Email
                    </a>
                    <p>If you didn't sign up, ignore this email.</p>
                </div>`,
            });
        });
    }, 'send verification email');
};

export const resetPasswordEmail = async (email: string, token: string) => {
    const link = `${env.CLIENT_URL}/reset-password?token=${token}`;
    
    return withErrorBoundary(async () => {
        return retryWithBackoff(async () => {
            return await brevo.transactionalEmails.sendTransacEmail({
                sender: { name: 'Treevia', email: env.SMTP_USER },
                to: [{ email }],
                subject: 'Reset your password',
                htmlContent: `<div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>Reset your password</h2>
                    <p>Please reset your password by clicking the button below:</p>
                    <a href="${link}" 
                    style="display:inline-block; padding:10px 20px; background:#4f46e5; color:white; border-radius:5px; text-decoration:none;">
                    Reset Password
                    </a>
                    <p>If you didn't request a password reset, ignore this email.</p>
                </div>`,
            });
        });
    }, 'send password reset email');
};
