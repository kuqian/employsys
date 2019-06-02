const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const EmployeeSchema = new Schema({
    name: String,
    title: String,
    sex: String,
    start_date: Date,
    office_phone: String,
    cell_phone: String,
    sms: String,
    email: String,
    manager: {
        manager_name: String,
        manager_id: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
    dr: {
        type: Array,
        default: []
    }
});
EmployeeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Employee", EmployeeSchema);
// is it better this way?:
// direct_reports:[{
//     type:Schema.Types.ObjectId,
//     ref: "Employee"
// }]