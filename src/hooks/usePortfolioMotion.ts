import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function usePortfolioMotion(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({ all:"all", desktop:"(min-width:1024px) and (min-height:760px)", reduced:"(prefers-reduced-motion:reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const element = root.current;
      if (!element) return;
      const scene = element.querySelector<HTMLElement>(".portfolio-film");
      const panels = gsap.utils.toArray<HTMLElement>(".film-panel", element);
      const chapters = panels.slice(1);
      const links = Array.from(element.querySelectorAll<HTMLAnchorElement>(".story-jumps a"));
      if (!scene) return;
      let cleanup = () => {};
      const ctx = gsap.context(() => {
        gsap.from(".hero-copy h1 > span", { y:60, duration:.9, stagger:.1, ease:"power3.out", clearProps:"transform" });
        gsap.utils.toArray<HTMLElement>(".toolkit-node,.experience-stop,.personal-note").forEach(item => {
          gsap.from(item, { y:45, duration:.7, ease:"power2.out", clearProps:"transform", scrollTrigger:{ trigger:item,start:"top 90%",once:true } });
        });
        if (!context.conditions?.desktop) {
          const activeChapter = (index:number) => {
            links.forEach((link,i)=>{
              if(i===index) link.setAttribute("aria-current","step");
              else link.removeAttribute("aria-current");
            });
            const nav=element.querySelector<HTMLElement>(".story-jumps");
            const link=links[index];
            if(nav&&link&&nav.scrollWidth>nav.clientWidth) nav.scrollTo({left:Math.max(0,link.offsetLeft-nav.offsetLeft-(nav.clientWidth-link.offsetWidth)/2),behavior:"smooth"});
          };
          chapters.forEach((chapter,index) => {
            const tl=gsap.timeline({scrollTrigger:{trigger:chapter,start:"top 85%",end:"bottom 30%",scrub:.45,
              onToggle:self=>{if(self.isActive)activeChapter(index);}}});
            tl.fromTo(chapter.querySelector(".chapter-image"),{y:55,scale:.9,rotation:index%2 ? -5 : 5},{y:-18,scale:1,rotation:0,ease:"none",duration:1},0)
              .fromTo(chapter.querySelector(".chapter-intro"),{x:18},{x:0,ease:"none",duration:.5},0)
              .fromTo(chapter.querySelector(".chapter-decision"),{y:28},{y:0,ease:"none",duration:.6},.15);
          });
          gsap.fromTo(".opening-art",{y:0},{y:-45,rotation:-3,ease:"none",scrollTrigger:{trigger:".story-opening",start:"top top",end:"bottom top",scrub:.4}});
          gsap.fromTo(".film-progress span",{scaleX:0},{scaleX:1,ease:"none",scrollTrigger:{trigger:".projects",start:"top 60%",end:"bottom 60%",scrub:true}});
          gsap.utils.toArray<HTMLElement>(".toolkit-line").forEach((line,index)=>gsap.fromTo(line,{x:index%2 ? 22 : -22},{x:0,ease:"none",scrollTrigger:{trigger:".story-toolkit",start:"top 90%",end:"top 20%",scrub:.5}}));
          gsap.fromTo(".story-about .portrait",{y:20},{y:-15,ease:"none",scrollTrigger:{trigger:".story-about",start:"top bottom",end:"bottom 25%",scrub:.5}});
          cleanup=()=>links.forEach(link=>link.removeAttribute("aria-current"));
          return;
        }
        scene.classList.add("is-film");
        const track = scene.querySelector(".film-track");
        const opening = panels[0];
        const heroDuration = 1.6;
        const chapterDuration = 1.6;
        const travelDuration = chapters.length * chapterDuration;
        const totalDuration = travelDuration + .8;
        let active = -1;
        const activate = (index:number) => {
          if (active === index) return;
          active = index;
          panels.forEach((panel,i) => {
            panel.toggleAttribute("inert", i !== index);
            if (i !== index) panel.setAttribute("aria-hidden","true");
            else panel.removeAttribute("aria-hidden");
          });
          links.forEach((link,i) => {
            if (i === index - 1) link.setAttribute("aria-current","step");
            else link.removeAttribute("aria-current");
          });
        };
        activate(0);
        const work = element.querySelector<HTMLElement>("#work");
        const journey = gsap.timeline({scrollTrigger:{
          id:"portfolio-film", trigger:scene,start:"top top+=90",end:()=>"+="+innerHeight*8,
          pin:true,scrub:.55,anticipatePin:1,invalidateOnRefresh:true,
          onUpdate:self => {
            const time = self.progress * totalDuration;
            activate(Math.min(5,Math.max(0,Math.floor((time + .8)/chapterDuration))));
          },
          onRefresh:self => {
            work?.setAttribute("data-story-scroll",String(self.start+(self.end-self.start)*heroDuration/totalDuration));
            chapters.forEach((chapter,index)=>chapter.setAttribute("data-story-scroll",String(self.start+(self.end-self.start)*(heroDuration+index*chapterDuration)/totalDuration)));
          },
        }});
        journey.to(track,{xPercent:-100/6*chapters.length,duration:travelDuration,ease:"none"},0)
          .to(opening.querySelector(".hero-copy"),{xPercent:-15,y:-60,rotation:-5,duration:heroDuration,ease:"none"},0)
          .to(opening.querySelector(".opening-art"),{x:-100,rotation:12,scale:1.2,duration:heroDuration,ease:"none"},0)
          .to(opening.querySelector(".opening-browser"),{rotation:-25,y:-80,duration:heroDuration,ease:"none"},0)
          .to(opening.querySelector(".opening-phone"),{rotation:22,y:40,duration:heroDuration,ease:"none"},0);
        journey.to(opening.querySelectorAll(".name-letter"),{yPercent:(index)=>index%2 ? 20 : -35,rotation:(index)=>index%2 ? 5 : -5,stagger:.025,duration:heroDuration-.4,ease:"none"},0);
        chapters.forEach((chapter,index) => {
          const at = heroDuration + index*chapterDuration;
          const image = chapter.querySelector(".chapter-image");
          const intro = chapter.querySelector(".chapter-intro");
          const decision = chapter.querySelector(".chapter-decision");
          const echo = chapter.querySelector(".chapter-echo");
          const direction = index % 2 ? -1 : 1;
          journey.fromTo(image,{scale:index<2 ? .7 : .82,y:140,rotation:direction*18},{scale:1,y:0,rotation:direction*-3,duration:.8,ease:"power3.out"},at-.8)
            .to(image,{scale:index<2 ? 1.12 : 1.06,y:-85,rotation:direction*-12,duration:.8,ease:"none"},at)
            .fromTo(intro,{x:140,y:40},{x:-100,y:-20,duration:chapterDuration,ease:"none"},at-.8)
            .fromTo(echo,{x:180,y:70,rotation:-12},{x:-120,y:-50,rotation:10,duration:chapterDuration,ease:"none"},at-.8)
            .fromTo(decision,{y:85,autoAlpha:0},{y:0,autoAlpha:1,duration:.6,ease:"power2.out"},at-.65)
            .fromTo(chapter.querySelector(".chapter-watermark"),{y:100,scale:.8},{y:-50,scale:1.1,duration:chapterDuration,ease:"none"},at-.8)
            .fromTo(chapter.querySelector(".chapter-capabilities"),{y:30},{y:0,duration:.6,ease:"power2.out"},at-.5);
        });
        journey.to(".film-progress span",{scaleX:1,duration:totalDuration,ease:"none"},0);
        gsap.set(".film-progress span",{scaleX:0});
        const moveTo = (index:number, smooth:boolean) => {
          const trigger = journey.scrollTrigger;
          if (!trigger) return;
          const time = heroDuration + index*chapterDuration;
          window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*time/totalDuration,behavior:smooth ? "smooth" : "instant"});
        };
        const jump = (event:Event) => {
          const target = (event.target as HTMLElement).closest<HTMLAnchorElement>(".story-jumps a");
          if (!target) return;
          const index=links.indexOf(target);
          if (index<0) return;
          event.preventDefault();
          moveTo(index,true);
        };
        const indexNav=element.querySelector(".story-jumps");
        indexNav?.addEventListener("click",jump);
        cleanup=()=>{
          indexNav?.removeEventListener("click",jump);
          scene.classList.remove("is-film");
          work?.removeAttribute("data-story-scroll");
          chapters.forEach(chapter=>chapter.removeAttribute("data-story-scroll"));
          panels.forEach(panel=>{panel.removeAttribute("inert");panel.removeAttribute("aria-hidden");});
          links.forEach(link=>link.removeAttribute("aria-current"));
        };
        gsap.to(opening.querySelector(".opening-sculpture"),{rotation:-35,scale:1.4,x:-150,ease:"none",scrollTrigger:{trigger:scene,start:"top top+=90",end:()=>"+="+innerHeight*1.5,scrub:.5}});
        gsap.fromTo(".story-toolkit",{scale:.94,borderRadius:70},{scale:1,borderRadius:0,ease:"none",scrollTrigger:{trigger:".story-toolkit",start:"top bottom",end:"top 20%",scrub:.6}});
        gsap.utils.toArray<HTMLElement>(".toolkit-line").forEach((line,index)=>gsap.fromTo(line,{x:index%2 ? 100 : -100},{x:0,ease:"none",scrollTrigger:{trigger:".story-toolkit",start:"top 90%",end:"top 25%",scrub:.5}}));
        gsap.utils.toArray<HTMLElement>(".skill-word").forEach((word,index)=>gsap.from(word,{y:25,duration:.6,delay:(index%5)*.025,clearProps:"transform",scrollTrigger:{trigger:word,start:"top 90%",once:true}}));
        gsap.fromTo(".about-title",{x:-60},{x:0,ease:"none",scrollTrigger:{trigger:".story-about",start:"top bottom",end:"top 30%",scrub:.5}});
        const footerHeading=document.querySelector("footer h2");
        if(footerHeading) gsap.from(footerHeading,{y:75,duration:.8,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger:footerHeading,start:"top 90%",once:true}});
        gsap.fromTo(".story-about .portrait",{y:50,rotation:-3},{y:-20,rotation:0,ease:"none",scrollTrigger:{trigger:".story-about",start:"top bottom",end:"bottom top",scrub:.5}});
      },element);
      return ()=>{ctx.revert();cleanup();};
    });
    let alive=true;
    void document.fonts.ready.then(()=>{if(alive) ScrollTrigger.refresh();});
    return ()=>{alive=false;media.revert();};
  },[root]);
}
