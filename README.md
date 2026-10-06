# Jadon Chan — Mechanical Engineering Portfolio

A static portfolio site (plain HTML, CSS and JavaScript, no build step) built from
the "Mechanical Projects Portfolio" page.

## Editing content

All content lives in [`data.js`](data.js):

- `profile` holds your name, headline, intro, email, and optional `links`
  (for example `{ label: "LinkedIn", href: "https://linkedin.com/in/..." }`).
- `projects` lists each project in display order with a title, term, skill tags,
  description, and images.

To add photos or CAD renders, put the files in `assets/images/` and list them on the
project, first image as the cover:

```js
images: [
  { src: "assets/images/gearbox-assembly.jpg", cap: "Final assembly on the test rig" },
  { src: "assets/images/gearbox-cad.png", cap: "SolidWorks model" }
]
```

Keep images around 1600 px on the long side so the site loads quickly.

## Previewing

Open `index.html` in a browser; no server is needed.

## Publishing on GitHub Pages

In the repository on GitHub, go to **Settings → Pages**, set the source to
**Deploy from a branch**, pick `main` and `/ (root)`, and save. The site appears at
`https://jadonchan27-pixel.github.io/jadonchanportfolio/`.
