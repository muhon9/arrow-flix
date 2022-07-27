import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTmdbData } from "redux/tmdb/tmdbSelector";
import TextInput from "./TextInput";

const AddMovieForm = () => {
  const { loading, error, data: tmdbData } = useSelector(selectTmdbData);
  const [name, setName] = useState("A");

  return (
    <div className="">
      {JSON.stringify(tmdbData.original_title)}
      <Formik
        enableReinitialize
        initialValues={{ title: tmdbData.original_title, password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.title = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.title = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white border border-slate-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
            <TextInput
              label="Title"
              id="title"
              name="title"
              placeholder="Movie Title"
              type="text"
            />
            <button
              className="ml-24 mt-4 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMovieForm;
