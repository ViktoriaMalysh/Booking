const { Project } = require("../sequelize");
const { User } = require("../sequelize");

//------------------------PROJECT---------------------------

module.exports.showProj = async function (req, res) {
  //done
  try {
    await Project.sequelize.sync({ alter: true });
    await Project.findAll({ raw: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};

module.exports.deleteProj = async function (req, res) {
  //done
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

module.exports.searchProj = async function (req, res) {
  //done
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

//------------------------USERS---------------------------

module.exports.showUser = async function (req, res) {
  //done
  try {
    await User.sequelize.sync({ alter: true });
    await User.findAll({ raw: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    await User.sequelize.sync({ alter: true });
    const id = { id: req.body.id };
    const deleteUser = await User.destroy({ where: { id: id } });
    if (deleteUser === 1) res.status(200).json({ delete: true });
    else res.status(404).json({ delete: false });
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ delete: false });
  }
};

module.exports.searchUser = async function (req, res) {
  try {
    await User.sequelize.sync({ alter: true });
    const option = req.body.option;
    console.log("option", option)
    if (option > 1) {
      const search = req.body.search
      await User.findAll({ where: { option: search }, raw: true })
      .then((result) => {
        if (result) res.json(result)
        else(res.status(404).json({message: "User not found"}))
      })
      .catch((err) => console.log(err));
    } else {
      const name = req.body.name;
      console.log(name);
      await User.findAll({ where: { name: name }, raw: true })
        .then((result) => {
          if (result) res.json(result)
          else(res.status(404).json({message: "User not found"}))
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log("Error: " + err);
    res.status(404).json({ flag: false });
  }
};

// module.exports.searchUser = async function (req, res) {
//   try {
//     await User.sequelize.sync({ alter: true });
//     const name = req.body.name;
//     console.log(name)
//     await User.findAll({ where: { name: name }, raw: true })
//       .then((result) => {
//         if (result) res.json(result);
//       })
//       .catch((err) => console.log(err));
//   } catch (err) {
//     console.log("Error: " + err);
//     res.status(404).json({ flag: false });
//   }
// };
