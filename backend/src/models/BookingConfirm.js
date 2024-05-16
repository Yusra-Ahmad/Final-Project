import { model, Schema } from "mongoose";

const bookingConfirmSchema = new Schema({
    service:{type:String, required: true},
    price:{type: Number},
    startTime: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const BookingConfirm = model("bookingConfirm", bookingConfirmSchema);

export default BookingConfirm;