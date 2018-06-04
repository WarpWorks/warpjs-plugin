const testHelpers = require('@quoin/node-test-helpers');

const WarpjsPlugin = require('./index');

const expect = testHelpers.expect;

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
    });

    context("instance", () => {
        let instance;

        beforeEach(() => {
            const config = {};

            const warpCore = {};
            const packageJson = {
                name: '@test/module',
                version: '1.2.3'
            };

            instance = new WarpjsPlugin(config, warpCore, packageJson);
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

        context(".toJSON()", () => {
            it("should be a function with 3 params", () => {
                expect(instance.toJSON).to.be.a('function').to.have.lengthOf(3);
            });

            it("should return a known object", () => {
                const value = instance.toJSON('domain', 'type', 'id');

                expect(value).to.deep.equal({
                    basename: 'test-module',
                    version: '1.2.3',
                    versionedName: 'test-module-1.2.3'
                });
            });
        });
    });
});
