import { useEffect, useState } from "react";

const endpoint = "https://my-portfolio-jade-rho-86.vercel.app/api/visitors?site=portfolio";
const visitKey = "visitor-count:portfolio";
let request: Promise<number | null> | undefined;

async function loadCount() {
  const day = new Date().toISOString().slice(0, 10);
  let record = false;
  try {
    record = localStorage.getItem(visitKey) !== day;
    if (record) localStorage.setItem(visitKey, day);
  } catch {
    // If browser storage is unavailable, read the total without recording a visit.
    record = false;
  }

  try {
    const response = await fetch(endpoint, {
      method: record ? "POST" : "GET",
      credentials: "omit",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const { count } = await response.json();
    return Number.isSafeInteger(count) && count >= 0 ? Number(count) : null;
  } catch {
    return null;
  }
}

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    request ??= typeof navigator.locks?.request === "function"
      ? navigator.locks.request(visitKey, loadCount).then(value => Promise.resolve(value), () => loadCount())
      : loadCount();
    void request.then(value => { if (active) setCount(value); });
    return () => { active = false; };
  }, []);

  if (count === null) return null;
  return <p className="footer-visitor-count">{count.toLocaleString()} {count === 1 ? "visit" : "visits"}</p>;
}
