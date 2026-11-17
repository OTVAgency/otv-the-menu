# OTV The Menu — Concept Preview

Big Cory / OTV Agency digital product storefront for solopreneurs and AI beginners.

## Current experience

One full-viewport wall is fixed behind the entire page: hero, product shelf, bundle, guide signup and footer. The page scrolls normally over it. Desktop scroll progress controls the clean-start graffiti reveal using queued video seeks. Touch/narrow screens use a bounded HD image-frame renderer with neighboring-frame blending, so iPhone Safari does not need to preload or start a background video. Mobile paints over the first short scroll section, then keeps the completed mural fixed. Its web export is 1920 x 1080 at 60fps, derived from a 3840 x 2160 finishing master. At the end, the finished 4K still replaces the paused video. Reduced motion and video errors also use that still.

Four matching printed 7g packs: AI Za, Hustle Haze, Content Kush and Paperwork OG. New reference-matched fronts and Product Facts backs use bold brush lettering, realistic foil and color accents. The opening videos are generated from the finished printed fronts, replacing the former separately tracked lettering. The web versions are 1080 x 1440 at 60fps.

Click/tap/Enter/Space opens a pack, tears the top, opens its mouth and shows its contents. After opening, Flip to back turns the pouch over in the same view; Back to front returns to the opened front. Read the label also shows the physical back photograph plus readable HTML Product Facts. Back artwork remains a draft until buyer outcomes, deliverables and supportable value claims are agreed. Pause, replay, skip, native dialogs, Escape/focus restoration and still fallbacks are retained. Whole Zip includes all four and 28 prompts.

Names, final downloads and prices remain under development. Signup has no endpoint or storage and sends nothing; checkout is not connected.

## Local preview and hosting

Buildless HTML/CSS/JavaScript; no runtime dependency or installation. No package manager, configured lint or test suite. Use a byte-range-capable static server for local media seeking checks.

GitHub Pages serves main from the repository root. Relative assets; no custom domain.

https://otvagency.github.io/otv-the-menu/

## Media and production records

Current production files are in media/ with v3/HD names; earlier assets remain preserved. Full-size PNG front/back art, source movies, quotes/prompts, rejected/replacement attempt record and QA are saved in the OTV Agency product folder.

Copyright 2026 On The Verge LLC. All rights reserved.

## Mobile presentation

The scroll instruction text is removed. Mobile pack photos use a website-only SVG silhouette to remove the rectangular studio backdrop without changing the approved printed art. Photo, caption and text-card backgrounds are transparent on narrow screens. Keyboard focus styling and the opening/flip interactions remain. The frame renderer loads at most three images concurrently and retains only nearby decoded frames; WebP has a JPEG fallback. Desktop video and reduced-motion stills are preserved. No new dependency or artwork generation.
