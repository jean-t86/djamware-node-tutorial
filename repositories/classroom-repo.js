const Student = require('../models').Student;

class ClassroomRepo {
  constructor(classroomModel) {
    this.classroomModel = classroomModel;
  }

  async findAll() {
    const classrooms = await this.classroomModel
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
    const classroom = await this.classroomModel
      .findByPk(id, {
        include: [{
          model: Student,
          as: 'students'
        }],
      });
    return classroom;
  }

  async create(className) {
    const result = await this.classroomModel
      .create({
        class_name: className
      });
    return result;
  }

  async update(id, className) {
    const classroom = await this.classroomModel
      .findByPk(id);
    let result = null;
    if (classroom) {
      result = await this.classroomModel.update({
        class_name: className
      });
    }
    return result;
  }

  async delete(id) {
    const result = await this.classroomModel
      .destroy({
        where: {
          id,
        }
      });
    return result;
  }

  async addWithStudents(class_name, students) {
    const result = await this.classroomModel
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

module.exports = ClassroomRepo;
