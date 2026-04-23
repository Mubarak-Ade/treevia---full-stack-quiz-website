import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { z } from 'zod';
import { submitVariant } from '../../../utils/Animation/variant/authVariant';

import Image from '@/assets/images/transparent tree illustration.png';
import { useNotification } from '@/context/NotificationProvider';
import { useLogin } from '@/modules/auth/controllers/auth.controller';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { InputField } from '../share/InputField';

const schema = z.object({
    email: z.string().email('invalid email address'),
    password: z.string().min(6, 'password must be 6 char long'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
    const { showNotification } = useNotification();
    const login = useLogin();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        login.mutate(data, {
            onSuccess: () => {
                showNotification('success', 'Successfully login, redirecting to your dashboard...');
                navigate("/quizzes")
            },
            onError: error => {
                showNotification('error', error.message);
                setError('root', {
                    type: 'manual',
                    message: error.message,
                });
                (error.message);
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
                duration: 0.8,
            }}
            className="w-full flex items-center backdrop-blur-md justify-center lg:p-10"
        >
            <div className="max-w-lg relative bg-surface p-8 rounded-4xl overflow-hidden w-full">
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 top-0" />
                <div className="h-2 w-full bg-brand absolute rounded-4xl left-0 bottom-0" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-center">
                        <img src={Image} alt="" className="size-20" />
                    </div>
                    <h2 className="font-poppins text-center font-bold mb-2 text-3xl text-primary">
                        Welcome Back
                    </h2>
                    <h4 className="font-display text-lg mb-5 text-center text-secondary ">
                        Sign in to continue your learning journey
                    </h4>

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
                    {/* Password Field */}
                    <a href="" className="text-primary ">
                        Forgotten Password
                    </a>

                    {/* Submit Button */}
                    <motion.button
                        variants={submitVariant}
                        whileHover="animate"
                        disabled={login.isPending}
                        type="submit"
                        className="w-full p-3 text-on-brand relative overflow-hidden bg-brand rounded-full text-base font-semibold cursor-pointer mt-2 mb-6.5"
                    >
                        {login.isPending ? 'Submiting' : 'Submit'}
                        {login.isPending && (
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

                    <p className="text-center mt-4 text-primary">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
