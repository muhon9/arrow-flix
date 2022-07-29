import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { selectTmdbData } from "redux/tmdb/tmdbSelector";
import { BASE_IMG_URL } from "requestUrls";
import FormikCheckBox from "../FormikCheckBox";
import TextInput from "../TextInput";

const AddMovieForm = () => {
  const { loading, error, data: tmdbData } = useSelector(selectTmdbData);

  const initialValues = {
    title: tmdbData.title || "",
    tagline: tmdbData.tagline || "",
    overview: tmdbData.overview || "",
    poster: tmdbData.poster_path || "",
    backdrop_path: tmdbData.backdrop_path || "",
    tmdb_id: tmdbData.id || "",
    original_language: tmdbData.original_language || "",
    original_title: tmdbData.original_title || "",
    release_date: tmdbData.release_date || "",
    belongs_to_collection: tmdbData.belongs_to_collection?.id || "",
    geners: false,
  };

  return (
    <div className="">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
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
          <Form className="">
            <div className="flex w-full ">
              <div className="w-[70%] bg-white border border-slate-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
                <TextInput
                  label="Title"
                  id="title"
                  name="title"
                  placeholder="Movie Title"
                  type="text"
                />
                <TextInput
                  label="Tagline"
                  id="tagline"
                  name="tagline"
                  placeholder="Tagline"
                  type="text"
                />
                <TextInput
                  label="Description"
                  variant="textarea"
                  id="overview"
                  name="overview"
                  placeholder="Description"
                  type="textarea"
                  rows="8"
                />
                <TextInput
                  label="Poster"
                  id="poster"
                  name="poster"
                  placeholder="Poster Url"
                  type="text"
                />

                <TextInput
                  label="Backdrop"
                  id="backdrop_path"
                  name="backdrop_path"
                  placeholder="Backdrop Url"
                  type="text"
                />
                <TextInput
                  label="Backdrops"
                  id="backrops"
                  name="backrops"
                  placeholder="Backdrop Urls"
                  type="text"
                />
                <TextInput
                  label="Trailer"
                  id="trailer"
                  name="trailers"
                  placeholder="Trailer Url"
                  type="text"
                />
                <TextInput
                  label="TMDB ID"
                  id="tmdb_id"
                  name="tmdb_id"
                  placeholder="TMDB ID"
                  type="text"
                />
                <TextInput
                  label="Original Title"
                  id="original_title"
                  name="original_title"
                  placeholder="original title"
                  type="text"
                />
                <TextInput
                  label="Language"
                  id="original_language"
                  name="original_language"
                  placeholder="original language"
                  type="text"
                />
                <TextInput
                  label="Language"
                  id="release_date"
                  name="release_date"
                  placeholder="Release Year"
                  type="text"
                />
                <TextInput
                  label="Collection"
                  id="belongs_to_collection"
                  name="belongs_to_collection"
                  placeholder="Collection ID"
                  type="text"
                />
              </div>
              <div className=" w-[30%]">
                {tmdbData.poster_path && (
                  <div className="flex gap-2 w-full bg-white border border-slate-500 shadow-md rounded p-4 justify-center ml-2 mb-4 mt-4">
                    <img
                      alt="movie poster"
                      src={`${BASE_IMG_URL}/${tmdbData.poster_path}`}
                      className="h-20"
                    />
                    <img
                      alt="movie poster"
                      src={`${BASE_IMG_URL}/${tmdbData.backdrop_path}`}
                      className="h-20"
                    />
                  </div>
                )}
                <div className="flex gap-2 w-full bg-white border border-slate-500 shadow-md rounded p-4 justify-center ml-2 mb-4 mt-4">
                  <FormikCheckBox label="Bollywood" id="geners" name="geners">
                    Bollywood
                  </FormikCheckBox>
                </div>
              </div>
            </div>

            <button
              className="mt-4 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
