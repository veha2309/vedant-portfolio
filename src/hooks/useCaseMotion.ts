import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useCaseMotion(root:RefObject<HTMLElement|null>,slug:string|undefined) {
 useLayoutEffect(()=>{
  if(!root.current) return;
  let alive=true;
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion:no-preference)",()=>{
   const ctx=gsap.context(()=>{
    gsap.from(".case h1,.case-lead,.case .actions",{y:35,duration:.7,stagger:.07,ease:"power3.out",clearProps:"transform"});
    gsap.fromTo(".case-object",{y:35,rotation:4},{y:-20,rotation:0,ease:"none",scrollTrigger:{trigger:".case-image",start:"top bottom",end:"bottom top",scrub:.5}});
    gsap.utils.toArray<HTMLElement>(".case-section,.companion").forEach(section=>gsap.from(section,{y:25,duration:.6,clearProps:"transform",scrollTrigger:{trigger:section,start:"top 90%",once:true}}));
   },root);
   return ()=>ctx.revert();
  });
  void document.fonts.ready.then(()=>{if(alive) ScrollTrigger.refresh();});
  return ()=>{alive=false;media.revert();};
 },[root,slug]);
}
