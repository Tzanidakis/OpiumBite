# Opium Bite deployment

The production address is https://opiumbite.com. Product media stays on https://media.opiumbite.com.

## Build

Use Node.js 22 or newer. No package installation is required.

```
npm run build
npm test
```

Upload **only `public/`**, which is recreated on every build. Do not upload the repository root. The build follows local script, stylesheet and media references from an explicit list of site pages, checks required files and the 25 MiB per-file limit, and generates robots.txt and sitemap.xml. Source originals, PDF guides, scratch files, tests and inventory files are excluded. Intro and scroll-film videos use the R2 media host under website-video/phone-v1/ and are excluded from the Pages upload. Small real-frame poster images remain in the deployment.

For a local preview:

```
python3 -m http.server 8081 --directory public
```

Open http://localhost:8081/. This basic server does not emulate Cloudflare's extensionless redirects, custom 404 status handling or response headers; verify those on the Pages preview.

## Cloudflare Pages settings

- Framework: None
- Build command: `npm run build`
- Build output directory: `public`
- Repository root: this project
- Production branch: select the actual intended branch
- Node version: 22 or newer

Pages redirects .html routes to extensionless routes. Canonicals and the generated sitemap use those extensionless paths. Product canonicals keep only the validated product ID; material/color/karat choices share that canonical. Product content and metadata still use JavaScript; separately generated product HTML and Greek/English URL routes remain future work. The language toggle alone does not provide separate indexed Greek pages.

The top-level 404.html prevents the automatic SPA fallback. Test an invented path on Pages and require HTTP 404. `_headers` provides basic static-response protections. A Content Security Policy is deferred until external/inline script requirements are reviewed and tested. HTTP-to-HTTPS and www redirects are zone/domain setup work, not performed by this build.

## Before publication

Test the Pages preview, including all products, pricing, material images, language switching, intro and scroll video, real-phone browsing and the email-draft contact flow. Verify no preview URL appears in the sitemap. Confirm preview noindex headers. Attach the production domain only after checks pass, then verify HTTPS, redirects, headers, missing-page status and sitemap access. Submit the production sitemap to Search Console after launch.

No analytics tag, Search Console token or Cloudflare account changes are included in this step. Privacy notices and any future automatic contact delivery remain separate work.


## Current staging preview

https://staging.opium-bite-preview.pages.dev is deployed to the `opium-bite-preview` Direct Upload project on branch `staging`. No production domain is attached. The preview ZIP contains an additional noindex response header; the normal production `_headers` source does not. After every edit, rebuild and test before uploading. Git auto-deployment has not been connected. Physical-phone acceptance testing is still pending; see output/pages-preview-checklist.md.

## Published preview update — phone unlock and contact sending

The current local build removes Skip Intro during refresh loading and gives the
mobile lifecycle restore flow its own completion and bounded recovery timers.
The contact form posts multipart data to FormSubmit.co for opiumbite@gmail.com,
keeps the provider's default CAPTCHA, and supports up to five attachments with a
combined 10 MB limit. It no longer opens mailto or downloads a draft.

Delivery requires a first submission followed by activation from the recipient
inbox. No activation request or real email delivery has been verified yet.
81 automated checks pass, including homepage restore with an intro element,
stalled loading/animation frames, and direct-send attachment preparation.
The browser QA restore fixture also released the loader and hid Skip Intro.
The latest output/opium-bite-pages-preview.zip (69 files) was uploaded to the
staging preview. The live contact form exposes the FormSubmit action and new
send script; 75 HTTP checks pass with no failures. No production domain was
changed. Email activation and an actual delivery test remain pending.

## Published preview update — transparent logo introduction

The intro now uses media/intro-logo.png (1254 × 1254, alpha transparency), created
with built-in image generation using media/logo.png as the reference. Its prompt
is recorded in output/intro-logo.prompt.txt. CSS animates two smoke layers behind
the emblem and a glow/sheen on the make them bite button. Fresh link openings
show it; internal navigation/reloads preserve the existing visit behavior. It
can be dismissed immediately or advances after eight seconds. No intro video
or Play Intro control is created. Reduced-motion preferences stop decoration.
Contact's Instagram icon and the Create your piece arrow use SVG. All footer
contact links say Contact, and the phone row has an SVG aligned to its tel link.
Phone-width QA measured zero difference between the icon and number centers.
78 tests and 75 live HTTP checks passed. The staging preview was updated; the
production domain remains unchanged. FormSubmit activation is still pending.

## Published preview update — phone navbar controls and footer location

All 12 footers now say Heraklion, Crete (Ηράκλειο, Κρήτη in Greek).
Phone language/theme controls were moved out of the drawer into a compact
header group on the right. At widths 320, 390 and 430, QA measured a 16px right
margin, exactly centered logo, two controls in the header and zero in the drawer;
control icons measure 11px and 14px. Both controls were exercised in browser QA.
78 automated tests and 75 live HTTP checks pass. The staging preview is updated.

