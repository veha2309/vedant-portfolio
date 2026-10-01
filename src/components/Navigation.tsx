import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
const links = [
  ["Home", "top"],
  ["Work", "work"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["About", "about"],
  ["Contact", "contact"],
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const targets = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ];
    targets.forEach((el) => el?.setAttribute("inert", ""));
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const elements = [
        toggle.current,
        ...Array.from(
          panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        ),
      ].filter((el): el is HTMLButtonElement | HTMLAnchorElement => !!el);
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = previous;
      targets.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", keys);
    };
  }, [open]);
  useLayoutEffect(() => {
    if (!open) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(
        () =>
          gsap.from(".menu-panel nav a", {
            y: 28,
            opacity: 0,
            duration: 0.45,
            stagger: 0.045,
            clearProps: "all",
          }),
        panel,
      );
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [open]);
  return (
    <header className="portfolio-header">
      <Link
        className="wordmark"
        to="/"
        aria-label="vs. — Vedant Shukla home"
        onClick={() => setOpen(false)}
      >
        v<span>s.</span>
      </Link>
      <Link
        className="header-connect"
        to="/#contact"
        onClick={() => setOpen(false)}
      >
        <i />
        Open to opportunities ↗
      </Link>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open && (
        <div ref={panel} id="portfolio-menu" className="menu-panel">
          <nav aria-label="Main navigation">
            {links.map(([title, id], index) => (
              <Link
                key={id}
                to={`/#${id}`}
                onClick={() => {
                  setOpen(false);
                  toggle.current?.focus();
                }}
              >
                <span>0{index + 1}</span>
                {title}
                <span>↗</span>
              </Link>
            ))}
          </nav>
          <p>
            VEDANT SHUKLA
            <br />
            WEB & MOBILE ENGINEERING / NEW DELHI
          </p>
        </div>
      )}
    </header>
  );
}
