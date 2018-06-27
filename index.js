const _ = require('lodash');

const reservedPluginTypes = require('./lib/reserved-plugin-types');

class WarpjsPluginError extends Error {};

class WarpjsPlugin {
    constructor(config, warpCore, packageJson) {
        this.config = Object.freeze(_.cloneDeep(config));
        this.warpCore = warpCore;
        this.packageJson = Object.freeze(_.cloneDeep(packageJson));
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
        return this.packageJson.name.replace(/@/g, '').replace(/\//g, '-');
    }

    get version() {
        return this.packageJson.version;
    }

    get versionedName() {
        return `${this.basename}-${this.version}`;
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
            versionedName: this.versionedName
        });
    }
}

module.exports = WarpjsPlugin;
