# Changelog

All notable changes to `react.cordova` (the `reco` CLI) are documented here.

This project follows [Semantic Versioning](https://semver.org/).

## 2.6.0

The `reco` command was not being installed at all on one current Node LTS line,
and the CLI did not start at all on the two newest ones. Both are fixed here, so
2.6.0 is a required upgrade from 2.5.4.

### Fixed

- **`reco` is installed again on npm 10.8.2 (Node 20.19 – 20.20).** The `bin`
  map pointed at `.bin/reco`, and npm 10.8.2 silently drops any `bin` entry
  whose target lives under a dot-prefixed directory: the install reported
  success and left no `reco` command behind. The launcher directory is now
  `cli/`, so `reco` and `react-cordova` land on the PATH on every npm version
  tested (npm 8.19.3, 9.8.1, 10.8.2, 10.9.8, 11.10.1, 11.17.0).

- **The CLI runs on Node 22, 24 and 25 again.** The launcher booted the
  unmaintained `esm` loader (`require('esm')(module)`), which throws
  `TypeError: Function.prototype.apply was called on undefined` on Node 22 and
  newer, and could not resolve `node:`-prefixed module specifiers on any
  version. The two `export` statements in the source have been converted to
  CommonJS `module.exports` and the `esm` dependency is gone, so the launcher
  is now a plain `require`.

- **`reco --version` and `reco checkversion` report something.** Both parsed
  each stdout chunk of the npm registry response as JSON. The response is
  ~9.5 kB and arrives in more than one chunk, so the parse always threw and the
  check gave up without printing anything -- including inside every generated
  project's `build` script, where `reco checkversion` runs on every build. The
  full response is now buffered before parsing, the running version is read
  from the package's own `package.json` instead of being sliced out of
  `npm list -g` output, and the "Update available" notice only appears when the
  published version is genuinely newer.

- **Version and help commands work outside a project.** `reco -v`,
  `reco --version`, `reco checkversion`, `reco -help` and `reco info` answered
  "it is not reco based project" when run anywhere other than inside a
  generated app. Every documented command and alias is unchanged; they simply
  respond from any directory now.

- **Installing a generated project works again (issue #40, also #33, #35,
  #39).** `reco init` pins React to `^18.3.1`, writes a project-local `.npmrc`
  with `legacy-peer-deps=false`, and adds a `typescript: ^4.9.5` override, so
  `npm install` no longer hoists `ajv-keywords@5` next to `ajv@6` and
  `react-scripts build` no longer dies with
  `Cannot find module 'ajv/dist/compile/codegen'`.

### Changed

- The launcher directory `.bin/` is now `cli/`. This is internal: the commands
  are still `reco` and `react-cordova`, with every flag and prompt unchanged.
- `inquirer` is no longer pinned to exactly `8.2.6`; the range is `^8.2.6`, so
  installs pick up 8.2.7 and later 8.x patches. inquirer 9 and above are
  ESM-only and cannot be `require()`d from this CommonJS CLI. Resolving to
  8.2.7 drops the `external-editor` -> `tmp` chain, which takes a consumer
  install of this package from 4 npm audit advisories to 0.
- Generated projects now get a **Requirements** section in their README stating
  that `reco` and `cordova` are global CLIs and are deliberately not
  dependencies of the generated app.
- Internal paths to bundled `templates/` are resolved from the module's own
  location instead of being sliced out of `process.argv[1]`, which was already
  wrong for a symlinked global install.
- `engines.node` is declared for the first time (`>=16`), so npm warns instead
  of failing silently on unsupported runtimes.
- `repository` points at `github.com/uidb-dev/react.cordova`; it still pointed
  at the old `orchoban` org. The same stale URL is corrected in `reco help`.

### Removed

- The `esm` dependency (unmaintained since 2020).
- The `promise` dependency, which was only required by an unused stub module.
- The `@babel/cli` and `@babel/core` devDependencies, plus the `build` script
  and the checked-in `dist/` output. Nothing needed transpiling once `esm` was
  gone, and `dist/` was never published.
- Dead launchers that shipped in the tarball but were not in the `bin` map:
  `.bin/cordovaPlugins` (its module, `bin/cordovaPlugins.js`, was deleted back
  in 1.7.7, so invoking it was a guaranteed `MODULE_NOT_FOUND`), `.bin/react`,
  `.bin/react-cordova` and `.bin/cordova`, along with `bin/cordova.js`, whose
  only entry point was the launcher just removed.

### Supported Node versions

`reco help`, `reco --version`, `reco checkversion` and a full
`reco init` -> `npm install` -> `npm run build` were verified from a globally
installed packed tarball on:

| Node | npm | Result |
| --- | --- | --- |
| 16.19.0 | 8.19.3 | works |
| 18.18.2 | 9.8.1 | works |
| 20.20.1 | 10.8.2 | works |
| 22.23.2 | 10.9.8 | works |
| 24.19.0 | 11.17.0 | works |
| 25.7.0 | 11.10.1 | works |

Under 2.5.4, Node 22 and newer failed outright and npm 10.8.2 never installed
the command.

## 2.5.4 and earlier

See the commit history: https://github.com/uidb-dev/react.cordova/commits/main
