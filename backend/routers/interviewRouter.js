import express from 'express';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler'
import Interview from '../models/interviewModel.js';
import Club from './../models/clubModel.js';

const interviewRouter = express.Router();

interviewRouter.get('/', expressAsyncHandler(async (req, res) => {
    const interviews = await Interview.find({});
    res.send(interviews);
}));

// interviewRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     // await Interview.remove({});

//     // const createdInterviews = await Interview.insertMany(data.interviews);
//     // res.send({ createdInterviews });
// }));

interviewRouter.post('/post', expressAsyncHandler(async (req, res) => {
    const interview = new Interview({
        clubId: req.body.clubId,
        difficulty: req.body.difficulty,
        major: req.body.major,
        roleApplied: req.body.roleApplied,
        comment: req.body.interviewComment,
        helpful: 0,
        reported: false
    })
    const createdInterview = await interview.save()

    const club = await Club.findById(req.body.clubId);
    club.numInterviews++;
    club.totalDifficulty += req.body.difficulty;
    await club.save()

    res.send({
        _id: createdInterview._id
    });
}));

interviewRouter.get('/list/:clubId', expressAsyncHandler(async (req, res) => {
    const interviews = await Interview.find({ clubId: req.params.clubId, reported: false }, null, { sort: { createdAt: -1 } });
    res.send(interviews);
}));

interviewRouter.get('/reported/list', expressAsyncHandler(async (req, res) => {
    const interviews = await Interview.find({ reported: true }, null, { sort: { updatedAt: -1 } });
    res.send(interviews);
}));

interviewRouter.patch('/report', expressAsyncHandler(async (req, res) => {
    const interview = await Interview.findById(req.body.interviewId);
    interview.reported = true
    await interview.save()

    const club = await Club.findById(interview.clubId);
    club.numInterviews--;
    club.totalDifficulty -= interview.difficulty;
    await club.save()

    res.send(interview);
}));

interviewRouter.patch('/validate', expressAsyncHandler(async (req, res) => {
    const interview = await Interview.findById(req.body.interviewId);
    interview.reported = false
    await interview.save()

    const club = await Club.findById(interview.clubId);
    club.numInterviews++;
    club.totalDifficulty += interview.difficulty;
    await club.save()

    res.send(interview);
}));

interviewRouter.delete('/delete/:interviewId', expressAsyncHandler(async (req, res) => {
    const interviewId = req.params.interviewId
    await Interview.findByIdAndDelete(interviewId);
    res.send({ id: interviewId });
}));

export default interviewRouter;
