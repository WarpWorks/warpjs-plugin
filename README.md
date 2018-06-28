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
      "auth": "value",
    }

- `name` Name of the plugin. This is distinct from the plugin itself as it could
  be used multiple times.
- `moduleName` is the npm package that will be `require()`.
- `path` is the mounting path of the application on the expressJS server.
- `type` is optional. You can define your own types. See a list of
  [RESERVED_PLUGIN_TYPES](./lib/reserved-plugin-types.js) that are affecting
  `Studio` and `Content`.
- `auth` is optional. You can define if auth is needed. The value can be
  `"admin"`, `"content"`, `true`, or `false`. Default value is `false`. When
  `admin` or `content` is used, the user must be logged in, and in that
  group. A user in `admin` is allowed to access `content`. When `true`, any
  logged in user can access it.

When defining your own type, make sure that the same API is exposed, as plugins
will expect a given API when interacting with the plugin.


## API

### <a name="isClass"></a>`.isClass`

Poor's man check for if it's class-based plugin or module-based (the old way).


### <a name="Error"></a>`.Error`

Get the `WarpjsPluginError`.


### <a name="TYPES"></a>`.TYPES`

Gets the different reserved types.


### <a name="basename"></a>`.basename`

Getter for the converted basename from `package.json`'s `name`.


### <a name="version"></a>`.version`

Getter for the `package.json`'s `version`.


### <a name="versionedName"></a>`.versionedName`

Getter for a combination of [basename](#basename) and [version](#version).


### <a name="app"></a>`.app`

You must implement this method to get the application. This must return a
function that takes `(baseUrl, staticUrl)` that will return an initialized
expressJs application.

- `baseUrl` is the base path under which the application will run.
- `staticUrl` is the static url of the main application.


### <a name="pluginIdentifier"></a>`.pluginIdentifier`

Getter to get a unique identifier for the plugin. The default implementation is
to generate the value from `package.json`'s `name`.

    {
      "name": "@warp-works/warpjs-plugin",
      ...
    }

will return `warp-works-warpjs-plugin`.


### <a name="requiresAdmin"></a>`.requiresAdmin`

Getter to see if the plugin is configured with authentication. If so, is the
`admin` role required to access this application.


### <a name="requiresContent"></a>`.requiresContent`

Getter to see if the plugin is configured with authentication. If so, is the
`content` role required to access this application.


### <a name="requiresUser"></a>`.requiresUser`

Getter to see if the plugin is configured with authentication. Any truthy value.


### <a name="toJSON"></a>`.toJSON()`

Gets a JSON representation of the plugin.


### <a name="baseConstants"></a>`.baseConstants(packageJson)`

Gets basic constants for the given `package.json` file.
