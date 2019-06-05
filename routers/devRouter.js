const express = require("express");
const bodyParser = require("body-parser");
const Employee = require("../models/employee");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (req, res, next) {
    console.log("enter dev api:");
    next();
});
router.route("/manager")
    .get(function (req, res) {
        console.log("get the manager");
        Employee.find({ _id: req.query.manager_id }, function (error, docs) {
            if (error) res.status(500).send({ status: 500, message: "database error" });
            else {
                res.json(docs);
            }
        })
    });
router.route("/dr")
    .get(async function (req, res) {
        console.log(`get the dr of: ${req.query.eid}`);
        const emp = await Employee.findById(req.query.eid);
        console.log(typeof(emp.dr));
        console.log(emp.dr);
        Employee.find({ '_id': { $in: emp.dr } }, function (error, docs) {
            if (error) res.status(500).send({ status: 500, message: "database error" });
            else {
                res.json(docs);
            }
        })
    });
router.route("/managerlist")
    .get(function (req, res) {
        console.log("get list of manager id and name");
        Employee.find({}, "name _id", function (error, docs) {
            if (error) {
                res.status(500).send({ status: 500, message: "database", type: "server error" });
            } else {
                res.json(docs);
            }
        });
    })
router.route("/testimag")
    .post(function(req, res){
        console.log();
    })
module.exports = router;