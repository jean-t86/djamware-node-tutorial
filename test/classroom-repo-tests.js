const sinon = require('sinon');
const { assert, expect } = require('chai');
const ClassroomRepo = require('../repositories/classroom-repo');
const Classroom = require('../models').Classroom;
const Student = require('../models').Student;

describe('Classroom respository', function () {
  let classroomRepo;

  beforeEach(function () {
    classroomRepo = new ClassroomRepo(Classroom);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('findAll', function () {
    it('calls findAll on sequelize model', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findAll', fake);

      await classroomRepo.findAll();

      assert.ok(fake.calledOnce);
    });

    it('includes students in the result', async function () {
      const include = [{
        model: Student,
        as: 'students'
      }];
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findAll', fake);

      await classroomRepo.findAll();

      assert.ok(fake.calledOnce);
      assert.deepEqual(fake.getCall(0).args[0].include, include);
    });

    it('orders classroom results by creation date in descending order', async function () {
      const expectedOrderBy = ['createdAt', 'DESC'];
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findAll', fake);

      await classroomRepo.findAll();

      assert.ok(fake.calledOnce);
      const actualOrderBy = fake.getCall(0).args[0].order;
      assert.deepEqual(actualOrderBy[0], expectedOrderBy);
    });

    it('orders student results by creation date in descending order', async function () {
      const expectedOrderBy = [{ model: Student, as: 'students' },'createdAt', 'DESC'];
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findAll', fake);

      await classroomRepo.findAll();

      assert.ok(fake.calledOnce);
      const actualOrderBy = fake.getCall(0).args[0].order;
      assert.deepEqual(actualOrderBy[1], expectedOrderBy);
    });
  });

  describe('find by primary key', function() {
    it('calls findByPk on sequelize model', async function() {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      const id = 2;

      await classroomRepo.findByPk(2);

      assert.ok(fake.calledOnce);

    });

    it('passes the id to findByPk', async function() {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      const id = 2;

      await classroomRepo.findByPk(2);

      assert.ok(fake.calledOnce);
      assert.equal(fake.getCall(0).args[0], id);
    });

    it('includes students in the result', async function() {
      const include = [{
        model: Student,
        as: 'students'
      }];
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      
      await classroomRepo.findByPk(2);

      assert.ok(fake.calledOnce);
      assert.deepEqual(fake.getCall(0).args[1].include, include);
    });
  });
});
