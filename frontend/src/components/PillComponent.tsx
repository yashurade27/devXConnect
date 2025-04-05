const PillComponent = () => {
  return (
    <div className="relative flex items-center justify-center px-3 py-1 text-sm text-white rounded-full">
      <span className="relative z-8">Synced by Stack</span>

      {/* Gradient Border Effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          padding: "2px", // Creates space for the border
          background: "linear-gradient(90deg, #3A9FFF, #B530FF)", // Gradient border
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        }}
      />
    </div>
  );
};

export default PillComponent;
