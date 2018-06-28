const _ = require('lodash');

const reservedPluginTypes = require('./lib/reserved-plugin-types');

// FIXME: This should extend WarpjsError, but not sure how to get it.
class WarpjsPluginError extends Error {};

function getBasename(packageJson) {
    return packageJson.name.replace(/@/g, '').replace(/\//g, '-');
}

function getVersionedName(packageJson) {
    const basename = getBasename(packageJson);
    const version = packageJson.version;

    return `${basename}-${version}`;
}

class WarpjsPlugin {
    constructor(config, warpCore, packageJson, pluginType) {
        this.config = Object.freeze(_.cloneDeep(config));
        this.warpCore = warpCore;
        this.packageJson = Object.freeze(_.cloneDeep(packageJson));
        this.pluginType = pluginType;
    }

    /**
     *  Poor man's solution to detect class-based plugin.
     */
    static get isClass() {
        return true;
    }

    get isClass() {
        // TODO: Should we just return `true` for simplicity?
        return this.constructor.isClass;
    }

    static get Error() {
        return WarpjsPluginError;
    }

    static get TYPES() {
        return reservedPluginTypes;
    }

    get TYPES() {
        return this.constructor.TYPES;
    }

    get basename() {
        return getBasename(this.packageJson);
    }

    get version() {
        return this.packageJson.version;
    }

    get versionedName() {
        return getVersionedName(this.packageJson);
    }

    /**
     *  Must return a `function(baseUrl, staticUrl) {}` to initialize an
     *  application (expressJS).
     */
    get app() {
        throw new WarpjsPluginError(`Implementation '${this.constructor.name}.app' is missing.`);
    }

    get pluginIdentifier() {
        return this.basename;
    }

    get requiresAdmin() {
        return Boolean(this.config && this.config.auth && this.config.auth === 'admin');
    }

    get requiresContent() {
        return Boolean(this.config && this.config.auth && this.config.auth === 'content');
    }

    get requiresUser() {
        return Boolean(this.config && this.config.auth);
    }

    toJSON(domain, type, id) {
        return Object.freeze({
            basename: this.basename,
            version: this.version,
            versionedName: this.versionedName,
            pluginIdentifier: this.pluginIdentifier,
            pluginType: this.pluginType,
            auth: Object.freeze({
                requiresAdmin: this.requiresAdmin,
                requiresContent: this.requiresContent,
                requiresUser: this.requiresUser
            })
        });
    }

    static baseConstants(packageJson) {
        const basename = getBasename(packageJson);
        const version = packageJson.version;
        const versionedName = getVersionedName(packageJson);

        return Object.freeze({
            appKeys: {
                baseUrl: 'base-url',
                pluginConfig: 'warpjs-plugin-config',
                staticUrl: 'static-url',
                warpCore: 'warpjs-core'
            },
            basename,
            version: version,
            versionedName: versionedName,
            folders: {
                assets: 'assets'
            },
            assets: {
                css: `${versionedName}.min.css`,
                js: `${versionedName}.min.js`
            }
        });
    }
}

module.exports = WarpjsPlugin;
