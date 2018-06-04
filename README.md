# WarpJS-Plugin

Base class for WarpJS plugins.

A plugin allows you to extend the functionality of WarpJS by adding a set of
endpoints to the server.

**NOTE**: If you need to use `@warp-works/warpjs-plugins` in your library, make
sure to include it in `devDependencies` and `peerDependencies` instead of
`dependencies`.

## Configuration

A plugin configuration to be added to `.warp-works-warpjsrc`:

    {
      "name": "string",
      "moduleName": "@some/module",
      "path": "/endpoints/base/path",
      "type": "optional type",
    }

- `name` Name of the plugin. This is distinct from the plugin itself as it could
  be used multiple times.
- `moduleName` is the npm package that will be `require()`.
- `path` is the mounting path of the application on the expressJS server.
- `type` is optional. You can define your own types. See a list of
  [RESERVED_PLUGIN_TYPES](./lib/reserved-plugin-types.js) that are affecting
  `Studio` and `Content`.

When defining your own type, make sure that the same API is exposed, as plugins
will expect a given API when interacting with the plugin.
