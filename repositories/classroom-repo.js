const Classroom = require('../models').Classroom;
const Student = require('../models').Student;

class ClassroomRepo {
  async findAll() {
    const classrooms = await Classroom
      .findAll({
        include: [{
          model: Student,
          as: 'students'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
        ],
      });
    return classrooms;
  }

  async findByPk(id) {
    const classroom = await Classroom
    .findByPk(id, {
      include: [{
        model: Student,
        as: 'students'
      }],
    });
    return classroom;
  }

  async create(className) {
    const result = await Classroom.create({
      class_name: className
    });
    return result;
  }

  async update(id, className) {
    const classroom = await Classroom.findByPk(id);
    let result;
    if (classroom) {
      result = await classroom.update({
          class_name: className
        });
    }
    return result;
  }

  async delete(id) {
    const result = await Classroom.destroy({
      where: {
        id,
      }
    });
    return result;
  }

  async addWithStudents(class_name, students) {
    const result = await Classroom
    .create({
      class_name: class_name,
      students,
    }, {
      include: [{
        model: Student,
        as: 'students'
      }]
    });
    return result;
  }
}

module.exports = new ClassroomRepo();
