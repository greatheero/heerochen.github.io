# heerochen.github.io

Personal portfolio website of **Heero Chen**, Human Factors Engineer / UX Engineer.

Live site: https://heerochen.github.io

## Features

- Single-page layout with four views: **Home**, **Resume**, **Projects** and **Contact**
- Client-side view switching (`switchView()` in `js/main.js`) with no page reloads
- Responsive design built with Tailwind utility classes
- Circular grayscale portrait with an inline SVG fallback if the image fails to load

## Tech Stack

- HTML, CSS and vanilla JavaScript (no build step)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Google Fonts](https://fonts.google.com/): Work Sans
- Hosted on [GitHub Pages](https://pages.github.com/)

## Project Structure

```
├── index.html      # Markup for all views
├── css/
│   └── style.css   # Custom styles
├── js/
│   └── main.js     # View switching logic
└── .gitignore
```

## Run Locally

Open `index.html` directly in a browser, or serve it with a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is deployed with GitHub Pages. Pushing to the `main` branch publishes the changes automatically.

## Customization

- **Content**: edit the bio, resume and project entries in `index.html`.
- **Accent color**: `#EEA302` (used in the logo dot and nav hover states).
- **Font**: Work Sans, loaded in the `<head>` of `index.html`.
- **Portrait**: replace the `<img>` source in the Home view. A local file (for example in an `images/` folder) is more reliable than a remote URL.

## Contact

- Website: https://heerochen.github.io
- Email / LinkedIn: _add your links here_

## License

© Heero Chen. All rights reserved.
