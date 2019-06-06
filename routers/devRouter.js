const express = require("express");
const bodyParser = require("body-parser");
const Employee = require("../models/employee");
const router = express.Router();
const base64Img = require('base64-img');
const uniqid = require('uniqid');
router.use(bodyParser.json({ limit: '5MB' }));
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
        console.log("img:");
        console.log(typeof(req.body.img));
        console.log(__dirname);
        const name = uniqid();
        // base64Img.imgSync(req.body.img, './zpics', name, function(err, filepath) {
        //     res.json({message: "test success", path:filepath});
        //     if(err)console.log("error");
        // });
        const filepath = base64Img.imgSync(req.body.img, './zpics', name);
        res.json({message: "test success", path:filepath});
    })
module.exports = router;