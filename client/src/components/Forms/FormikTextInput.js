import { useField } from "formik";

export default function FormikTextinput({
  label,
  variant = "input",
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4 w-full">
      <div className="flex">
        <label
          className="mr-4 text-gray-700 text-lg font-regular mb-2 w-32"
          htmlFor={props.id || props.name}
        >
          {label}:
        </label>
        {variant === "input" ? (
          <input
            className="inline-block w-full shadow appearance-none border border-slate-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...field}
            {...props}
          />
        ) : (
          <textarea
            className="inline-block w-full shadow appearance-none border border-slate-500 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...field}
            {...props}
          />
        )}
      </div>

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs font-thin italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
}
