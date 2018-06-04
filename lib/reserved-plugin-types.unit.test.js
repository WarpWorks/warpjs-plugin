const _ = require('lodash');
const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./reserved-plugin-types');

const expect = testHelpers.expect;

describe("lib/reserved-plugin-types", () => {
    const clone = _.clone(moduleToTest);

    it("should expose an object", () => {
        expect(moduleToTest).to.be.an('object');
    });

    it("should expose ACTION as string", () => {
        expect(moduleToTest).to.have.property('ACTION');
        expect(moduleToTest.ACTION).to.be.a('string');
        delete clone.ACTION;
    });

    it("should expose CONTENT_ACTION as string", () => {
        expect(moduleToTest).to.have.property('CONTENT_ACTION');
        expect(moduleToTest.CONTENT_ACTION).to.be.a('string');
        delete clone.CONTENT_ACTION;
    });

    it("should expose CONTENT_DOMAIN_ACTION as string", () => {
        expect(moduleToTest).to.have.property('CONTENT_DOMAIN_ACTION');
        expect(moduleToTest.CONTENT_DOMAIN_ACTION).to.be.a('string');
        delete clone.CONTENT_DOMAIN_ACTION;
    });

    it("should expose STUDIO_ACTION as string", () => {
        expect(moduleToTest).to.have.property('STUDIO_ACTION');
        expect(moduleToTest.STUDIO_ACTION).to.be.a('string');
        delete clone.STUDIO_ACTION;
    });

    it("should expose STUDIO_DOMAIN_ACTION as string", () => {
        expect(moduleToTest).to.have.property('STUDIO_DOMAIN_ACTION');
        expect(moduleToTest.STUDIO_DOMAIN_ACTION).to.be.a('string');
        delete clone.STUDIO_DOMAIN_ACTION;
    });

    it("should expose SEARCH as string", () => {
        expect(moduleToTest).to.have.property('SEARCH');
        expect(moduleToTest.SEARCH).to.be.a('string');
        delete clone.SEARCH;
    });

    it("should expose SESSION as string", () => {
        expect(moduleToTest).to.have.property('SESSION');
        expect(moduleToTest.SESSION).to.be.a('string');
        delete clone.SESSION;
    });

    after("All properties tested", () => {
        expect(clone).to.be.empty();
    });
});
