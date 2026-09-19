# Pastrana Dental

A warm, editorial website for Dr. Stephanie Pastrana, built with React, TypeScript, and Vite. Designed for the practice's pre-opening phase, with English and Spanish content, locally hosted typography, responsive layouts, accessible native dialogs, and a keyboard-operable before/after comparison.

## Visual palette

The branding follows Stephanie's latest reference: a serif P monogram above a widely spaced uppercase PASTRANA / DENTAL wordmark. The monogram is drawn as a vector in `src/BrandMonogram.tsx`, with the same shape in the favicon and the small section ornaments; it replaces the earlier star motif. The wordmark uses the locally hosted Cormorant Garamond and DM Sans fonts.

The main headline is “Thoughtfully personal dentistry.” (“Odontología con un toque personal.” in Spanish). The airy green-and-ivory treatment, philosophy section, and Instagram-linked before/after feature carry forward the elements Stephanie liked. Her supplied website and office mockups are visual references only; their generated people, premises, equipment, and unconfirmed services or contact details are not used as facts about this practice.

| Color           | Hex       | Role                                      |
| --------------- | --------- | ----------------------------------------- |
| Warm ivory      | `#F5F1E8` | Main canvas and text on green             |
| Forest green    | `#15251F` | Primary brand, buttons, and dark sections |
| Charcoal/forest | `#252A26` | Main text on ivory                        |
| Pale sage       | `#E8EBE3` | Credentials and smile-gallery backgrounds |
| Warm stone      | `#ECEBE2` | Care-section background                   |
| Champagne       | `#B5A17B` | Decorative marks and fine accents         |
| Light champagne | `#DFD2B8` | Small monograms and focus rings on forest |

Color tokens live at the top of `src/styles.css`. Green and ivory dominate, including the large closing headline. Champagne is used for small decorative marks and fine accents. The optional terracotta accent is omitted to keep this direction focused. The favicon and browser theme color follow the same palette.

## Run locally

Use Node 24 (see `.nvmrc`).

```sh
npm install
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

## Content and contact details

- `src/site.ts`: all bilingual copy, Instagram details, and the future `bookingUrl`.
- `src/App.tsx`: page sections and interactions.
- `src/styles.css`: responsive design, typography, and colors.
- `public/images/`: the user-supplied Instagram screenshots. The original files are unchanged; the layout uses CSS to frame the relevant photos.

The current primary CTA opens an explanation and a link to the known Instagram account. There is no pretend booking form, no patient-data collection, and no invented phone, email, opening date, office hours, or new clinic address. Setting `practice.bookingUrl` switches the primary CTA to the actual scheduling destination. When booking goes live, also update the appointment FAQ, inquiry dialog, and pre-opening copy in **both** languages.

## Cloudflare Pages

This is a static site and needs no server or Cloudflare credentials to build.

1. Push the repository to your Git provider and create a Cloudflare Pages project connected to it.
2. Use **`npm run build`** for the build command and **`dist`** for the output directory. Use Node **24** if the build environment needs an explicit version.
3. Review the generated `pages.dev` preview.
4. In the Pages project's **Custom domains**, attach `pastranadental.com`. Complete the domain setup in Cloudflare; having DNS in Cloudflare alone does not connect the Pages project.

Official references: [Vite deployment on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/) and [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

`public/_headers` includes security headers and long-lived caching for Vite's hashed assets. Fonts and images load locally. There are no third-party scripts, trackers, or remote embeds.

## Source notes and launch handoff

The supplied Instagram profile and screenshots were the factual source. Direct retrieval of Instagram was unavailable during implementation.

- Profile: general and cosmetic dentist; Alleman Biomimetic Mastership; Kois Center graduate; **AACD Accreditation Candidate**, not accredited status.
- Bio screenshot: University of Puerto Rico School of Dental Medicine, class of 2019; general practice residency at VA Caribbean Healthcare System.
- Patient-centered quotation: taken from the supplied June 12, 2025 Instagram caption.
- Before/after: the supplied case screenshot. No procedure or guaranteed outcome is asserted.
- Private-pay/no insurance: supplied by the site owner in the brief.
- The old practice's patient review and its office amenities have deliberately not been represented as reviews or amenities of the new clinic.
- San Juan appeared in the older bio, but the **new** clinic's location is unknown and therefore omitted.

Before publishing the production domain, have Stephanie confirm the draft copy, current credentials, service scope, and portfolio-photo permissions. Replace screenshot assets with the original photographs when available; the current originals total about 7.8 MB and include offscreen Instagram UI. Native photo exports will improve performance and remove unnecessary source pixels. Add confirmed opening/contact details and any actual scheduling link. The page works in the meantime as a pre-opening site.

The site saves only language preference in localStorage and works if storage is disabled. Its privacy text describes this initial implementation; revisit that text when adding analytics, forms, or scheduling.

This project has not been deployed and does not change Cloudflare DNS.

## Verification

- TypeScript and Vite production build passed. In the restricted Windows sandbox, the final build used `npm run build -- --configLoader runner` to avoid esbuild's access to parent directories; normal local and Cloudflare builds use `npm run build`.
- Browser checks covered 320px, 390px, 768px, and desktop viewports, including Spanish layouts and horizontal overflow.
- Verified language persistence, mobile menu navigation, direct section links, care-to-inquiry dialogs, Escape dismissal and focus return, privacy content, FAQ expansion, and keyboard comparison controls.
- Final browser inspection reported no console warnings or errors.
