const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();
const PORT = 5000;

// ===============================
// Middleware
// ===============================

app.use(express.json());

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));


// ===============================
// MongoDB Connection
// ===============================

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });


// ===============================
// Pages
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "form.html"));
});

app.get("/form.html", (req, res) => {
    res.sendFile(path.join(publicPath, "form.html"));
});

app.get("/data.html", (req, res) => {
    res.sendFile(path.join(publicPath, "data.html"));
});


// ===============================
// POST API - Add Student
// ===============================

app.post("/api/students", async (req, res) => {

    try {

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course,
            semester: req.body.semester
        });

        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student added successfully",
            student: savedStudent
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to add student",
            error: error.message
        });

    }
});


// ===============================
// GET API - Students + Pagination
// ===============================

app.get("/api/students", async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const students = await Student.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        const totalStudents = await Student.countDocuments();

        const totalPages = Math.ceil(totalStudents / limit);

        res.status(200).json({
            students: students,
            currentPage: page,
            totalStudents: totalStudents,
            totalPages: totalPages,
            limit: limit
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch students",
            error: error.message
        });

    }
});


// ===============================
// DELETE API - Delete Student
// ===============================

app.delete("/api/students/:id", async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete student",
            error: error.message
        });

    }
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});