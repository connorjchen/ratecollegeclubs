import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
    {
        clubId: { type: String, required: true },
        difficulty: { type: Number, required: true },
        major: { type: String, required: true },
        roleApplied: { type: String, required: true },
        comment: { type: String, required: true },
        reported: { type: Boolean, required: true },
        helpful: { type: Number, required: true },
    },
    //timestamp time created at and time last updated at
    { timestamps: true, }
);
const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
