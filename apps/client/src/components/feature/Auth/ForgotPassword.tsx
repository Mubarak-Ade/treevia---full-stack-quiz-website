import Image from '@/assets/images/transparent tree illustration.png';
import { useNotification } from '@/context/NotificationProvider';
import { useSendResetPasswordToken } from '@/modules/auth/controllers/auth.controller';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { submitVariant } from '../../../utils/Animation/variant/authVariant';
import { InputField } from '../share/InputField';

const schema = z.object({
    email: z.string().email('Enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? error.message;
    }

    return error instanceof Error ? error.message : 'Unable to send reset email';
};

const ForgotPassword = () => {
    const { showNotification } = useNotification();
    const sendResetToken = useSendResetPasswordToken();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        sendResetToken.mutate(data, {
            onSuccess: () => {
                showNotification('success', 'Password reset link sent. Check your email.');
            },
            onError: error => {
                const message = getErrorMessage(error);
                showNotification('error', message);
                setError('root', { type: 'manual', message });
            },
        });
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
                        Reset Password
                    </h2>
                    <p className="font-display text-base mb-5 text-center text-secondary">
                        Enter your email and we will send you a password reset link.
                    </p>

                    <InputField
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        {...register('email')}
                        errors={errors.email}
                    />

                    {errors.root?.message && (
                        <p className="mb-4 text-sm text-red-500">{errors.root.message}</p>
                    )}

                    {isSubmitSuccessful && !sendResetToken.isError && (
                        <p className="mb-4 text-sm text-secondary">
                            If that email exists on Treevia, a reset link is on its way.
                        </p>
                    )}

                    <motion.button
                        variants={submitVariant}
                        whileHover="animate"
                        disabled={sendResetToken.isPending}
                        type="submit"
                        className="w-full p-3 text-on-brand relative overflow-hidden bg-brand rounded-full text-base font-semibold cursor-pointer mb-5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {sendResetToken.isPending ? 'Sending...' : 'Send Reset Link'}
                    </motion.button>
                </form>

                <p className="text-center text-primary">
                    Remembered it?{' '}
                    <Link to="/login" className="text-brand font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;
