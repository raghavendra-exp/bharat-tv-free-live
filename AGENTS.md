# Repository guidance
- Keep user profile fields in `public.profiles` and authorization roles in `public.user_roles`; only trusted, verified identity checks may grant roles so sign-up cannot self-elevate.
- Extend the existing Vite build-time prerender plugin for crawlable route pages so static search crawlers receive route-specific content while the React router remains the interactive source.