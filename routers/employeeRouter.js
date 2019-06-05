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
    .post(async function (req, res) {
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
        const managerID = req.body.manager;
        const manager = managerID ? await Employee.findById(managerID) : null;
        if (manager) {
            emp.manager.manager_id = manager._id;
            emp.manager.manager_name = manager.name;
            manager.dr.push(emp._id);
            await manager.save();
        }
        console.log(emp);
        await emp.save();
        res.json({ message: "create success" });
    })
    .get(function (req, res) {
        console.log("get employees list");
        const page = parseInt(req.query.curpage);
        const limit = parseInt(req.query.numperpage);
        const sortParam = req.query.sortparam;
        const order = req.query.order === "true" ? 1 : -1;
        const searchText = req.query.searchtext;
        const queryConfig = {
            $or: [
                { name: new RegExp(searchText, "i") },
                { title: new RegExp(searchText, "i") },
                { office_phone: new RegExp(searchText, "i") },
                { cell_phone: new RegExp(searchText, "i") },
                { sms: new RegExp(searchText, "i") },
                { email: new RegExp(searchText, "i") },
            ]
        }
        const query = Employee.find(queryConfig, function (error, employeeList) {
            if (error) {
                res.status(500).send({ status: 500, message: "database", type: "server error" });
            }
        });
        const option = {
            page: page,
            limit: limit
        };
        if (sortParam === "manager") option.sort = { 'manager.manager_name': order };
        else if (sortParam !== "") option.sort = { [sortParam]: order };
        Employee.paginate(query, option)
            .then((result) => {
                console.log(`page: ${page}, limit: ${limit}`);
                res.json(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: 500, message: "database", type: "server error" });
            });
    });
router.route("/:employee_id")
    .get(async function (req, res) {
        console.log(`getting this employee: ${req.params.employee_id}`);
        const emp = await Employee.findById(req.params.employee_id);
        const banlist = [];
        let queue = [emp._id];
        while (queue.length > 0) {
            const curID = queue.shift();
            banlist.push(curID);
            const cur = await Employee.findById(curID).exec();
            console.log(`name: ${cur.name}`);
            queue = [...queue, ...cur.dr];
        }
        const managerlist = await Employee.find(
            { '_id': { $nin: banlist } },
            "name _id",
        );
        res.json({ managerlist, emp });
    })
    .put(async function (req, res) {
        console.log(`editing this employee: ${req.params.employee_id}`);
        const emp = await Employee.findById(req.params.employee_id);
        const oldManagerID = emp.manager ? emp.manager.manager_id : "";
        const oldManager = emp.manager ? await Employee.findById(oldManagerID) : null;
        const newManager = req.body.manager ? await Employee.findById(req.body.manager) : null;
        emp.manager = null;
        const same1 = oldManager === newManager;
        const same2 = (oldManager!==null && newManager!==null) && oldManager._id.equals(newManager._id);
        if (!same1 && !same2) {
            if (oldManager) {
                const index = oldManager.dr.indexOf(emp._id);
                if (index > -1) {
                    const a1 = oldManager.dr.slice(0, index);
                    const a2 = oldManager.dr.slice(index + 1, oldManager.dr.length)
                    oldManager.dr = [...a1, ...a2]
                }
            }
            if (newManager) {
                newManager.dr.push(emp._id);
                emp.manager = {
                    manager_id: newManager._id,
                    manager_name: newManager.name
                }
            }
        }
        if (req.body.name !== emp.name) {
            emp.name = req.body.name;
            for (let drID of emp.dr) {
                const dr = await Employee.findById(drID);
                dr.manager.manager_name = req.body.name;
                await dr.save();
                console.log(dr.name + " manager name change");
            }
        }
        const list = [
            "title", "sex", "start_date",
            "office_phone", "cell_phone",
            "sms", "email"
        ];
        list.forEach((key) => {
            emp[key] = req.body[key];
        });
        console.log(emp);
        console.log(oldManager);
        console.log(newManager);
        if (oldManager) {
            await oldManager.save();
        }
        if (newManager && !same2) {
            await newManager.save();
        }
        await emp.save();
        res.json({ message: "edit success" });
    })
    .delete(async function (req, res) {
        console.log(`delete this employee: ${req.params.employee_id}`)
        const emp = await Employee.findById(req.params.employee_id);
        const manager = emp.manager && emp.manager.manager_id ? await Employee.findById(emp.manager.manager_id) : null;
        if (manager) {
            const index = manager.dr.indexOf(emp._id);
            if (index > -1) {
                const a1 = manager.dr.slice(0, index);
                const a2 = manager.dr.slice(index + 1, manager.dr.length);
                manager.dr = [...a1, ...a2];
            }
        }
        for (let drID of emp.dr) {
            const dr = await Employee.findById(drID);
            if (manager) {
                dr.manager = { manager_id: manager._id, manager_name: manager.name };
                manager.dr.push(drID);
                console.log(`${dr.name} -> ${manager.name}`);
            } else {
                if(dr !== null) dr.manager = null;
            }
            if(dr !== null) await dr.save();
        }
        if (manager) {
            await manager.save();
        }
        await Employee.deleteOne({ _id: req.params.employee_id });
        res.json({ message: "delete success" });
    })
module.exports = router;
