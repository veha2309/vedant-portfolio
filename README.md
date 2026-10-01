# Vedant Shukla — Personal Portfolio

Independent, frontend-only React + TypeScript + Vite portfolio. No API, authentication, CMS, or backend environment variables.

## Develop

`npm ci` then `npm run dev`. Build with `npm run build`, lint with `npm run lint`, test with `npm run test:e2e`.

## Update content

Edit `src/data/project.ts`, `experience.ts`, or `skills.ts`. Components and styles are in `src`. Push to `main` to trigger the connected Vercel production build.

## Hosting

Vercel: Vite framework, build `npm run build`, output `dist`. SPA rewrites support direct case-study URLs. Project name: `vedant-portfolio`. No secrets required.

The studio link points to its existing verified production alias, https://my-portfolio-jade-rho-86.vercel.app. Studio rebranding is currently local-only. Product illustrations are labeled and are not screenshots.

## Production

https://vedant-portfolio-seven-orcin.vercel.app

Vercel is connected to `veha2309/vedant-portfolio`, production branch `main`. Studio repository: `veha2309/vedant-digital-studio`.

Run production browser checks with `PORTFOLIO_TEST_URL` set to the production URL, then `npm run test:e2e`.
