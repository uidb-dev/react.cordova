# Attribution

- `react-logo.svg` / `react-logo.png` — the React logo, from react.dev. React is a
  trademark of Meta Platforms, Inc.
- `cordova-logo.png` — the Apache Cordova bot, from cordova.apache.org. Apache Cordova is
  a trademark of the Apache Software Foundation.

Both are included to identify the technologies this CLI bundles.

## Two things worth knowing before you change these

**They are vendored, not hotlinked.** The README used to hotlink the React logo from
Wikipedia; that URL began returning HTTP 400 and left a broken image on the npm package
page for anyone evaluating the CLI.

**The README must reference the PNG, not the SVG.** npm rewrites every README image
through GitHub's camo proxy, and camo refuses to serve SVG. An `.svg` src renders as a
broken image on npmjs.com even though it works fine on GitHub. The SVG is kept here only
as the higher-quality source for other uses; `react-logo.png` is generated from it.
