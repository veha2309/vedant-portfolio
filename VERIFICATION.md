# Verification — 1 October 2026

- Production build and ESLint pass.
- 9 Playwright checks pass: five case-study routes/reloads, contact and external prompts, 404 recovery, five viewport widths, reduced motion, keyboard skip link.
- Initial JavaScript: 137.78 KB gzip (target <200 KB).
- Local Lighthouse 13.5 simulated mobile, headless Chrome, Vite production preview: performance 98, accessibility 100, best practices 100, SEO 100, LCP 2278 ms, CLS 0, TBT 31.5 ms. All requested performance targets met in this lab run. Production results may vary.
- Original SEO score 92: added valid robots.txt to resolve SPA fallback serving HTML at /robots.txt.
- Portrait remains exclusively in About. All five engineering projects are present, with Mahila Mitr fifth and its private chat and supporting admin panel documented.
- No API, feedback, quotes, authentication, backend environment variables, or server code included.

Reference: https://www.meermohsin.me/ — oversized typography, staggered project compositions, and native-scroll GSAP image movement adapted to the approved light palette. No third-party assets or claims copied.

- Scroll profile: headless desktop Chrome, 1440×1000, no CPU throttling, eight-second scripted native scroll; p95 frame interval 17.4 ms, no frames over 50 ms, no long tasks and no runtime errors.

- First GitHub-triggered production deployment READY: commit 2b99940; https://vedant-portfolio-seven-orcin.vercel.app. All nine browser scenarios pass against production, including case-study reloads and local image loading.

- Subsequent GitHub push e1051f8 produced a second READY production deployment. All five public case-study routes and the recovery page returned successfully, with correct titles and zero runtime errors.
- Domain check: interportfolio.vercel.app now aliases the personal portfolio. The studio link uses the independently verified existing studio alias my-portfolio-jade-rho-86.vercel.app to avoid linking back to the portfolio. No studio deployment was created.

## Reference composition pass — 1 October 2026

Local-only changes in the moved checkout at C:/Users/HP/Desktop/vedant/personal-portfolio. Based on https://www.meermohsin.me/, retaining the approved light palette, original project imagery and About-only portrait. Layered name/imagery composition, accessible full-screen menu, alternating full-size project chapters, and desktop scroll choreography capped at 0.8 viewport. Short desktop windows and mobile remain unpinned. Reduced motion immediately displays content.

Build and lint pass; all 10 browser scenarios pass, including full-screen menu focus containment, Escape, navigation, five viewport widths, case-study reloads, Back, local media, and link prompts. Reduced-motion/menu checks rerun after the final hero animation adjustment.

Final local mobile Lighthouse 13.5/headless Chrome/default simulated throttling: performance 97, accessibility/best-practices/SEO 100, LCP 2336 ms, CLS 0, TBT 25.5 ms. Initial JavaScript 139.07 KB gzip. Requested targets met in this lab run. Eight-second unthrottled desktop 1440x1000 native-scroll profile: p95 17.3 ms, no frames over 50 ms, no long tasks and no runtime errors. This iteration has not been pushed or deployed.


## Engineering storytelling rebuild — 1 October 2026

Replaced the studio-like homepage with an engineering journal: personal introduction, Complexity/Clarity perspective, five question-to-decision project chapters, a connected toolkit, experience and education timeline, and an About spread. Portrait remains only in About. Existing factual project data, five case-study routes and email/external confirmations remain in use.

Desktop perspective and project scenes use native-scroll GSAP choreography, pinned for 0.6 and 0.7 viewport respectively. Mobile and short desktop windows are unpinned; reduced motion immediately exposes all content. Each project includes a scroll progress indicator and coordinated imagery/copy movement. No perpetual motion or pointer-driven effects.

Production build and lint pass. All 11 Playwright scenarios pass, covering routes/reloads, Back, anchors, contact prompts, keyboard/menu focus, local media, reduced motion and overflow at 360, 390, 768, 1024 and 1440 px. The new motion test verifies image transforms change in FinanceFlow, Vision Assistant and Mahila Mitr scenes, with pinning removed under reduced motion. Desktop and mobile screenshots were inspected.

Final Lighthouse 13.5 single local lab run, default simulated mobile throttling, headless Chrome, Vite production preview: performance 98, accessibility 100, best practices 100, SEO 100; LCP 2251 ms, CLS 0, TBT 67.5 ms. Initial JavaScript 140.23 KB gzip. All requested numerical targets met under these conditions; production results may vary. Eight-second native-scroll profile at 1440x1000 without throttling: p95 frame interval 17.6 ms, zero frames over 50 ms, no long tasks and no runtime errors.

Local preview: http://127.0.0.1:4174/. This rebuild has not been committed, pushed or deployed. The studio was not modified.


## Continuous scroll sequences and separate portfolio identity — 1 October 2026

