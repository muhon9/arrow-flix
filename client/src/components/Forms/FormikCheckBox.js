import { useField } from "formik";

const FormikCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div className="p-1">
      <label className="flex">
        <input type="checkbox" className="mr-2" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikCheckBox;
