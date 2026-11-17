# Working notes — OTV The Menu

## 2026-11-13

Prepared the existing Claude concept for a GitHub Pages review link, at the owner’s request.

- Kept four packs and prices: $24.99, $74.99, $149.99, $499, $1,499.
- Renamed the top package Call the Plug, retaining The Pound as its weight.
- Updated free-sample concept to The Joint, a five-prompt side-hustle exercise.
- Added responsive viewport metadata, explicit preview status, and an upfront non-collecting form notice.
- Preserved existing mural spray and pouch flips.
- Included only referenced site artwork; excluded unused source artwork and packaging reference photos.

Pending: refine paid inclusions, create and verify actual products, approve additional motion, connect delivery/checkout only when authorized.

- Added free beginner guidance for tools, prompt context, and refining answers.
- Kept folder structures and the deeper discovery-to-proposal process in the paid Zip; Startup Kush introduces basic quotes and scopes.

## Validation and publication

- JavaScript syntax check passed with Node.
- Verified all local anchors, image files, four packs, and original prices.
- Browser loaded all seven image instances.
- Phone layout checked at 390 x 844 with no horizontal overflow; adjusted hero spacing for tagline readability.
- No package manager, lint, or test suite exists. No dependencies added.
- Repository: https://github.com/OTVAgency/otv-the-menu
- GitHub Pages configured for main / root, HTTPS, no custom domain.
- Share URL: https://otvagency.github.io/otv-the-menu/
- Verified live: HTTP 200; deployed HTML and all five artwork files match the local source byte for byte. Live page opened in Chrome with the revised offers and preview notices.
- Published site commit: 5d8f6a2d58cd11f978583067ca67a61408895dce. Pages run: https://github.com/OTVAgency/otv-the-menu/actions/runs/43518078588
- These final verification notes are local handoff updates; the published product source is unchanged.


## 2026-11-17 — 7g product layout

- Owner approved updating this same public preview with four 7g packs, Product Facts backs, Whole Zip and Free Pre-Roll. Lowercase g used.
- Replaced old pouch portraits and weight/price ladder with reusable realistic mylar art and editable labels. Four working names: AI OG, Hustle Haze, Content Kush, Paperwork OG.
- Each planned product has seven guided prompts, a simple resource and a completed example; Whole Zip contains all four and 28 prompts. Names, final files and prices remain under review.
- Added click/tap/native-button keyboard flips, seven-step outline dialogs, focus restoration, Escape close, reduced-motion support and explicit signup preview notices. No backend, checkout, subscription or outgoing communications.
- Local QA passed: JavaScript syntax; IDs and local references; all images; exactly four seven-step outlines; no form endpoint/storage. Browser checked 320, 390, 768, 1101 and default desktop widths, no horizontal overflow or clipped facts. Enter flip, Escape/focus return, bundle outline and non-submitting signup status verified. Console had no errors. No dependencies added; no configured lint/test suite.
- Deployment to existing main/root Pages preview prepared; verify live bytes and render after push.

### Live verification — 2026-11-17

Published commit 7155829120f9bc0c0d29a917e857a06f91bddea6 to the existing main/root GitHub Pages preview. Deployment succeeded: https://github.com/OTVAgency/otv-the-menu/actions/runs/44051587075 . Live URL: https://otvagency.github.io/otv-the-menu/ . HTTP 200 and exact byte matches verified for HTML and all four referenced artwork files. Chrome live render verified four products, lowercase 7g, working flip, loaded images and no horizontal overflow. Review screenshot and deployment hashes saved in Preview/2026-11-17-7g.

Pending: settle names and prices; author and buyer-test the simple prompt products and free guide; separately connect newsletter and checkout. No deployment blocker. No client messages sent.

## 2026-11-17 — approved motion integration

Owner approved both motion studies and requested wall cleanup, product names and lowercase 7g labels, and publishing both effects to this same preview.

- Created a clean unpainted wall plate using built-in image generation. Composited the approved wall motion against that plate with a paint-change matte, removing the faint starting fragments. Preserved original sources in agency records.
- Added a sticky background-wall hero, with scroll position controlling paused video seeking. Copy fades near the completed reveal. Video is all-intra-frame H.264, 3.9 MB, silent.
- Burned deterministic names, purpose labels and lowercase 7g into four color variants of the approved pouch motion. Lettering tracks the front surface in perspective through the opening. Each clip is under 0.9 MB.
- Main pouch click opens the tear/open/peek experience and then the contents. Kept Product Facts on a separate Read the label action and retained outlines and Whole Zip. Added replay, pause, skip, keyboard activation, native Escape/focus return and failure/reduced-motion stills.
- Browser QA: clean initial frame, forward/backward scroll seeking with paused video, normal completion, all four correct names/media, replay/pause/skip, Product Facts, Space/Enter, Escape and focus return. Checked 320, 390, 768 and desktop widths without horizontal overflow. Local reduced-motion fixture requested no video sources and revealed stills/contents immediately. Console clean. A range-capable local server was needed for seeking; no production workaround or new dependency.
- No changes to newsletter/checkout behavior; no subscriptions, sending or client notifications. Names/prices/downloads remain under review. No configured lint/test suite; JS syntax, HTML/reference and media decode checks run.
- Deploy prepared for existing main/root Pages site. Final live hash, range and UI verification follows publication.

