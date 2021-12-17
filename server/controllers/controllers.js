const keys = require("../keys");
const { User, Project } = require("../sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../sequelize");
const bcrypt = require("bcryptjs");

module.exports.authentication = async function (req, ress) {
  let candidat = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    role: 1,
  };
  await User.sequelize.sync({ alter: true });
  try {
    const flagCheckEmail = await checkEmail(candidat.email);

    if (!flagCheckEmail) {
      if (candidat.email === "admin@gmail.com") {
        candidat = {
          name: req.body.name,
          surname: req.body.surname,
          year: req.body.year,
          email: req.body.email,
          password: req.body.password,
          role: 2,
        };
      }
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync(candidat.password, salt);
      let user = await User.build({
        name: candidat.name,
        surname: candidat.surname,
        year: candidat.year,
        email: candidat.email,
        password: pass,
        role: candidat.role,
      });
      await user.save();
      console.log(`${user.name} was saved to the database!`);
      const id = await setIdUser(candidat);
      const token = jwt.sign(
        { email: candidat.email, password: pass, role: candidat.role, id: id },
        keys.jwt,
        { expiresIn: 300 }
      );
      ress.status(200).json({ token: token, id: id });
    } else ress.status(404).json({ flag: false });
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports.authorization = async function (req, ress) {
  const candidat = { email: req.body.email, password: req.body.password };
  try {
    const check_email_login = await checkEmail(candidat.email);

    if (check_email_login) {
      const pass = await checkPassword(candidat);
      console.log(pass);
      const flag = bcrypt.compareSync(candidat.password, pass);
      if (flag) {
        const rol = await checkRole(candidat);
        const id = await setIdUser(candidat);
        const token = jwt.sign(
          { email: candidat.email, password: pass, role: rol, id: id },
          keys.jwt,
          { expiresIn: 300 }
        );
        ress.status(200).json({ token: token, id: id });
      } else ress.status(404).json({ flag: false });
    } else ress.status(404).json({ flag: false });
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports.logout = async function (req, ress) {
  try {
    const token = await req.headers["authorization"];
    const decode_token = await decodeToken(token);

    const user = {
      email: decode_token.email,
      password: decode_token.password,
      role: decode_token.role,
      id: decode_token.id,
    };

    const temp = await User.destroy({
      where: { email: user.email, password: user.password },
    });

    const temp1 = await Project.destroy({ where: { id_user: user.id } });
    if ((temp === 1) | (temp1 === 1)) {
      ress.status(200).json({ delete: true });
    } else ress.status(404).json({ delete: false });
  } catch (err) {
    console.log("Error: " + err);
    ress.status(404);
  }
};

module.exports.verifyToken = async function (req, res) {
  try {
    const token = await req.headers["authorization"];
    const decode_token = jwt.decode(token);
    const user = {
      email: decode_token.email,
      password: decode_token.password,
      role: decode_token.role,
      id: decode_token.id,
    };
    console.log(decode_token)
console.log(user.email)
    const check_email_login = await checkEmail(user.email);
    console.log('res', check_email_login)
    await jwt.verify(token, keys.jwt, function (err, decoded) {
      if (err) {
        const newToken = jwt.sign(
          {
            email: user.email,
            password: user.password,
            role: user.role,
            id: user.id,
          },
          keys.jwt,
          { expiresIn: 600 }
        );

        res.status(200).json({  
          token: newToken,
          id: user.id,
          name: check_email_login.name,
          surname: check_email_login.surname,
          email: check_email_login.email,
          role: check_email_login.role,
        });
      } else res.status(200).json({ 
          token: token, 
          id: user.id, 
          name: check_email_login.name, 
          surname: check_email_login.surname, 
          email: check_email_login.email, 
          role: check_email_login.role 
        });
    });
  } catch (err) {
      console.log("Error: " + err);
      res.status(404);
    }
};

module.exports.setId = async function (req, res) {
  try {
    const token = await req.headers["authorization"];
    const decode_token = await decodeToken(token);
    const user = {
      email: decode_token.email,
      password: decode_token.password,
      role: decode_token.role,
      id: decode_token.id,
    };
    if (id != 0) res.status(200).json({ id: user.id });
    else res.status(404);
  } catch (err) {
    console.log("Error: " + err);
    res.status(404);
  }
};

checkRole = async function (req, res) {
  const email = req.email;
  const result = await User.findOne({ where: { email: email } });
  let role = 0;
  if (result != null) {
    let l = result.toJSON();
    role = l.role;
  }
  if (role === 1) return 1;
  return 2;
};

checkPassword = async function (req, res) {
  const email = req.email;
  const result = await User.findOne({ where: { email: email }, raw: true });
  if (result != null) return result.password;
  return false;
};

checkEmail = async function (req, res) {
  const email = req;
  const result = await User.findOne({ where: { email: email }, raw: true });
  if (result === null) return false;
  else if (result.email === email) return result;
};

checkEmailLogin = async function (req, res) {
  const user = req;
  const result = await User.findOne({
    where: { email: user.email, password: user.password },
  });
  if (result != null) return true;
  else return false;
};

setIdUser = async function (req, res) {
  const user = req;
  const result = await User.findOne({
    attributes: ["id"],
    where: { email: user.email },
  });
  const id = result.dataValues.id;
  return id;
};

decodeToken = async function (req, res) {
  const token = await req;
  const decode_token = jwt.decode(token);
  const user = {
    email: decode_token.email,
    password: decode_token.password,
    role: decode_token.role,
    id: decode_token.id,
  };
  return user;
};
