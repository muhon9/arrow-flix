import useViewport from "hooks/useViewport";

export default function SkeletonPosterRow({ posterType = "poster" }) {
  const { width } = useViewport();

  function numberOfPoster() {
    if (posterType !== "backdrop") {
      return width >= 1378
        ? 7
        : width >= 998
        ? 7
        : width >= 625
        ? 3
        : width >= 330
        ? 2
        : 1;
    } else {
      return width >= 1378
        ? 7
        : width >= 998
        ? 4
        : width >= 625
        ? 2
        : width >= 330
        ? 2
        : 1;
    }
  }

  return (
    <div className="block py-[1.5vh] lg:py-[1.5vh] px-[4%]">
      <div className="animate-pulse py-0 text-base leading-[1.25vw] align-left inline-block bg-gray-700 h-9 rounded w-[70%] lg:w-[25%]"></div>
      <div className="relative">
        <div className="mt-4 flex gap-2">
          {[...Array(numberOfPoster(posterType))].map((data, i) => (
            <div
              key={i}
              className={`bg-gray-700 w-full rounded-md animate-pulse ${
                posterType === "poster"
                  ? "h-[300px] lg:h-[280px]"
                  : "h-[150px] lg:h-[180px]"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
