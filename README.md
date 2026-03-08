# NASA Space

A responsive microsite about space technology and mission activity. The site presents NASA and partner space programmes, recent launches, key technologies, and live data such as who is in space and where the International Space Station is orbiting.

## Contents

- **Home** – Introduction, featured sections, and NASA’s Astronomy Picture of the Day
- **Launches** – Recent SpaceX missions (including NASA crew and cargo to the ISS) with descriptions and pagination
- **Technology** – Overview of rockets, satellites, telescopes, rovers, the ISS, and deep space exploration
- **Live Data** – Current astronauts in space and real-time ISS position
- **Contact** – Contact form for questions or feedback

## Tech stack

- **HTML5** – Semantic structure, accessible markup
- **CSS** – Custom styles (no frameworks), responsive layout with media queries
- **JavaScript** – Vanilla JS only (no frameworks): fetch, DOM updates, form validation, mobile menu

## Project structure

```
/
├── css/
│   ├── styles.css      # Main styles and design system
│   └── responsive.css  # Breakpoints and mobile layout
├── js/
│   ├── main.js         # Footer year, mobile nav toggle
│   ├── api.js          # NASA APOD (Image of the Day)
│   ├── launches.js     # SpaceX launches, pagination
│   ├── live.js         # Astronauts in space, ISS position
│   └── formValidation.js # Contact form validation
├── images/             # Site images and assets
├── index.html
├── launches.html
├── technology.html
├── live.html
├── contact.html
└── README.md
```

## Running the site

Open `index.html` in a browser, or use a local server so API requests work correctly (some APIs may block `file://`):

```bash
# Example with Python
python -m http.server 8000

# Then open http://localhost:8000
```

## Data sources

- **NASA APOD** – [api.nasa.gov](https://api.nasa.gov) – Astronomy Picture of the Day (requires a free API key)
- **SpaceX** – [api.spacexdata.com](https://github.com/r-spacex/SpaceX-API) – Past launches and mission data
- **Open Notify** – [open-notify.org](http://open-notify.org) – People in space and ISS position (via CORS proxy)

## NASA API key

The site uses a NASA API key for the Image of the Day. To use your own key, replace the value in `js/api.js`. You can get a free key at [api.nasa.gov](https://api.nasa.gov).

## Licence and attribution

Content and imagery are from NASA and partner sources. This project is not affiliated with NASA. For official NASA resources, see [nasa.gov](https://www.nasa.gov).
