export function SkeletonCard() {
  return (
    <div className="bg-white border border-[#dad4c8] rounded-3xl overflow-hidden animate-pulse"
      style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}>
      <div className="bg-[#eee9df] h-56 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#eee9df] rounded-full w-1/3" />
        <div className="h-5 bg-[#dad4c8] rounded-full w-3/4" />
        <div className="h-4 bg-[#eee9df] rounded-full w-full" />
        <div className="h-4 bg-[#eee9df] rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-[#dad4c8] rounded-full w-1/4" />
          <div className="h-9 bg-[#dad4c8] rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
}
