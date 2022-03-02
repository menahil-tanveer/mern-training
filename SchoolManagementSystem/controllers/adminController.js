const adminModel = require("../models").Admin;
// ---------------------------------------------- CREATE METHOD----------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible creating admin profile
 */
const createAdmin = async (req, res) => {
  let { adminId, fullName, email, password } = req.body;
  try {
    const newAdmin = await adminModel.create({
      adminId,
      fullName,
      email,
      password,
    });
    res.status(200).send(newAdmin);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- GET METHODS-------------------------------------------------------
/**
 *
 * @param {*} req
 * @param {*} res
 * @description This method is responsible for fetching all admins from database
 */
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.findAll();
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @description This method is responsible for fetching admin by id
 *
 */
const getAdminById = async (req, res) => {
  try {
    const admin = await adminModel.findOne({
      where: {
        adminId: req.params.adminId,
      },
    });
    if (!admin) res.status(404).send("Admin not found!");
    else {
      res.status(200).send(admin);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------- UPDATE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for updating admin data in database
 */
const updateAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findOne({
      where: {
        adminId: req.params.adminId,
      },
    });
    if (!admin) res.status(404).send("Admin not found");
    else {
      const updatedAdmin = await admin.update(req.body);
      await admin.save();
      res.status(200).send(updatedAdmin);
    }
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- DELETE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for deleting admin from database
 */
const deleteAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findOne({
      where: {
        adminId: req.params.adminId,
      },
    });
    if (!admin) res.status(404).send("Admin not found");
    else {
      await admin.destroy({
        where: {
          adminId: req.params.adminId,
        },
      });
      res.status(200).send("Admin successfully deleted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
