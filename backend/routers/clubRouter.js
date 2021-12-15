import express from 'express';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler'
import Club from '../models/clubModel.js';
import Review from '../models/reviewModel.js';
import Interview from './../models/interviewModel.js';
import School from './../models/schoolModel.js';

const clubRouter = express.Router();

clubRouter.get('/', expressAsyncHandler(async (req, res) => {
    const clubs = await Club.find({});
    res.send(clubs);
}));

clubRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Club.remove({});

    const createdClubs = await Club.insertMany(data.clubs);
    res.send({ createdClubs });
}));

clubRouter.get('/invalid/list', expressAsyncHandler(async (req, res) => {
    const clubs = await Club.find({ valid: false }, null, { sort: { createdAt: 1 } });
    res.send(clubs);
}));

clubRouter.get('/list/:schoolId', expressAsyncHandler(async (req, res) => {
    const clubs = await Club.find({ schoolId: req.params.schoolId, valid: true }, null, { sort: { name: 1 } });
    res.send(clubs);
}));

clubRouter.post('/post', expressAsyncHandler(async (req, res) => {
    const club = new Club({
        name: req.body.clubName,
        schoolId: req.body.schoolId,
        numReviews: 0,
        totalRating: 0,
        totalTimeCommitment: 0,
        totalRecommend: 0,
        numInterviews: 0,
        totalDifficulty: 0,
        valid: false,
    })
    const createdClub = await club.save()

    res.send({
        _id: createdClub._id
    });
}));

clubRouter.patch('/validate', expressAsyncHandler(async (req, res) => {
    const club = await Club.findById(req.body.clubId);
    club.valid = true
    await club.save()

    const schoolId = club.schoolId;
    const school = await School.findById(schoolId)
    school.numClubs++;
    await school.save()

    res.send({
        _id: club._id
    });
}));

clubRouter.delete('/delete/0cab189e060d4866aa706394c758b292/:clubId', expressAsyncHandler(async (req, res) => {
    const clubId = req.params.clubId

    const club = await Club.findById(clubId);
    const schoolId = club.schoolId;
    const school = await School.findById(schoolId)
    school.numReviews--;
    await school.save()

    await Club.deleteOne({ _id: clubId, valid: false });
    await Review.deleteOne({ clubId: clubId });
    await Interview.deleteOne({ clubId: clubId });

    res.send({
        _id: clubId,
    });
}));

clubRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const club = await Club.findById(req.params.id);
    if (club) {
        res.send(club);
    }
    else {
        res.status(404).send({ message: 'Club Not Found' })
    }
}));


export default clubRouter;
