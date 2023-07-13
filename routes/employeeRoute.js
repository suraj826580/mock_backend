const { Router } = require("express");
const { employeeModal } = require("../models/employeeModal");
const { UserModel } = require("../models/UserModal");
const e = require("express");
const employeeRoute = Router();

employeeRoute.post("/add", async (req, res) => {
  try {
    const employeeDetails = new employeeModal(req.body);
    await employeeDetails.save();
    res.status(200).send({ msg: "Employee Data has Been Stored" });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

// - Get The own employee
employeeRoute.get("/", async (req, res) => {
  try {
    const employees = await employeeModal.find({
      userRelation: req.body.userRelation,
    });
    res.send({ employees });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { employeeRoute };

// Delete

employeeRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await employeeModal.findOne({ _id: id });
  try {
    if (req.body.userRelation === employee.userRelation) {
      await employeeModal.findByIdAndDelete({ _id: id });
    } else {
      res.send({ msg: "You are not Authorized to do this action" });
    }
    res.send({ msg: "employee has been deleted" });
  } catch (error) {
    res.send({ msg: error });
  }
});
