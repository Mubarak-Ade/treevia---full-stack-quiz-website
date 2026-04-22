import { useNotification } from '@/context/NotificationProvider';
import { useRegister } from '@/modules/auth/controllers/auth.controller';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { focusVariant, submitVariant } from '../../../utils/Animation/variant/authVariant';
import { InputField } from '../share/InputField';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { Link } from 'react-router';

const schema = z
    .object({
        username: z.string().min(3, 'name must be atleast 3 char long'),
        email: z.string().email('invalid email address'),
        password: z.string().min(6, 'password must be 6 char long'),
        confirmPassword: z.string().min(6, 'confirm password'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'password does not match',
        path: ['confirmPassword'],
    });

type FormData = z.infer<typeof schema>;

const Register = () => {
    const { showNotification } = useNotification();

    const [showPassword, setShowPassword] = useState(false);

    const signup = useRegister();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        signup.mutate(data, {
            onSuccess: () => {
                showNotification(
                    'success',
                    'Successfully Sign up, redirecting to your dashboard...'
                );
            },
            onError: error => {
                showNotification('error', JSON.stringify(error.message));
                setError('root', {
                    type: 'manual',
                    message: error.message,
                });
                (errors.root?.message);
            },
        });
    };

    return (
        <motion.div
            initial={{
                x: -20,
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.6,
            }}
            layout
            className="w-full flex  items-center bg-black/20 backdrop-blur-md justify-center lg:p-10"
        >
            <div className="max-w-lg relative bg-surface p-8 rounded-4xl overflow-hidden w-full">
                <div className="h-2 w-full bg-primary absolute rounded-4xl left-0 top-0" />
                <div className="h-2 w-full bg-primary absolute rounded-4xl left-0 bottom-0" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="font-poppins text-center font-bold mb-2 text-3xl text-black dark:text-white">
                        Plant Your Roots
                    </h2>
                    <h4 className="font-poppins mb-5 text-center text-[15px] text-secondary dark:text-tertiary">
                        Create an account to start growing your knowledge
                    </h4>

                    {/* Name Field */}
                    <InputField
                        type="text"
                        label="Full Name"
                        placeholder="Enter Your Full Name"
                        {...register('username')}
                        errors={errors.username}
                    />
                    <InputField
                        type="email"
                        label="Email Address"
                        placeholder="Enter Your Email"
                        {...register('email')}
                        errors={errors.email}
                    />

                    <InputField
                        type="password"
                        placeholder="Email Your Password"
                        label="Enter Your Password"
                        {...register('password')}
                        errors={errors.password}
                    />

                    <InputField
                        type="password"
                        label="Confirm Password"
                        placeholder="Comfirm Your Password"
                        {...register('confirmPassword')}
                        errors={errors.confirmPassword}
                    />

                    {/* Submit Button */}
                    <motion.button
                        variants={submitVariant}
                        whileHover="animate"
                        disabled={signup.isPending}
                        type="submit"
                        className="w-full p-3 text-on-brand relative overflow-hidden bg-brand rounded-full text-base font-semibold cursor-pointer mb-6.5"
                    >
                        {signup.isPending ? 'Submiting' : 'Submit'}
                        {signup.isPending && (
                            <motion.div
                                className="absolute top-0 -left-full z-50 w-full h-full"
                                animate={{
                                    left: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                }}
                            />
                        )}
                    </motion.button>
                </form>
                <div className="">
                    <span className="text-xs font-medium text-secondary flex items-center justify-center w-full text-center after:w-30 after:bg-tertiary/50 after:h-px after:content-[''] gap-4 before:w-30 before:bg-tertiary/50 before:h-px before:content-['']">
                        OR CONNECT WITH
                    </span>
                    <div className="flex gap-5 mt-5 w-full items-center justify-center">
                        <button className="p-3 text-2xl flex rounded-full items-center justify-center cursor-pointer bg-surface-alt gap-2">
                            <FcGoogle />
                        </button>
                        <button className="p-3 text-2xl rounded-full flex items-center bg-surface-alt cursor-pointer justify-center gap-2">
                            <RiFacebookCircleFill />
                        </button>
                    </div>

                    <p className="text-center mt-5 text-primary">
                        Don't have an account?{' '}
                        <Link to="/login" className="text-brand font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
