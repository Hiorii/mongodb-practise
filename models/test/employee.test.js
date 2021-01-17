const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no "firstName", "lastName", "department"  arg', () => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
        const cases = [ {firstName: {}, lastName: {}, department: {}}, {firstName: [], lastName: [], department: []} ];
        for (let arg of cases) {
            const emp = new Employee(arg);

            emp.validate((err) => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should throw an error if "firstName", "lastName", "department" are too short or too long', () => {
        const cases = [ {firstName: 'A', lastName: 'Se', department: 'F'}, {firstName: 'Qw', lastName: 'sd', department: 'f'} ];;
        for (let arg of cases) {
            const emp = new Employee(arg);

            emp.validate((err) => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if "data" is okay', () => {
        const cases = [ {firstName: 'Bart', lastName: 'Jan', department: 'IT'}, {firstName: 'Qwe', lastName: 'rty', department: 'zxc'} ];;
        for (let arg of cases) {
            const emp = new Employee(arg);

            emp.validate((err) => {
                expect(err).to.not.exist;
            });
        }
    });
});