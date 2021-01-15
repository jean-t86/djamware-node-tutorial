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
      const expectedOrderBy = [{ model: Student, as: 'students' }, 'createdAt', 'DESC'];
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findAll', fake);

      await classroomRepo.findAll();

      assert.ok(fake.calledOnce);
      const actualOrderBy = fake.getCall(0).args[0].order;
      assert.deepEqual(actualOrderBy[1], expectedOrderBy);
    });
  });

  describe('find by primary key', function () {
    it('calls findByPk on sequelize model', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      const id = 2;

      await classroomRepo.findByPk(2);

      assert.ok(fake.calledOnce);

    });

    it('passes the id to findByPk', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      const id = 2;

      await classroomRepo.findByPk(2);

      assert.ok(fake.calledOnce);
      assert.equal(fake.getCall(0).args[0], id);
    });

    it('includes students in the result', async function () {
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

  describe('create', function () {
    it('calls create on sequelize model', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'create', fake);

      await classroomRepo.create('');

      assert.ok(fake.calledOnce);
    });

    it('calls create with class name as argument', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'create', fake);
      const className = 'ECL2';

      await classroomRepo.create(className);

      assert.ok(fake.calledOnce);
      assert.deepEqual(
        fake.getCall(0).args[0],
        {
          class_name: className
        }
      );
    });
  });

  describe('update', function () {
    it('calls findByPk to find the classroom to update', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);

      await classroomRepo.update(1, "ECL3");

      assert.ok(fake.calledOnce);
    });

    it('calls findByPk with id as argument', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'findByPk', fake);
      const id = 1;

      await classroomRepo.update(id, "ECL3");

      assert.ok(fake.calledOnce);
      assert.equal(fake.getCall(0).args[0], id);
    });

    it('returns null if classroom to update was not found', async function () {
      sinon.replace(Classroom, 'findByPk', sinon.fake());
      const result = await classroomRepo.update(1, "ECL3");

      assert.equal(result, null);
    });

    it('calls update on sequelize model if classroom is found', async function () {
      // Fake findByPk
      const oldClassName = "ECL3";
      const classroom = {
        class_name: oldClassName
      };
      const fakeFindByPk = sinon.fake.returns(classroom);
      sinon.replace(Classroom, 'findByPk', fakeFindByPk);

      // Fake update
      const id = 1;
      const newClassName = "ECL1";
      const fakeUpdate = sinon.fake();
      sinon.replace(Classroom, 'update', fakeUpdate);

      await classroomRepo.update(id, newClassName);

      assert.ok(fakeUpdate.calledOnce);
      assert.deepEqual(
        fakeUpdate.getCall(0).args[0],
        {
          class_name: newClassName
        }
      );
    });
  });

  describe('delete', function () {
    it('calls destroy on the sequelize model', async function () {
      const fake = sinon.fake();
      sinon.replace(Classroom, 'destroy', fake);

      await classroomRepo.delete(1);

      assert.ok(fake.calledOnce);
    });

    it('calls destroy with id as argument to a where object', async function () {
      const id = 1;
      const fake = sinon.fake();
      sinon.replace(Classroom, 'destroy', fake);

      await classroomRepo.delete(id);

      assert.ok(fake.calledOnce);
      assert.deepEqual(
        fake.getCall(0).args[0],
        {
          where: {
            id,
          }
        }
      );
    });
  });
});
