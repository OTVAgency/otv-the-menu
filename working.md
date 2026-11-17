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
