export default function GenreCheckboxSection({
  categories,
  genreArray = [],
  handleCheck,
}) {
  return (
    <div className="w-full bg-white border border-slate-500 shadow-md rounded p-4 justify-center ml-2 mb-4 mt-4">
      {categories.map((category, i) => (
        <div key={i} className="p-1">
          <label className="flex">
            <input
              type="checkbox"
              className="mr-2"
              value={category}
              onChange={handleCheck}
              checked={genreArray.includes(category)}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}
