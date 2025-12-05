# Font Files Location

Place your Figtree font files here:

## Directory Structure:
```
web/fonts/
├── files/
│   ├── figtree-latin-600-normal.woff2
│   └── figtree-latin-600-normal.woff
└── figtree.css
```

## Instructions:

1. **Place your font files** in the `files/` subdirectory:
   - `figtree-latin-600-normal.woff2` → `web/fonts/files/figtree-latin-600-normal.woff2`
   - `figtree-latin-600-normal.woff` → `web/fonts/files/figtree-latin-600-normal.woff`

2. The `figtree.css` file is already configured to load these fonts.

3. If you also have the **400 weight (Regular)** font files, add them to `figtree.css`:
   ```css
   @font-face {
     font-family: 'Figtree';
     font-style: normal;
     font-weight: 400;
     font-display: swap;
     src: url('./files/figtree-latin-400-normal.woff2') format('woff2'),
          url('./files/figtree-latin-400-normal.woff') format('woff');
     unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   ```

4. The fonts will be loaded automatically when you run `npm run web` or `expo start --web`.

