const RoutePath = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 700"
      preserveAspectRatio="none"
    >
      <path
        d="M100,540 Q 350,360 600,180"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3"
        className="animate-pulse"
      />

      <path
        d="M100,540 Q 360,420 600,220"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="2"
        strokeDasharray="8 5"
      />

      <circle cx="100" cy="540" r="6" fill="#3B82F6" />

      <circle cx="600" cy="180" r="6" fill="#EF4444" />
    </svg>
  );
};

export default RoutePath;