Replaced separate pins with two grouped native-scroll scenes: introduction-to-approach over two viewport lengths, followed by one persistent five-project stage over nine viewport lengths. Each project unfolds question, product illustration, engineering decision and then transitions into the next chapter without a section gap. Chapter links skip to their corresponding position in the timeline. Inactive desktop chapters are inert and hidden from assistive technology; reduced motion restores the complete readable document. Mobile and short windows retain unpinned content.

Changed the visual identity to bold Arial/Helvetica typography and monospace labels without serif accents, direct engineering copy, a skills index, chronological experience rows, and a smaller About portrait. Reduced the interlude before work to a compact chapter index. Studio files and deployment remain unchanged.

Build, lint and all 11 browser tests pass; final reduced-motion and three-beat sequence tests rerun after a visibility repair found during screenshot review. Inspected question, product and decision screenshots, mobile opening and full reduced-motion layout. Overflow checks pass at 360, 390, 768, 1024 and 1440 px.

Local Lighthouse 13.5, default simulated mobile throttling, headless Chrome, production preview: performance 99; accessibility, best practices and SEO 100; LCP 1894 ms, CLS 0, TBT 53.5 ms. Initial JavaScript 140.87 KB gzip. Eight-second desktop native-scroll profile: p95 17.6 ms, zero frames over 50 ms, no long tasks or runtime errors. All numerical targets met under these lab conditions. Final reduced-motion visibility-only CSS repair does not alter normal-motion profiling.

Local-only preview at http://127.0.0.1:4174/; no commit, push or deployment performed.


## One-canvas gallery redesign — 1 October 2026

Rebuilt Home and its motion hook around one pinned canvas containing the introduction and all five projects. Native vertical scrolling moves a horizontal track; each project uses coordinated image rotation/scale, title drift and supporting copy entrances. Continuous project index highlights the current chapter and supports skipping. Direct chapter hashes resolve to the correct timeline position, including reload. Inactive panels are inert and excluded from assistive technology. Mobile/short desktop and reduced-motion users receive a readable vertical layout.

Replaced the accumulated story CSS with a coherent ivory/cobalt identity, giant sans-serif typography, larger illustrations with varied compositions, quieter engineering notes, a two-column toolkit and compact experience/About layouts. No duplicated question/decision cards or separate opening pin remain. All local illustrations stay labeled; Mahila Mitr stays fifth and describes private chatting and its supporting web admin panel. Portrait remains in About. Studio files and live deployments are untouched.

Build and lint pass. All 12 Playwright tests pass, including direct chapter reload, continuous one-pin track movement, chapter skips/current index, all five case studies, Back, external/email prompts, mobile menu/keyboard operation, reduced motion and overflow at 360, 390, 768, 1024 and 1440 px. Desktop and mobile opening and gallery screenshots inspected.

Local Lighthouse 13.5, headless Chrome/default simulated mobile throttling/production preview: performance 99; accessibility, best practices and SEO 100; LCP 1867 ms, CLS 0, TBT 23 ms. Initial JavaScript 140.63 KB gzip. Eight-second unthrottled native desktop scroll profile: p95 17.3 ms, zero frames over 50 ms, no long tasks and no runtime errors. Final navigation offset fix is desktop-only and does not change the mobile audit. All requested numerical targets met in this lab run; field results can differ.

Local preview remains http://127.0.0.1:4174/. No commit, push or deployment performed.


## Layered artwork and continuous camera motion — 1 October 2026

Added a locally hosted Bricolage Grotesque display font from Google Fonts, with its SIL OFL license retained. Latin subset and fixed optical/width axes reduce the WOFF asset to 42,608 bytes. Supporting copy remains a readable system sans. Created transparent browser/phone SVG derivatives from existing local product illustrations; labels remain visible and no screenshots or capabilities are invented. Reserved dimensions match each derivative. Hero now combines outlined display type and layered product objects. Project scenes use independent titles, primary objects, decorative echoes, fixed colour washes and supporting engineering notes. Toolkit is a typographic index; About retains the original portrait.

Changed the horizontal camera from separate eased steps to continuous native-scroll travel. Hero artwork, project objects, titles, background echoes and chapter numbers move independently with controlled transform/opacity choreography. A single desktop pin spans eight viewport scroll lengths. Chapter skips and direct hashes land at the readable centre of each composition. Mobile/short windows remain unpinned; reduced motion restores all content immediately. No pointer calculations, perpetual loops or full-screen blur were added.

Final build and ESLint pass; all 12 browser tests pass, covering the connected track, chapter index/skips/reloads, case studies, Back, anchors, keyboard/menu focus, external/email prompts, reduced motion and overflow at 360, 390, 768, 1024 and 1440 px. Desktop/mobile screenshots inspected; fixed an artwork aspect-ratio issue and heading spacing after review. Motion recording: artifacts/portfolio-motion.webm.

