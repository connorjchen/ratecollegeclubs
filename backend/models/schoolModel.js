import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        numClubs: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        valid: { type: Boolean, required: true }
    },
    //timestamp time created at and time last updated at
    { timestamps: true, }
);
const School = mongoose.model('School', schoolSchema);

export default School;
