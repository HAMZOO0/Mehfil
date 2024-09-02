import { useId, forwardRef } from "react";

function Input({ label, className, type, ...props }, ref) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={`mb-1 inline-block text-gray-300`}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref} // Pass the ref to the input
        className={` rounded-lg border bg-transparent px-3 py-2 ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
