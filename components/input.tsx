<<<<<<< HEAD
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
=======
import { InputHTMLAttributes } from "react";
>>>>>>> 4be5d5a9668ac0e1d224605741d2c0dd51a425cd

interface InputProps {
  name: string;
  errors?: string[];
}

<<<<<<< HEAD
const _Input = (
  {
    name,
    errors = [],
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
=======
export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none
    ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none
    placeholder:text-neutral-400"
>>>>>>> 4be5d5a9668ac0e1d224605741d2c0dd51a425cd
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
<<<<<<< HEAD
};

export default forwardRef(_Input);
=======
}
>>>>>>> 4be5d5a9668ac0e1d224605741d2c0dd51a425cd