### Motion preview live verification — 2026-11-17

Published commit 89dd0cf2aa3fb3bf1ced422bc3f4ffbb2743033f to https://otvagency.github.io/otv-the-menu/ . Pages deployment succeeded: https://github.com/OTVAgency/otv-the-menu/actions/runs/44169680253 . Verified all 20 requested HTML/CSS/JS/media/image files return HTTP 200 and match local bytes. A Range bytes=0-1 request on the wall video returns HTTP 206 with the correct Content-Range and two bytes.

Live Chrome check confirmed clean initial wall at time 0, scroll-driven paused seek to 2.372718 seconds at 47.7248% progress, and successful AI OG labeled pouch completion with its seven steps and contents visible. No horizontal overflow or console errors. Saved live wall and opened-pack screenshots with deployment hashes in Preview/2026-11-17-motion-site-v2. Browser left open on the live pack preview.

Completed: wall cleanup, scroll-controlled background, four tracked names/7g labels, tear/open/peek interaction, Product Facts and accessible controls, verified publication. Pending: owner refinements, final product files and pricing, and separately authorized newsletter/checkout integration. No blocker; no client messages or subscriptions created.

## 2026-11-17 — full-page fixed HD wall and AI Za packaging

Owner requested a fixed wall behind the full page, higher resolution and smoother motion. Then flagged the sliding pack label, selected the supplied bold brush/foil pack reference, requested matching fronts/backs for all packs, and settled the former AI OG name on AI Za (latest spelling, superseding AI Zaza).

- Created eight matching front/back product images with built-in image generation; preserved PNG originals and prompts. Each pack has lowercase 7g and seven prompts. Names: AI Za, Hustle Haze, Content Kush, Paperwork OG. No mascots, characters or portraits on packs.
- Generated a 3840 x 2160 wall finishing source and exported a clean-start 1920 x 1080 / 60fps website clip plus a 4K finished still. The fixed viewport background is outside the hero, behind the whole document. Removed the sticky hero pause; the page scrolls normally and the painting spans document progress. Timestamp-based easing smooths scroll changes.
- Rebuilt all four pouch animations from the finished printed fronts, eliminating the separately tracked text overlays. Full HD / 60fps web exports; resource cards visible inside. Content Kush initial job was rejected by the provider; one simpler benign product brief retry succeeded. Quotes/attempts are recorded; actual charges/refunds not verified.
- Read the label shows a matching physical back and accessible HTML facts. Kept pause/replay/skip, keyboard, Escape/focus restoration, reduced-motion and media failure stills. No runtime dependencies added.
- Checked fixed top=0 at hero, shelf and footer; document-progress seeking; 4K still at completion; all eight image texts; native video frames and physical lettering; all five Full HD/60 exports decode. JS syntax and HTML/local references checked. Browser desktop/phone completion, 320/390/768 layouts, physical backs and reduced-motion no-video behavior verified without horizontal overflow.
- Prepared deployment to the same main/root GitHub Pages preview. No changes to signup/checkout connections or client communications. Final product files/prices remain pending.

### Verified HD publication and in-view back flip — 2026-11-17

HD/packaging commit 67b409c02ba10b8f874393b8b06541a633bad937 deployed via https://github.com/OTVAgency/otv-the-menu/actions/runs/44174288098 . All 24 files matched local bytes; wall range requests returned HTTP 206. Live Chrome verified fixed top=0, 1920x1080 video, AI Za name, completed 1080x1440 opening, matching back and no errors. Clean 3840x2160/60fps archive saved as Preview/2026-11-17-fixed-hd-v3/wall-reveal-clean-4k60.mp4.

Owner requested flipping from the opened view and explicitly deferred back-art regeneration until deliverables/outcomes/value review. Added Flip to back after opening, Back to front, pressed state and face visibility. Replay resets front and hides flip during opening; skip and reduced-motion stills also flip. Browser checked front return, replay reset, skip and reduced-motion transition=0. No new artwork or generation. Product Facts/value redesign pending; hours saved require evidence. See Planning/back-value-design-next.md.

- Live follow-up caught browser cache mixing new HTML with old CSS/JS (movie ended but flip remained hidden; pack-turn computed position static). Versioned the stylesheet/script URLs to prevent mixed preview releases. No new artwork or changes to product claims.

### Final live flip verification

