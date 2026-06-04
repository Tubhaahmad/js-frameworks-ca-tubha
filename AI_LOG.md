# AI Usage Log (AI_LOG.md)

> Note: AI was used for debugging errors, support, and explaining concepts. I implemented the final code changes.

**Tool used:** ChatGPT  
**Date:** 19 February 2026  
**Purpose:** Fix project setup mistake where TanStack Query was installed in the wrong directory, creating extra node_modules and package.json outside the Next app.  
**Outcome:** Identified the correct working directory, reinstalled dependencies inside the Next project, and removed accidental files/folders in the parent directory.

**Tool used:** ChatGPT  
**Date:** 19 February 2026  
**Purpose:** Compare App Router vs Pages Router for a beginner student and decide which to use.  
**Outcome:** Chose App Router because it matches the create-next-app template, and learned the basic mental model: layouts + pages + nested routes.

**Tool used:** ChatGPT  
**Date:** 23 February 2026  
**Purpose:** Debug why product data wasn’t showing (stuck on loading / blank screen) by isolating issues using incremental tests and a debug UI for React Query state.  
**Outcome:** Learned a step-by-step debugging workflow (test a simple page, test React Query, then test the API call). Found a missing return and fixed data rendering.

**Tool used:** ChatGPT  
**Date:** 23 February 2026  
**Purpose:** Resolve deployment issues on Vercel (404 NOT_FOUND and “No Next.js version detected”) by identifying build failures and incorrect repo/deployment source.  
**Outcome:** Learned to verify deployment problems using `npm run build` locally, fixed “page.tsx is not a module” errors by ensuring routes exported components, and understood how Vercel Git connections/old deployments affect production output.

**Tool used:** ChatGPT  
**Date:** 23 February 2026  
**Purpose:** Understand Vercel deployment diagnostics (difference between request logs vs build logs) and fix repeated 404 issues.  
**Outcome:** Learned to prioritize build logs, confirm which repo/commit was being cloned, and ensure the correct Root Directory contained the `package.json` with the Next.js dependency.

**Tool used:** ChatGPT  
**Date:** 4–5 March 2026  
**Purpose:** Debug the Product Details page in Next.js App Router.  
**Difficulties:** The dynamic route param `id` was undefined, causing repeated requests to `/online-shop/undefined` (400). The page file also became messy due to variables and code outside the component.  
**Outcome:** Understood how params work in `app/product/[id]/page.tsx`, used `useParams()` correctly in a Client Component, and added a guard (`enabled: !!id`) to prevent invalid fetches. Cleaned up the component structure with loading/error states and required UI elements.

**Tool used:** ChatGPT  
**Date:** 6 March 2026  
**Purpose:** Understand `.reduce()` for totals and counters (cart count and total cost).  
**Outcome:** Practiced writing `reduce((total, item) => total + item.quantity, 0)` and used the same idea to compute total price.

**Tool used:** ChatGPT  
**Date:** 6 March 2026  
**Purpose:** Practice strict TypeScript by defining a safe union type for sorting options.  
**Outcome:** Implemented `type SortOption = "recommended" | "price-low" | "price-high" | "rating-high"` and used it in state + `<select>` so invalid values are prevented.

**Tool used:** ChatGPT  
**Date:** 6 March 2026  
**Purpose:** Get guidance on building a Contact form with TypeScript validation and a Next.js Route Handler for form submission.  
**Outcome:** Understood how to validate form state in strict TypeScript (name/subject/email/message rules) and then implemented the form with clear error messages. Added `app/api/contact/route.ts` so POST requests to `/api/contact` work locally
