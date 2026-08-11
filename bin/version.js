const path = require("path");
const fs = require("fs");

// Root of the installed react.cordova package, resolved from this file's own
// location rather than from process.argv, so it is correct however the CLI was
// started (global install, npx, npm link, symlinked shim).
const PACKAGE_ROOT = path.join(__dirname, "..");

// The version of react.cordova that is currently running.
const installedVersion = () => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8")
    ).version;
  } catch (error) {
    return "unknown";
  }
};

// Pull the latest published version out of the `npm view react.cordova --json`
// document. `raw` must be the COMPLETE response: the registry document is
// ~10 kB and arrives over several stdout chunks, so anything that parses a
// single chunk throws and reports nothing.
const latestVersionFrom = (raw) => {
  if (!raw) return null;

  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (error) {
    return null;
  }

  // `npm view` returns an array when several versions match the spec.
  if (Array.isArray(doc)) doc = doc[doc.length - 1];
  if (!doc) return null;

  if (doc["dist-tags"] && doc["dist-tags"].latest) return doc["dist-tags"].latest;
  if (typeof doc.version === "string") return doc.version;
  if (Array.isArray(doc.versions) && doc.versions.length)
    return doc.versions[doc.versions.length - 1];

  return null;
};

// True when `candidate` is a strictly higher release than `current`.
// Guards the "Update available" notice, which used to fire on any difference
// and so also nagged people who were ahead of the registry (a local build, a
// prerelease) to "update" to an older version.
const isNewer = (candidate, current) => {
  if (!candidate || !current) return false;

  const parts = (v) =>
    String(v)
      .split("-")[0]
      .split(".")
      .map((n) => parseInt(n, 10));

  const a = parts(candidate);
  const b = parts(current);
  if (a.some(isNaN) || b.some(isNaN)) return candidate !== current;

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i] || 0;
    const y = b[i] || 0;
    if (x !== y) return x > y;
  }
  return false;
};

module.exports = { PACKAGE_ROOT, installedVersion, latestVersionFrom, isNewer };
