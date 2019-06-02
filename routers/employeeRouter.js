const express = require("express");
const bodyParser = require("body-parser");
const Employee = require("../models/employee");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (req, res, next) {
    console.log("enter employee api:");
    next();
});
router.route("/")
    .post(function (req, res) {
        console.log("creating a new employee");
        const emp = new Employee();
        emp.name = req.body.name;
        emp.title = req.body.title;
        emp.sex = req.body.sex;
        emp.start_date = req.body.start_date;
        emp.office_phone = req.body.office_phone;
        emp.cell_phone = req.body.cell_phone;
        emp.sms = req.body.sms;
        emp.email = req.body.email;
        emp.manager = req.body.manager ? req.body.manager : null;
        emp.save(function (error) {
            if (error) {
                res.status(500).send({ status: 500, message: 'database save fail', type: 'server error' });
            } else {
                res.json({ message: "employee successfully created!" });
            }
        });
    })
    .get(function(req, res){
        console.log("get employees list");
        //console.log(req.query);
        const page = parseInt(req.query.curpage);
        const limit = parseInt(req.query.numperpage);
        const query = Employee.find(function(error, employeeList){
            if(error){
                res.status(500).send({status:500, message:"database", type: "server error"});
            }
        });
        const option = {page: page, limit:limit};
        Employee.paginate(query, option)
            .then((result)=>{
                console.log(`page: ${page}, limit: ${limit}`);
                res.json(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({status:500, message:"database", type: "server error"});
            });
    });
router.route("/:employee_id")
    .get(function(req, res){
        console.log(`getting this employee: ${req.params.employee_id}`);
        Employee.findById(req.params.employee_id, function(error, emp){
            if(error){
                res.status(500).send({status:500, message:"database", type: "server error"});
            }else{
                res.json(emp);
            }
        });
    })
    .put(function(req, res){
        console.log(`editing this employee: ${req.params.employee_id}`);
        Employee.findById(req.params.employee_id, function(error, emp){
            if(error){
                res.status(500).send({status:500, message:"database", type: "server error"});
            }else{
                const list = ["name", "title", "sex", "start_date", "office_phone", "cell_phone", "sms", "email", "manager", "dr"];
                list.forEach((key)=>{
                    if(req.body[key]){
                        emp[key] = req.body[key];
                        console.log(`update ${key} of employee`);
                    }
                });
                emp.save(function(error){
                    if(error){
                        res.status(500).send({status:500, message:"database", type: "server error"});
                    }else{
                        res.json({ message: `employee ${req.params.employee_id} has been updated!` });
                    }
                });
            }
        });
    })
    .delete(function(req, res){
        console.log(`delete this employee: ${req.params.employee_id}`)
        Employee.deleteOne({_id: req.params.employee_id}, function(error, emp){
            if(error){
                res.status(500).send({status:500, message:"database", type: "server error"});
            }else{
                res.json({message: "successfully delet employee " + req.params.employee_id});
            }
        });
    })
module.exports = router;
