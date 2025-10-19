const Employee = require("../model/EmployeeModal");
const { validationResult } = require("express-validator");

exports.createEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, address, position } = req.body;

    let employee = new Employee({ name, email, phone, address, position });
    await employee.save();

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
 

exports.editEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, phone, address, position } = req.body;
    const employeeId = req.params.id;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, email, phone, address, position },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee Updated Successfully",
      employee: updatedEmployee,
    });
  } catch {
    res.status(500).json({ message: "Server Error " });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
      employeeId: deletedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
