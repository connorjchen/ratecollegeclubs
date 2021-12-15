import express from 'express';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler'
import Review from '../models/reviewModel.js';
import Club from './../models/clubModel.js';
import School from './../models/schoolModel.js';

const reviewRouter = express.Router();

reviewRouter.get('/', expressAsyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    res.send(reviews);
}));

// reviewRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     // await Review.remove({});

//     // const createdReviews = await Review.insertMany(data.reviews);
//     // res.send({ createdReviews });
// }));

reviewRouter.get('/list/:clubId', expressAsyncHandler(async (req, res) => {
    const reviews = await Review.find({ clubId: req.params.clubId, reported: false }, null, { sort: { createdAt: -1 } });
    res.send(reviews);
}));

reviewRouter.get('/reported/list', expressAsyncHandler(async (req, res) => {
    const reviews = await Review.find({ reported: true }, null, { sort: { updatedAt: -1 } });
    res.send(reviews);
}));

reviewRouter.post('/post', expressAsyncHandler(async (req, res) => {
    const review = new Review({
        clubId: req.body.clubId,
        rating: req.body.rating,
        timeCommitment: req.body.timeCommitment,
        recommend: req.body.recommend,
        class: req.body.classField,
        major: req.body.major,
        position: req.body.position,
        comment: req.body.comment,
        reported: false,
        helpful: 0,
    })
    const createdReview = await review.save()

    const club = await Club.findById(req.body.clubId);
    club.numReviews++;
    club.totalRating += req.body.rating;
    club.totalTimeCommitment += req.body.timeCommitment;
    club.totalRecommend = req.body.recommend === true ? club.totalRecommend + 1 : club.totalRecommend
    await club.save()

    const school = await School.findById(club.schoolId);
    school.numReviews++;
    await school.save()

    res.send({
        _id: createdReview._id
    });
}));

reviewRouter.patch('/report', expressAsyncHandler(async (req, res) => {
    const review = await Review.findById(req.body.reviewId);
    review.reported = true
    await review.save()

    const club = await Club.findById(review.clubId);
    club.numReviews--;
    club.totalRating -= review.rating;
    club.totalTimeCommitment -= review.timeCommitment;
    club.totalRecommend = review.recommend === true ? club.totalRecommend - 1 : club.totalRecommend
    await club.save()

    const school = await School.findById(club.schoolId);
    school.numReviews--;
    await school.save()

    res.send(review);
}));

reviewRouter.patch('/validate', expressAsyncHandler(async (req, res) => {
    const review = await Review.findById(req.body.reviewId);
    review.reported = false
    await review.save()

    const club = await Club.findById(review.clubId);
    club.numReviews++;
    club.totalRating += review.rating;
    club.totalTimeCommitment += review.timeCommitment;
    club.totalRecommend = review.recommend === true ? club.totalRecommend + 1 : club.totalRecommend
    await club.save()

    const school = await School.findById(club.schoolId);
    school.numReviews++;
    await school.save()

    res.send(review);
}));

reviewRouter.delete('/delete/:reviewId', expressAsyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId
    await Review.findByIdAndDelete(reviewId);
    res.send({ id: reviewId });
}));

export default reviewRouter;
