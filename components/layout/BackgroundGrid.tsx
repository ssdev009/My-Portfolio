/** Fixed neon background: grid + two blurred glows + subtle noise. */
export function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div className="bg-grid absolute inset-0" />
      <div className="neon-orb absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-cyan/20 blur-[140px]" />
      <div className="neon-orb absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-magenta/20 blur-[140px]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
