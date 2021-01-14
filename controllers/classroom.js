const ClassroomRepo = require('../repositories/classroom-repo');

module.exports = {
  async list(req, res) {
    const result = await ClassroomRepo.findAll();
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(400).send();
    }
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    if (id) {
      const result = await ClassroomRepo.findByPk(req.params.id);
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
      const result = await ClassroomRepo.create(className);
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
      const result = await ClassroomRepo.update(id, className);
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
      const result = await ClassroomRepo.delete(id)
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
      const result = await ClassroomRepo.addWithStudents(className, students);
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
