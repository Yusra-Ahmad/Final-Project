import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
    service: { type: Schema.Types.ObjectId, ref: 'Services', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;