import { useEffect, useState } from "react";

const endpoint = "https://my-portfolio-jade-rho-86.vercel.app/api/visitors?site=portfolio";
type Totals = { visitors: number; visits: number };
let request: Promise<Totals | null> | undefined;

async function loadCount() {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "omit",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const { visitors, visits } = await response.json();
    if (!Number.isSafeInteger(visitors) || visitors < 0 || !Number.isSafeInteger(visits) || visits < 0) return null;
    return { visitors, visits };
  } catch {
    return null;
  }
}

export default function VisitorCount() {
  const [totals, setTotals] = useState<Totals | null>(null);
  useEffect(() => {
    let active = true;
    request ??= loadCount();
    void request.then(value => { if (active) setTotals(value); });
    return () => { active = false; };
  }, []);

  if (!totals) return null;
  return <p className="footer-visitor-count">
    {totals.visitors.toLocaleString()} {totals.visitors === 1 ? "visitor" : "visitors"}
    {" · "}
    {totals.visits.toLocaleString()} {totals.visits === 1 ? "visit" : "visits"}
  </p>;
}
