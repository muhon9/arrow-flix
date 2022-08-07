export default function SkeletonBanner() {
  return (
    <div className="relative flex items-end lg:items-center bg-black bg-top bg-no-repeat bg-cover h-[90vh] lg:h-[80vh] text-white">
      <div className="w-full flex flex-col items-center md:mt-16 py-0 px-[4vw] pb-[10vh] z-10 lg:items-start lg:pb-none ">
        <div className="bg-gray-700 h-9 w-1/2 md:w-1/4 rounded-md animate-pulse"></div>
        <div className="flex justify-center md:justify-start gap-2 ml-0 mt-[4vh] w-full md:w-1/2">
          <div className="bg-gray-700 h-12 animate-pulse w-[30%] rounded-md"></div>
          <div className="bg-gray-700 h-12 animate-pulse w-[30%] rounded-md"></div>
        </div>
        <div className="bg-gray-700 h-3 w-1/2 rounded animate-pulse mt-5"></div>
        <div className="bg-gray-700 h-3 w-1/4 rounded animate-pulse mt-3"></div>
        <div className="bg-gray-700 h-3 w-1/3 rounded animate-pulse mt-3"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-[25vh] z-0 bg-gradient-to-b from-[#141414] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
}
