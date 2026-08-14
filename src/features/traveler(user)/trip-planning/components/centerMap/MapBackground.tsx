interface MapBackgroundProps {
  isDarkMode: boolean;
}

const MapBackground = ({ isDarkMode }: MapBackgroundProps) => {
  return (
    <>
      <div
        className={`absolute inset-0 top-[64px] bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071')] bg-cover bg-center transition-all duration-300 ${
          isDarkMode
            ? "opacity-40 grayscale contrast-125"
            : "opacity-100 grayscale-0"
        }`}
      />

      <div
        className={`absolute inset-0 top-[64px] transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-b from-[#0A1222]/50 via-transparent to-[#0A1222]/50"
            : "bg-gradient-to-b from-white/10 via-transparent to-white/10"
        }`}
      />
    </>
  );
};

export default MapBackground;