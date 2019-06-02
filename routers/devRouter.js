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
router.route("/")
    .get(function (req, res) {
        console.log("dev query:");
        console.log(req.query);
        const query = Employee.find({function(error, emp){
            if(error){
                console.log(error);
            }
        }});
        const option = {
            page: 1,
            limit: 8
        }
        Employee.paginate(query, option)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                console.log(error);
            })

    })
    .post(function (req, res) {
        console.log("importing employeelist");
        const initData = req.body.initData.map((ele) => {
            ele.office_phone = "" + ele.office_phone;
            ele.cell_phone = "" + ele.cell_phone;
            ele.sms = "" + ele.sms;
            ele.manager = null;
            ele.dr = [];
            return ele;
        })
        console.log(initData);
        Employee.insertMany(initData, function (error, emps) {
            if (error) {
                res.status(500).send({ status: 500, message: 'database save fail', type: 'server error', error: error });
            } else {
                res.json({ message: "database initialization success" });
            }
        })

    });
module.exports = router;