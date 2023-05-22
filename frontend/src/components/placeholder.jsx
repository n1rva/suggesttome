function Placeholder() {
  return (
    <div className="flex items-center space-x-3 my-8 md:space-x-5 md:my-12 animate-pulse">
      <div className="self-start bg-slate-400 rounded-sm w-24 h-[120px] md:w-36 md:h-[150px]"></div>
      <div className="w-full">
        <h2 className="w-1/2 h-4 mb-3 rounded-md bg-slate-400 md:h-5"></h2>
        <p className="w-full h-3 mr-4 bg-slate-400 rounded-md md:h-4"></p>
        <p className="w-3/4 h-3 mr-4 mt-2 bg-slate-400 rounded-md md:h-4"></p>
      </div>
    </div>
  );
}

export default Placeholder;
