import Image from '@/assets/images/transparent tree illustration.png';
import { useNotification } from '@/context/NotificationProvider';
import { useVerifyResetPassword } from '@/modules/auth/controllers/auth.controller';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { z } from 'zod';
import { submitVariant } from '../../../utils/Animation/variant/authVariant';
import { InputField } from '../share/InputField';

const schema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm your password'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type FormData = z.infer<typeof schema>;

const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? error.message;
    }

    return error instanceof Error ? error.message : 'Unable to reset password';
};

const ResetPassword = () => {
    const { showNotification } = useNotification();
    const verifyResetPassword = useVerifyResetPassword();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? '';

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        if (!token) {
            const message = 'Reset link is missing a token';
            showNotification('error', message);
            setError('root', { type: 'manual', message });
            return;
        }

        verifyResetPassword.mutate(
            { token, password: data.password },
            {
                onSuccess: () => {
                    showNotification('success', 'Password reset successfully. You can log in now.');
                    navigate('/login');
                },
                onError: error => {
                    const message = getErrorMessage(error);
                    showNotification('error', message);
                    setError('root', { type: 'manual', message });
                },
            }
        );
    };

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center backdrop-blur-md justify-center px-4 py-12 lg:p-10"
        >
            <div className="max-w-lg relative bg-surface p-8 rounded-4xl overflow-hidden w-full">
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 top-0" />
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 bottom-0" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-center">
                        <img src={Image} alt="" className="size-20" />
                    </div>
                    <h2 className="font-poppins text-center font-bold mb-2 text-3xl text-primary">
                        Create New Password
                    </h2>
                    <p className="font-display text-base mb-5 text-center text-secondary">
                        Choose a new password for your Treevia account.
                    </p>

                    {!token && (
                        <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                            This reset link is invalid because it has no token.
                        </p>
                    )}

                    <InputField
                        type="password"
                        label="New Password"
                        placeholder="Enter your new password"
                        {...register('password')}
                        errors={errors.password}
                    />
                    <InputField
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your new password"
                        {...register('confirmPassword')}
                        errors={errors.confirmPassword}
                    />

                    {errors.root?.message && (
                        <p className="mb-4 text-sm text-red-500">{errors.root.message}</p>
                    )}

                    <motion.button
                        variants={submitVariant}
                        whileHover="animate"
                        disabled={verifyResetPassword.isPending || !token}
                        type="submit"
                        className="w-full p-3 text-on-brand relative overflow-hidden bg-brand rounded-full text-base font-semibold cursor-pointer mb-5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {verifyResetPassword.isPending ? 'Resetting...' : 'Reset Password'}
                    </motion.button>
                </form>

                <p className="text-center text-primary">
                    Back to{' '}
                    <Link to="/login" className="text-brand font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default ResetPassword;
