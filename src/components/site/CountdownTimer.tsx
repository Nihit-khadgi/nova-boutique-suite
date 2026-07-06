import { useEffect, useState } from "react";

const target = () => {
  const d = new Date();
  d.setHours(d.getHours() + 12);
  d.setMinutes(0, 0, 0);
  return d.getTime();
};

export function CountdownTimer() {
  const [end] = useState(target);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const parts = [
    { label: "Hours", val: h },
    { label: "Minutes", val: m },
    { label: "Seconds", val: s },
  ];

  return (
    <div className="flex gap-3">
      {parts.map((p) => (
        <div
          key={p.label}
          className="min-w-[64px] rounded-2xl bg-background/10 px-3 py-2 text-center backdrop-blur"
        >
          <div className="font-display text-3xl tabular-nums">
            {String(p.val).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-70">{p.label}</div>
        </div>
      ))}
    </div>
  );
}