Final Lighthouse 13.5 local headless Chrome/default simulated mobile throttling/production preview: performance 98; accessibility/best practices/SEO 100; LCP 2178 ms, CLS 0, TBT 23 ms. Initial JavaScript 140.81 KB gzip. Latest eight-second unthrottled 1440x1000 native-scroll profile: p95 frame interval 17.5 ms, zero frames over 50 ms, no long tasks or runtime errors. All requested numerical targets met under these lab conditions.

Preview: http://127.0.0.1:4174/?version=layered-motion. Local only: no commit, push or deployment. Studio unchanged.


## Project-specific art direction and complete-site refinement — 1 October 2026

Gave each engineering project a distinct composition: sage FinanceFlow, an ink StockPulse scene, sand mobile, mint assistive technology and a blush Mahila Mitr scene. Mobile and reduced-motion layouts keep the same project identities. The mobile app remains primary in Mahila Mitr; its verified supporting web image sits behind the app. Existing factual capability lists now form concise scene annotations. Added larger controlled object entrances and independent title, echo and chapter-number movement within the existing continuous gallery.

The second act is a cobalt skills chapter with coordinated typography and shape/scale transitions, followed by experience, a portrait-led About spread, and larger contact typography. No perpetual loops, pointer-driven effects, backend code or invented metrics/claims. Portrait remains only in About.

Redesigned all five case studies with larger project covers, transparent object illustrations, a section-reading index, numbered engineering decisions and next-project panels. Added a separate reduced-motion-aware GSAP hook with route cleanup, missing-root guard and font-ready refresh. Existing source/demo/email confirmation behavior remains active.

Build and ESLint pass. All 13 browser tests pass, with every engineering case study checked for overflow at 360, 390, 768, 1024 and 1440 px. Reading-index navigation, direct case reloads, gallery chapter hashes/skips, Back, prompts, keyboard/menu focus and reduced motion pass. Case navigation tests rerun after the final animation cleanup guard. Desktop/mobile screenshots inspected. Recording: artifacts/portfolio-chaptered-motion.webm; cobalt scene: artifacts/toolkit-canvas.png.

Final local Lighthouse 13.5/headless Chrome/default simulated mobile throttling/production preview: performance 98; accessibility/best practices/SEO 100; LCP 2179 ms, CLS 0, TBT 25.5 ms. Initial JavaScript 141.23 KB gzip. Latest eight-second unthrottled 1440x1000 scroll profile: p95 frame interval 17.5 ms, two isolated frames over 50 ms, no long tasks or runtime errors. Numerical targets met in this lab run; the two slow frames remain an observed limit, not a claim of flawless frame pacing. Final case-only cleanup safeguard does not change the homepage audit.

Preview: http://127.0.0.1:4174/?version=chaptered-canvas. Local only: no commit, push or deployment; studio unchanged.


## Mobile composition and active scroll choreography — 1 October 2026

Recomposed the phone opening with compact navigation, larger layered product art, readable positioning and pill actions. Added a sticky horizontally scrollable chapter rail with active chapter state and automatic centring on chapter changes. Phone artwork is larger; project notes, capabilities, skills, experience, About and contact typography now have dedicated mobile sizing. Portrait stays in About.

Added native-scroll scrubbed image rotation/scale/vertical movement, coordinated project copy movement, opening artwork drift, skills line movement and portrait travel on mobile without pinning. Fixed GSAP matchMedia conditions: the all query ensures the normal-motion mobile branch actually runs when desktop and reduced-motion queries are both false. Desktop retains its single continuous gallery and now adds staggered name-letter movement. Reduced motion restores static content. No perpetual loops or pointer-driven layout calculations.

Build and lint pass. All 14 browser tests pass, including actual mobile transform changes during scrolling, sticky chapter navigation, reduced-motion restoration, all five case studies, direct reload/Back, prompts, keyboard/menu focus and overflow at 360, 390, 768, 1024 and 1440 px. Mobile opening and project screenshots inspected. Fixed pale tag backgrounds that made StockPulse technology labels fail contrast. Recording: artifacts/mobile-scroll-story.webm.

Final local Lighthouse 13.5, headless Chrome, default simulated mobile throttling, Vite production preview: performance 98; accessibility/best practices/SEO 100; LCP 2208 ms, CLS 0, TBT 49 ms. Initial JavaScript 141.61 KB gzip. Eight-second unthrottled 1440x1000 scroll profile: p95 frame interval 17.4 ms, two frames over 50 ms, no long tasks or runtime errors. All specified numerical targets met in this lab run; field results may differ. The final contrast-only correction does not alter animation behavior.

Preview: http://127.0.0.1:4174/?version=mobile-story. Local only; no commit, push or deployment. Studio unchanged.
