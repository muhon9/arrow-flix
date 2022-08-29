export default function SkeletonPoster({ posterType }) {
  return (
    <div
      className={`bg-gray-700 w-full rounded-md animate-pulse ${
        posterType === 'poster'
          ? 'h-[300px] lg:h-[280px]'
          : 'h-[150px] lg:h-[180px]'
      }`}
    ></div>
  );
}
