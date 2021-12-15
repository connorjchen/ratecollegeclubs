import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        clubId: { type: String, required: true },
        rating: { type: Number, required: true },
        timeCommitment: { type: Number, required: true },
        recommend: { type: Boolean, required: true },
        class: { type: String, required: true },
        major: { type: String, required: true },
        position: { type: String, required: true },
        comment: { type: String, required: true },
        reported: { type: Boolean, required: true },
        helpful: { type: Number, required: true },
    },
    //timestamp time created at and time last updated at
    { timestamps: true, }
);
const Review = mongoose.model('Review', reviewSchema);

export default Review;
