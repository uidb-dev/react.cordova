# Reco — `react.cordova`

**One CLI that bundles React.js and Apache Cordova into a single project.** Write a
React app; ship it as a native Android, iOS or desktop build without maintaining two
codebases or two toolchains.

[![npm](https://img.shields.io/npm/v/react.cordova)](https://www.npmjs.com/package/react.cordova)
[![downloads](https://img.shields.io/npm/dm/react.cordova)](https://www.npmjs.com/package/react.cordova)
[![license](https://img.shields.io/npm/l/react.cordova)](./LICENSE)

<p align="center">
   <img src="https://raw.githubusercontent.com/uidb-dev/react.cordova/master/assets/react-logo.png" height="96" alt="React.js"/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://raw.githubusercontent.com/uidb-dev/react.cordova/master/assets/cordova-logo.png" height="96" alt="Apache Cordova"/>
</p>

Normally, putting React inside Cordova means two `package.json` files, a build step
that copies `build/` into `www/`, and a dev loop where the browser and the device
behave differently. `reco` collapses that into one project directory with one
`package.json`: `npm start` serves React *and* a Cordova simulation together, and
`npm run build` runs the React build, the Cordova prepare and the native compile as a
single command.

---

## Quick start

```bash
npm install -g react.cordova
reco init com.example.hello "hello world"
cd hello_world       # app name, lowercased, spaces replaced with underscores
npm start
```

**Requirements:** Node 16 or newer — verified on 16, 18, 20, 22, 24 and 25. Cordova is
also expected as a global install (`npm install -g cordova`); generated projects call
both `reco` and `cordova` from their build scripts.

> **Upgrading from 2.5.4 or earlier?** Those versions cannot run at all on a current
> Node: every command fails, either with `Cannot find module 'node:path'` or with a
> `Function.prototype.apply` error, depending on your version. 2.6.0 removes the
> abandoned module loader responsible for it. See the [changelog](./CHANGELOG.md).

`reco init` scaffolds the React app and the Cordova app and merges one into the other,
then installs [`cordova_script`](https://www.npmjs.com/package/cordova_script) and
[`navigation-controller`](https://www.npmjs.com/package/navigation-controller) so the
project boots with `deviceready` handling and native-feeling page navigation already
wired up.

## Prerequisites

| | |
| --- | --- |
| **npm** | [get npm](https://www.npmjs.com/get-npm) |
| **Cordova** | `npm install -g cordova` |
| **Java** | Required for Android builds. JDK 8 recommended for older Cordova toolchains. |
| **Xcode** | Required for iOS builds (macOS only). |

## Project layout

`reco` projects are a single merged tree — React's `src/` and `public/` living
alongside Cordova's `platforms/`, `plugins/` and `www/`:

```
project folder
 |-- src            # your React app
 |-- public
 |-- platforms      # Cordova native projects
 |-- plugins        # Cordova plugins
 |-- www            # build output Cordova packages
 |-- hooks
 |-- package.json   # one manifest for both halves
```

## Commands

### Develop

```bash
npm start
```

Serves the React dev server and a Cordova browser simulation together, so plugin calls
work in the browser during development.

### Build

```bash
npm run build              # all configured platforms
npm run build browser
npm run build android      # produces an installable .apk
npm run build ios          # produces an .xcworkspace to compile in Xcode
```

Equivalent to running the React build, then `cordova prepare`, then `cordova compile`.

### Cordova and React, unchanged

Both underlying CLIs keep working inside a `reco` project:

```bash
cordova platform add android
cordova plugin add cordova-plugin-camera
npm install navigation-controller
npm test
```

### CLI reference

```bash
reco help        # full command list
reco version
```

Learn more: [Cordova getting started](https://cordova.apache.org/#getstarted) ·
[React documentation](https://react.dev/)

---

## Full documentation

**<https://ui-db.com/open-source/react.cordova>**

<details>
<summary><b>Legacy project layout (versions &lt; 2.0.0)</b></summary>

<br>

Older projects kept the two halves in separate directories:

```
project folder
 |-- cordova
 |    |-- hooks / platforms / plugins / www / package.json
 |-- react-js
 |    |-- src / public / build / package.json
```

In that layout the `reco` prefix fronted both toolchains:

```bash
reco start
reco build <cordova platform>
reco platform <add|rm> <platform>
reco plugin <add|rm> <plugin>
reco install <npm package>
reco react <any react command>
```

`<cordova platform>` was optional. Current versions use the merged layout above and
plain `npm` / `cordova` commands instead.

</details>

---

## Support

- Bugs and feature requests: [GitHub issues](https://github.com/uidb-dev/react.cordova/issues)
- The CLI entry point is [`bin/cli.js`](https://github.com/uidb-dev/react.cordova/blob/master/bin/cli.js) — pull requests welcome.
- Paid/private support: [via Fiverr](https://www.fiverr.com/share/5bpN56)

If this CLI saves you time, you can support its maintenance:
[donate via PayPal](https://paypal.me/orchoban).

## License

MIT · Created by [UIDB](https://ui-db.com)
