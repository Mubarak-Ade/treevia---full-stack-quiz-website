import { focusVariant } from '@/utils/Animation/variant/authVariant';
import { motion } from 'motion/react';
import React, { PropsWithChildren, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface InputFieldProps {
    type: string;
    label: string;
    placeholder: string;
    errors: any;
}

export const InputField = ({
    label,
    placeholder,
    errors,
    type = 'text',
    ...props
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;
    return (
        <motion.div className="mb-5.5 font-poppins">
            <label
                // htmlFor="email"
                className="block text-secondary font-semibold mb-2 text-sm"
            >
                {label}
            </label>
            <div className="relative">
                <motion.input
                    variants={focusVariant}
                    whileFocus="animate"
                    type={inputType}
                    {...props}
                    placeholder={placeholder}
                    className="w-full bg-base rounded-full placeholder:text-slate-400 outline-none text-sm px-5 py-3  "
                />
                {isPasswordField && (
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5"
                    >
                        {showPassword ? <HiEyeOff /> : <HiEye />}
                    </button>
                )}
            </div>
            {errors && <p className="text-red-500">{errors.message}</p>}
        </motion.div>
    );
};
