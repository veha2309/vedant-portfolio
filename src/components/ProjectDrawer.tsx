import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projects, type Project } from "../data/project";

const categoryGroups: Record<string, string> = {
  "Web application": "Web applications",
  "Mobile application": "Mobile applications",
  "Accessibility / mobile": "Mobile applications",
  "Mobile app + web companion": "Mobile applications",
};
const groups = Array.from(projects.reduce((result, project) => {
  const category = categoryGroups[project.category] ?? project.category;
  const items = result.get(category);
  if (items) items.push(project);
  else result.set(category, [project]);
  return result;
}, new Map<string, Project[]>()));
const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const tileSelector = "[data-project-tile]";
type TileSnapshot = { bounds: DOMRect; opacity: string; copy: HTMLElement };

export default function ProjectDrawer() {
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const results = useRef<HTMLDivElement>(null);
  const tileLayer = useRef<HTMLDivElement>(null);
  const previousTiles = useRef<Map<string, TileSnapshot> | null>(null);
  const tileAnimations = useRef<Animation[]>([]);
  const closing = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const afterClose = useRef<(() => void) | null>(null);
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const [selected, setSelected] = useState<string | null>(null);
  const [filtering, setFiltering] = useState(false);
  const open = phase !== "closed";
  const visibleGroups = groups.filter(([category]) => !selected || category === selected);
  const visibleCount = visibleGroups.reduce((count, [,items]) => count + items.length, 0);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useLayoutEffect(() => {
    const before = previousTiles.current;
    previousTiles.current = null;
    const layer = tileLayer.current;
    const panel = dialog.current;
    if (!before || !layer || !panel || !results.current) return;

    panel.scrollTop = 0;
    const layerBounds = layer.getBoundingClientRect();
    const panelBottom = panel.getBoundingClientRect().bottom;
    const animations: Animation[] = [];
    const easing = "cubic-bezier(.22,.8,.25,1)";
    results.current.querySelectorAll<HTMLElement>(tileSelector).forEach((tile, index) => {
      const key = tile.dataset.projectTile!;
      const current = tile.getBoundingClientRect();
      const previous = before.get(key);
      before.delete(key);
      const startTop = previous ? Math.min(previous.bounds.top, Math.max(current.top, panelBottom - 24)) : current.top + 56;
      const deltaX = previous ? previous.bounds.left - current.left : 0;
      const deltaY = startTop - current.top;
      animations.push(tile.animate([
        { transform: `translate(${deltaX}px, ${deltaY}px)`, opacity: previous?.opacity ?? 0 },
        { transform: "translate(0, 0)", opacity: 1 },
      ], { duration: 460, delay: previous ? 0 : index * 24, easing, fill: "both" }));
    });

    // Keep outgoing tiles visible while their categories leave the real layout.
    before.forEach(({ bounds, opacity, copy }) => {
      Object.assign(copy.style, {
        position: "absolute",
        left: `${bounds.left - layerBounds.left}px`,
        top: `${bounds.top - layerBounds.top}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      });
      layer.append(copy);
      animations.push(copy.animate([
        { transform: "translateY(0)", opacity },
        { transform: "translateY(64px)", opacity: 0 },
      ], { duration: 320, easing: "ease-in", fill: "both" }));
    });

    tileAnimations.current = animations;
    let active = true;
    void Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (!active) return;
      animations.forEach(animation => animation.cancel());
      layer.replaceChildren();
      setFiltering(false);
    });
    return () => {
      active = false;
      animations.forEach(animation => animation.cancel());
      layer.replaceChildren();
    };
  }, [selected]);

  const finishClose = () => {
    if (!closing.current) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    dialog.current?.close();
    closing.current = false;
    setPhase("closed");
    const callback = afterClose.current;
    afterClose.current = null;
    callback?.();
  };

  const close = (callback?: () => void) => {
    if (closing.current || !dialog.current?.open) return;
    closing.current = true;
    afterClose.current = callback ?? null;
    setPhase("closing");
    if (prefersReducedMotion()) finishClose();
    else closeTimer.current = setTimeout(finishClose, 420);
  };

  const show = () => {
    closing.current = false;
    previousTiles.current = null;
    tileAnimations.current.forEach(animation => animation.cancel());
    tileLayer.current?.replaceChildren();
    setSelected(null);
    setFiltering(false);
    dialog.current?.showModal();
    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
    setPhase("open");
  };

  const filter = (category: string | null) => {
    if (category === selected || closing.current) return;
    if (prefersReducedMotion()) {
      previousTiles.current = null;
      if (dialog.current) dialog.current.scrollTop = 0;
      setFiltering(false);
    } else {
      const snapshots = new Map<string, TileSnapshot>();
      dialog.current?.querySelectorAll<HTMLElement>(tileSelector).forEach(tile => {
        const copy = tile.cloneNode(true) as HTMLElement;
        copy.removeAttribute("style");
        snapshots.set(tile.dataset.projectTile!, {
          bounds: tile.getBoundingClientRect(),
          opacity: getComputedStyle(tile).opacity,
          copy,
        });
      });
      previousTiles.current = snapshots;
      setFiltering(true);
    }
    setSelected(category);
  };

  return (
    <>
      <button className="project-drawer-trigger" type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls="project-drawer" onClick={show}>
        <span aria-hidden="true">⊞</span> All projects <span className="project-drawer-count">{projects.length.toString().padStart(2, "0")}</span>
      </button>
      <dialog
        ref={dialog} id="project-drawer" className="project-drawer" data-state={phase}
        aria-labelledby="project-drawer-title"
        onCancel={event => { event.preventDefault(); close(); }}
        onClose={() => setPhase("closed")}
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === "transform" && closing.current) finishClose();
        }}
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>("button,a[href]"))
            .filter(element => !element.closest("[inert]"));
          const first = controls[0], last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}
      >
        <div className="project-drawer-shell">
          <div className="project-drawer-top">
            <div className="project-drawer-heading">
              <div><p className="eyebrow">THE PROJECT INDEX / {projects.length.toString().padStart(2, "0")} PROJECTS</p><h2 id="project-drawer-title">All the work.</h2></div>
              <button className="project-drawer-close" type="button" onClick={() => close()} aria-label="Close projects" autoFocus>×</button>
            </div>
            <nav className="project-category-nav" aria-label="Project categories">
              <button type="button" aria-pressed={selected === null} onClick={() => filter(null)}>All <span>{projects.length.toString().padStart(2,"0")}</span></button>
              {groups.map(([category, items]) => <button key={category} type="button" aria-pressed={selected === category} onClick={() => filter(category)}>{category} <span>{items.length.toString().padStart(2, "0")}</span></button>)}
            </nav>
          </div>
          <div ref={results} className="project-drawer-groups" aria-busy={filtering}>
            <p className="project-filter-summary" role="status">{visibleCount} {visibleCount === 1 ? "project" : "projects"} / {selected ?? "All categories"}</p>
            {visibleGroups.map(([category, items]) => <section key={category} className="project-drawer-group" aria-label={category}>
              <div className="project-group-heading"><h3>{category}</h3><span>{items.length.toString().padStart(2,"0")}</span></div>
              <div className="project-drawer-grid">{items.map(project => <Link
                key={project.slug} to={`/projects/${project.slug}`} data-project-tile={project.slug}
                className={`project-index-card project-index-card--${project.tone}`}
                onClick={event => {
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  close(() => navigate(`/projects/${project.slug}`));
                }}
              >
                <div className="project-index-art"><img src={project.demos?.[0].poster ?? `/images/gallery/${project.slug}-object.svg`} alt="" width="180" height="120" loading="lazy" /></div>
                <div className="project-index-copy"><span className="eyebrow">{project.number} / {project.category}</span><h4>{project.title}</h4><p>{project.tagline}</p><span className="project-index-link">View case study <span aria-hidden="true">↗</span></span></div>
              </Link>)}</div>
            </section>)}
          </div>
          <div ref={tileLayer} className="project-drawer-tile-layer" aria-hidden="true" inert />
        </div>
      </dialog>
    </>
  );
}
