export default function HeroDrone() {
  return (
    <div className="drone-anchor" aria-hidden="true">
      <div className="drone-bob">
        <video
          className="drone-video"
          src="/video/drone.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