Published b56a3d6d0c4e3017324b156866f04405e579af5b; deployment succeeded at https://github.com/OTVAgency/otv-the-menu/actions/runs/44175924112 . Latest review URL: https://otvagency.github.io/otv-the-menu/?v=20261117-flip . Versioned HTML/CSS/JS and README matched current local bytes. Live browser verified relative pack-turn positioning, opening completion, in-view flip, loaded AI Za Product Facts back, pressed state and Back to front control, with no console errors. Browser left on the live back view. Phone/reduced-motion/replay/reset checks passed locally. Live proof saved as Preview/2026-11-17-fixed-hd-v3/live-opened-back-flip.jpg.

Back regeneration remains explicitly on hold for owner review of deliverables, outcomes and value. Do not invent hours saved. No additional artwork generated for the flip/cache fixes. No outstanding implementation blocker; final product/value content, price and fulfillment integration remain pending.

## 2026-11-17 — iPhone Safari background and unboxed mobile packs

Owner reported the fixed background did not animate in iPhone Safari, requested removing the scroll-to-paint instruction, and supplied a screenshot asking to remove the rectangular photo/caption panels on mobile.

- Added a mobile/touch HD image sequence instead of requiring paused video preload/seeking. Sixty 1920x1080 frames exported from the existing approved wall clip, WebP with JPEG fallback. Three concurrent image loads, nearby-frame prefetch/cache, blended drawing and existing time-based scroll easing. The mobile reveal completes during the first short scroll segment, then holds the existing 4K mural. Desktop retains video.
- Removed the cue text. Added a mobile SVG silhouette mask around each unchanged approved pouch photograph and transparent caption/product-text backgrounds, retaining natural shadows and keyboard focus. No artwork regenerated; Product Facts redesign remains on hold.
- Browser QA at 390x844 confirmed frame 0 to 21 to 59, then back to 33, while wall video src remained null/readyState 0; fixed wall top remained 0. Local no-video fixture has an intentionally unavailable video URL and still animates through images. Completion displays the 4K still. Checked 320px no overflow, desktop video mode, pack opening/back flip, and reduced-motion static fallback. Console clean. Physical iPhone Safari is reported by owner; verification used a phone-sized browser and no-video fixture, not direct access to their iPhone.
- JS syntax, HTML/ARIA/local assets and all 120 frame files checked. No package manager or configured lint/test suite. No dependencies, paid generation, signup/checkout or outgoing client communications added.
- Prepared publication to the same GitHub Pages preview with newly versioned page scripts/styles.


### Mobile release live verification — 2026-11-17
Published commit `531d102916ab1c365dcbe2547454862f3c70e78b`; GitHub Pages run 44190313711 succeeded. All 125 changed runtime files (HTML, CSS, two scripts, silhouette mask and 120 image frames) match the tested local copies byte for byte.

Live 390 x 844 browser check: image-wall active; background-video src remains unset; first swipe advances frame 0 to 20; completion reaches frame 59 and finished still opacity 1; reverse scroll returns to frame 39. Fixed wall stays at viewport top 0. Cue absent; pack photo, caption and metadata backgrounds transparent; silhouette mask applied; no horizontal overflow. Screenshots and deployment/browser records saved in Preview/2026-11-17-mobile-fix-v4/. Local checks also covered 320px width, desktop video, reduced motion, unavailable-video fixture, pouch opening and back flipping. This is phone-layout testing in Chrome, not a physical iPhone Safari verification.

Back product-facts redesign and outcome/value copy remain pending the user's review. No artwork regeneration, new dependencies, checkout activation or newsletter transmission performed.


## 2026-11-17 — slower mobile wall reveal
Owner approved the cleaner mobile design and requested a slower scroll-linked wall reveal: one flick reached AI Za with the mural already complete. Expanded the mobile painting distance from 1.25 viewport heights (minimum 900px) to 4 viewport heights (minimum 2400px), bounded by document scroll length. Softened mobile catch-up from 100ms to 220ms in both scroll directions. Native page scrolling and desktop timing retain their existing behavior. Versioned motion.js as 20261117-slower-wall to refresh browser caches.

JS syntax passed; no package manager or configured lint/test suite. Local phone layout 390x844: at scroll1224px (where the old version completed), new reveal settles at36.26%, frame21 of59; background video src remains null. At scroll3756px painting reaches completion; fixed wall top0. No new dependencies or art regeneration.


## 2026-11-17 — approved cinematic layout publication
Owner approved the full floating-packs-v6 review and explicitly requested publishing it for phone review. Published package will retain all approved artwork and product copy; extend silhouette cutouts, shadows and strain-color glow to desktop; center mobile labels on small translucent panels; paint the fixed wall automatically, then maintain a subtle18-second drift loop with a separate scroll-linked pan and116%-to100% cinematic pullback. Reduced-motion static fallback retained. No new dependencies.

Release files in Preview/2026-11-17-cinematic-live-v7. Replaced review-only ribbon, versioned JS and new floating-packs.css, updated repository README. Review copy retained. JS syntax, HTML asset references and CSS structure checks passed; no configured lint/test suite. Prior review browser QA covered phone widths320/390, desktop, automatic painting, scroll camera, loop, pouch opening/back flip and reduced-motion fallback. Final live verification follows deployment.
