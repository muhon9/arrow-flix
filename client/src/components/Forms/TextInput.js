import { useField } from "formik";

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4 border ">
      <label
        className="mr-4 text-gray-700 text-lg font-regular mb-2"
        htmlFor={props.id || props.name}
      >
        {label}:
      </label>
      <input
        className="inline-block shadow appearance-none border border-slate-500 rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs font-thin italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
}
