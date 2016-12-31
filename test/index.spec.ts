import { expect, should } from 'chai';
import { build } from '../tools/parser/';

describe('List of features', () => {
    it('Build', () => {
        expect(typeof build).to.equal('function');
        expect(build()).to.equal(void 0);
    })
})