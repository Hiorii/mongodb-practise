const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
    before(async () => {
        const testDepOne = new Department({_id: '5d9f1140f10a81216cfd4408', name: 'Department #1'});
        await testDepOne.save();

        const testDepTwo = new Department({_id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2'});
        await testDepTwo.save();
    });

    it('/:id should delete document from db and return success', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        const deletedDep = await Department.findOne({name: 'Department #1'})
        expect(res.status).to.be.equal(200);
        expect(deletedDep).to.be.null;
    });

    after(async () => {
        await Department.deleteMany();
    });

    after(() => {
        mongoose.models = {};
    });
});