const ClassroomRepo = require('../repositories/classroom-repo');

const Classroom = require('../models').Classroom;
const classroomRepo = new ClassroomRepo(Classroom);

module.exports = {
  async list(req, res) {
    const result = await classroomRepo.findAll();
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(400).send();
    }
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    if (id) {
      const result = await classroomRepo.findByPk(req.params.id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  },

  async create(req, res) {
    const className = req.body.class_name;
    if (className) {
      const result = await classroomRepo.create(className);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const className = req.body.class_name;
    if (id && className) {
      const result = await classroomRepo.update(id, className);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  },

  async delete(req, res) {
    const id = Number(req.params.id);
    if (id) {
      const result = await classroomRepo.delete(id)
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  },

  async addWithStudents(req, res) {
    const students = req.body.students;
    const className = req.body.class_name;
    if (students && className) {
      const result = await classroomRepo.addWithStudents(className, students);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  },
};