## Latest preview — controls returned to the phone hamburger menu

The user's latest preference supersedes the previous navbar placement. On phone
layouts, language and appearance now live inside the drawer, with labels in one
column and equal 56×44px controls in the other. Browser QA measured identical
left/right alignment and zero vertical center differences, and exercised both
buttons. The logo remains centered. Desktop controls retain their navbar homes.
The staging preview serves site-chrome.js?v=drawer-tools-2. 78 automated tests and
75 live HTTP checks pass.

## Latest phone menu — icon controls and nested disclosures

Removed visible Language/Appearance captions from the phone menu. Both existing
buttons remain in an aligned horizontal row, retaining accessible labels.
Collections expands/collapses on tap; Grillz and Earrings each have a nested
independent disclosure. View-all links retain access to collection overview
pages. Closing the menu or parent collection collapses nested groups. Hidden
panels are removed from keyboard navigation; desktop hover navigation remains.
Browser QA verified expanding Collections then Grillz, and collapsing the parent
reset all panels. The staging preview was updated with phone-dropdowns-1 assets.
78 automated checks passed.

## Latest preview — touch-device button offsets and Greek CTA

Centered the two phone menu controls and replaced display:contents wrappers with
regular flex wrappers. Explicitly reset inset values on both controls: legacy
phone theme rules set right:100px/top:18px, and the coarse-pointer relative
position rule could apply those offsets inside the drawer. Browser QA now
measures zero offsets and a centered pair of buttons.
The Greek floating Create your piece CTA now has flexible caption/button widths,
proper text wrapping, fixed SVG arrow width and explicit inner padding. Its text
fits at 320/390/430px in the component QA fixture. 78 tests and 75 live HTTP checks
pass. Cloudflare confirmed the staging deployment succeeded.

## Latest preview — transparent grillz cutouts

Replaced ggz/dbbs/uggz PNG masters and WebP website variants with real alpha
cutouts, removing black backdrops and mirrored floor reflections. Originals are
backed up under output/media-originals/. Built-in image_gen was used separately
for all three edits; output/grillz-cutout-prompts.txt records the prompt.
All images retain 1448×1086 framing and transparent WebP alpha (0..255).
Updated image query versions to transparent-1 and removed legacy lighten/mask
styles on these assets. 78 tests and 75 preview HTTP checks passed. The staging
upload succeeded; production hosting and R2 objects were not changed.

## Latest preview — finish selector SVG arrows

The homepage finish selector previously replaced its initial SVG arrow with the
Unicode arrow character when a finish changed. It now appends the same inline
SVG after every selection. Browser QA exercised Silver and Iced Out selections
in Greek and confirmed one SVG and no text arrow in the explore link. Published
atelier.js?v=finish-arrow-1 was verified on the live preview. 78 tests and 75
preview HTTP checks pass.


## Source update — 4 November 2026

The repository now uses permanent dark appearance and electric UV-purple accents,
larger readable text outside the unchanged scroll-film text, and only Grillz,
Earrings and Pendants. Rings and Bracelets routes are removed from the build.
Grillz groups are ordered Opium, Classic, Iced Out. Collection products sort by
silver starting price: Classic ascending and Opium descending. Eight selected
products use gold cover previews while links open silver detail and silver prices.
The signature section is an eight-product grillz carousel. Product pages have
collection-return arrows and compact phone/tablet galleries.

Regenerated assets: OPIUM/BITE skull grillz, Black man with the python in the
original campaign composition, and the skeleton wearing the real Opium Bite
pendant. Masters and WebP variants are in media/; prompts and source references
are documented in media/nov4-artwork-prompts.md.

Build: 75 public files, 32 sitemap URLs. Tests: 82 passing. Browser checks at
320px, 390px and 820px confirmed product options and navigation. Source changes
are pushed to GitHub; this update does not perform a Cloudflare/R2 deployment.


## Blue UV palette refinement

Refined the purple UI accents toward the user's blue UV-light reference:
electric blue highlights, cobalt glow, and blue-black surfaces. Updated the
CSS cache versions across all pages. This is a source update; hosting has not
been redeployed by this change.


## Mandatory enquiry fields

All seven visitor fields are now required, including phone and at least one
reference attachment. Native email/required checks and trimmed-text validation
block empty or whitespace-only entries. The attachment picker stays synchronized
with selected/dropped files and becomes invalid when the final file is removed.
English and Greek notices explain the requirement. Build succeeds; 86 tests pass.
Browser validation was checked without sending a real email.


## FILTER CAP paths and cache refresh

Verified the three current material folders directly in Cloudflare R2. Replaced
the removed front/left/old-cast references with the nine current right-side,
mouthpiece and matched-angle-v2 cast images. Public downloads returned valid
WebP images with matching upload timestamps. New content-based cache versions
and new catalog/revision script query versions force browsers to load the
current files. The media objects themselves were read, not modified.
