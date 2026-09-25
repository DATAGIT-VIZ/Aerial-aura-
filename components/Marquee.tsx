const categories = ['Weddings', 'Real Estate', 'Freestyle', 'Cinematic', 'Brand Films'];

export default function Marquee() {
  const items = [...categories, ...categories]; // doubled for seamless loop

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((cat, i) => (
          <span key={i}>{cat}</span>
        ))}
      </div>
    </div>
  );
}
