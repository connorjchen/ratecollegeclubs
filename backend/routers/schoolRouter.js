import express from 'express';
import data from '../data.js';
import School from '../models/schoolModel.js';
import expressAsyncHandler from 'express-async-handler'
import Club from '../models/clubModel.js';
import Review from '../models/reviewModel.js';
import Interview from '../models/interviewModel.js';

const schoolRouter = express.Router();

//doesnt rlly give all - only valid
schoolRouter.get('/', expressAsyncHandler(async (req, res) => {
    const schools = await School.find({ valid: true }, null, { sort: { numClubs: -1, name: 1 } });
    res.send(schools);
}));

//gets ALL ALL
schoolRouter.get('/all', expressAsyncHandler(async (req, res) => {
    const schools = await School.find({}, null, { sort: { numClubs: -1, name: 1 } });
    res.send(schools);
}));

// schoolRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     // await School.remove({});

//     // const createdSchools = await School.insertMany(data.schools);
//     // res.send({ createdSchools });
// }));

schoolRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const school = await School.findById(req.params.id);
    if (school) {
        res.send(school);
    }
    else {
        res.status(404).send({ message: 'School Not Found' })
    }
}));

schoolRouter.post('/post', expressAsyncHandler(async (req, res) => {
    const school = new School({
        name: req.body.schoolName,
        image: "/images/backgrounds/placeholder.jpg",
        city: req.body.city,
        state: req.body.state,
        numClubs: 0,
        numReviews: 0,
        valid: false
    })
    const createdSchool = await school.save()

    res.send({
        _id: createdSchool._id
    });
}));

schoolRouter.patch('/validate', expressAsyncHandler(async (req, res) => {
    const school = await School.findById(req.body.schoolId);
    school.valid = true
    await school.save()

    res.send({
        _id: school._id
    });
}));

schoolRouter.delete('/delete/8d8019d00e2a49ab9a9a426d1c423f7e/:schoolId', expressAsyncHandler(async (req, res) => {
    const schoolId = req.params.schoolId
    await School.deleteOne({ _id: schoolId, valid: false });
    const club = Club.find({ schoolId: req.params.schoolId });
    const clubId = club._id
    await Club.findByIdAndDelete(clubId);
    await Review.deleteOne({ clubId: clubId });
    await Interview.deleteOne({ clubId: clubId });

    res.send({
        _id: schoolId,
    });
}));

export default schoolRouter;
