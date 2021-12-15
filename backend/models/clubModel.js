import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        schoolId: { type: String, required: true },
        numReviews: { type: Number, required: true },
        totalRating: { type: Number, required: true },
        totalTimeCommitment: { type: Number, required: true },
        totalRecommend: { type: Number, required: true },
        numInterviews: { type: Number, required: true },
        totalDifficulty: { type: Number, required: true },
        valid: { type: Boolean, required: true },
    },
    //timestamp time created at and time last updated at
    { timestamps: true, }
);
const Club = mongoose.model('Club', clubSchema);

export default Club;
