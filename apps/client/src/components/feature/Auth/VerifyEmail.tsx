import Image from '@/assets/images/transparent tree illustration.png';
import { useNotification } from '@/context/NotificationProvider';
import { useVerifyEmail } from '@/modules/auth/controllers/auth.controller';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';

const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? error.message;
    }

    return error instanceof Error ? error.message : 'Unable to verify email';
};

const VerifyEmail = () => {
    const { showNotification } = useNotification();
    const verifyEmail = useVerifyEmail();
    const { mutate } = verifyEmail;
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? '';

    useEffect(() => {
        if (!token) {
            showNotification('error', 'Verification link is missing a token');
            return;
        }

        mutate(token, {
            onSuccess: () => {
                showNotification('success', 'Email verified successfully.');
            },
            onError: error => {
                showNotification('error', getErrorMessage(error));
            },
        });
    }, [mutate, showNotification, token]);

    const title = !token
        ? 'Invalid Verification Link'
        : verifyEmail.isSuccess
          ? 'Email Verified'
          : verifyEmail.isError
            ? 'Verification Failed'
            : 'Verifying Email';

    const message = !token
        ? 'The verification link is missing its token. Please use the link from your email.'
        : verifyEmail.isSuccess
          ? 'Your email is now verified. You can continue using Treevia.'
          : verifyEmail.isError
            ? getErrorMessage(verifyEmail.error)
            : 'Please wait while we confirm your email address.';

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center backdrop-blur-md justify-center px-4 py-12 lg:p-10"
        >
            <div className="max-w-lg relative bg-surface p-8 rounded-4xl overflow-hidden w-full text-center">
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 top-0" />
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 bottom-0" />
                <div className="w-full flex items-center justify-center">
                    <img src={Image} alt="" className="size-20" />
                </div>
                <h2 className="font-poppins font-bold mb-2 text-3xl text-primary">{title}</h2>
                <p className="font-display text-base mb-6 text-secondary">{message}</p>

                {verifyEmail.isPending && (
                    <div className="mx-auto mb-6 size-9 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
                )}

                <Link
                    to="/login"
                    className="inline-flex w-full justify-center rounded-full bg-brand p-3 text-base font-semibold text-on-brand"
                >
                    Go to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default VerifyEmail;
