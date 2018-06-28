const testHelpers = require('@quoin/node-test-helpers');

const WarpjsPlugin = require('./index');

const expect = testHelpers.expect;

const warpCore = {};
const packageJson = {
    name: '@test/module',
    version: '1.2.3'
};
const pluginType = 'a-plugin-type';

describe("index", () => {
    it("should expose a class", () => {
        expect(WarpjsPlugin).to.be.a('function');
        expect(WarpjsPlugin.name).to.equal('WarpjsPlugin');
    });

    context("static", () => {
        it("should expose '.isClass' and be true", () => {
            expect(WarpjsPlugin).to.have.property('isClass', true);
        });

        it("should expose an 'Error' object", () => {
            expect(WarpjsPlugin).to.have.property('Error');
            expect(WarpjsPlugin.Error);
        });

        context("baseConstants", () => {
            it("should return a known value", () => {
                const value = WarpjsPlugin.baseConstants(packageJson);
                expect(value).to.deep.equal({
                    basename: 'test-module',
                    version: '1.2.3',
                    versionedName: 'test-module-1.2.3',
                    appKeys: {
                        baseUrl: 'base-url',
                        pluginConfig: 'warpjs-plugin-config',
                        staticUrl: 'static-url',
                        warpCore: 'warpjs-core'
                    },
                    assets: {
                        css: 'test-module-1.2.3.min.css',
                        js: 'test-module-1.2.3.min.js'
                    },
                    folders: {
                        assets: 'assets'
                    }
                });
            });
        });
    });

    context("instance", () => {
        let instance;

        beforeEach(() => {
            const config = {
                auth: true
            };

            instance = new WarpjsPlugin(config, warpCore, packageJson, pluginType);
        });

        context(".app", () => {
            it("should throw because not implemented", () => {
                expect(() => instance.app).to.throw();
            });
        });

        it("should expose 'isClass' to be true", () => {
            expect(instance).to.have.property('isClass', true);
        });

        it("should expose 'basename' computed from packageJson", () => {
            expect(instance).to.have.property('basename', 'test-module');
        });

        it("should expose 'version' computed from packageJson", () => {
            expect(instance).to.have.property('version', '1.2.3');
        });

        it("should expose 'versionedName' computed from packageJson", () => {
            expect(instance).to.have.property('versionedName', 'test-module-1.2.3');
        });

        it("should expose 'pluginIdentifier' computed from packageJson", () => {
            expect(instance).to.have.property('pluginIdentifier', 'test-module');
        });

        it("should expose 'pluginType'", () => {
            expect(instance).to.have.property('pluginType', 'a-plugin-type');
        });

        context(".requiresAdmin()", () => {
            it("should be false when auth!=='admin'", () => {
                instance = new WarpjsPlugin({auth: 'foo'}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresAdmin', false);
            });

            it("should be true when auth==='admin'", () => {
                instance = new WarpjsPlugin({auth: 'admin'}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresAdmin', true);
            });
        });

        context(".requiresContent()", () => {
            it("should be false when auth!=='content'", () => {
                instance = new WarpjsPlugin({auth: 'foo'}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresContent', false);
            });

            it("should be true when auth==='content'", () => {
                instance = new WarpjsPlugin({auth: 'content'}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresContent', true);
            });
        });

        context(".requiresUser()", () => {
            it("should be false when auth falsy", () => {
                instance = new WarpjsPlugin({auth: false}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresUser', false);
            });

            it("should be true when auth truthy", () => {
                instance = new WarpjsPlugin({auth: 'anything'}, warpCore, packageJson, pluginType);
                expect(instance).to.have.property('requiresUser', true);
            });
        });

        context(".toJSON()", () => {
            it("should be a function with 3 params", () => {
                expect(instance.toJSON).to.be.a('function').to.have.lengthOf(3);
            });

            it("should return a known object", () => {
                const value = instance.toJSON('domain', 'type', 'id');

                expect(value).to.deep.equal({
                    basename: 'test-module',
                    version: '1.2.3',
                    versionedName: 'test-module-1.2.3',
                    pluginIdentifier: 'test-module',
                    pluginType: 'a-plugin-type',
                    auth: {
                        requiresAdmin: false,
                        requiresContent: false,
                        requiresUser: true
                    }
                });
            });
        });
    });
});
