interface ZoomControlsProps {
  isDarkMode: boolean;
}

const ZoomControls = ({ isDarkMode }: ZoomControlsProps) => {
  return (
    <div className="absolute bottom-20 lg:bottom-8 right-3 sm:right-5 z-10 flex flex-col">
      <button
        type="button"
        className={`w-9 h-9 sm:w-10 sm:h-10 border rounded-t-xl text-lg sm:text-xl transition-colors ${
          isDarkMode
            ? "bg-[#101B2D]/95 border-[#243650] text-slate-100 hover:bg-[#1A2940]"
            : "bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50"
        }`}
      >
        +
      </button>

      <button
        type="button"
        className={`w-9 h-9 sm:w-10 sm:h-10 border-x border-b rounded-b-xl text-lg sm:text-xl transition-colors ${
          isDarkMode
            ? "bg-[#101B2D]/95 border-[#243650] text-slate-100 hover:bg-[#1A2940]"
            : "bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50"
        }`}
      >
        −
      </button>
    </div>
  );
};

export default ZoomControls;