const { Project } = require("../sequelize");

module.exports.addTime = async function (req, res) {
  try {
    await Project.sequelize.sync({ alter: true });
    const r = req.body.time / 1000;
    const time = {
      projectName: req.body.projectName,
      id: req.body.id,
      h: r,
    };
    const tt = await Project.findAll({
      where: { projectName: time.projectName },
      raw: true,
    })
      .then((result) => {
        if (result) console.log(result[0].h);
        let tt = result[0].h;
        tt = tt + time.h;
        const ttt = tt;
        const t = ttt.toFixed(0);
        Project.update(
          { h: t },
          { where: { projectName: time.projectName, id_user: time.id } }
        );
        res.status(200).json({ flag: true });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};

module.exports.create = async function (req, res) {
  try {
    await Project.sequelize.sync({ alter: true });
    const projects = { nameProject: req.body.projectName, id: req.body.id };
    let project = Project.build({
      projectName: projects.nameProject,
      start: 0,
      end: 0,
      time: 0,
      id_user: projects.id,
    });
    await project.save();
    res.status(200).json({ projectName: project.projectName });
  } catch (err) {
    console.log("Error: " + err);
    res.status(404);
  }
};

module.exports.delete = async function (req, res) {
  try {
    await Project.sequelize.sync({ alter: true });
    const project = { id: req.body.id };
    const deleteProject = await Project.destroy({ where: { id: project.id } });
    if (deleteProject === 1) res.status(200).json({ delete: true });
    else res.status(404).json({ delete: false });
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ delete: false });
  }
};

module.exports.show = async function (req, res, next) {
  try {
    await Project.sequelize.sync({ alter: true });
    const id = req.body.id;
    await Project.findAll({ where: { id_user: id }, raw: true })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};

module.exports.search = async function (req, res) {
  try {
    await Project.sequelize.sync({ alter: true });
    const projectName = req.body.projectName;
    await Project.findAll({ where: { projectName: projectName }, raw: true })
      .then((result) => {
        if (result) res.json(result);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};