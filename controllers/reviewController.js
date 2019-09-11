const Reviews = require("../models/reviewModels");
//const catchasync = require("../utils/catchAsync");
const factory = require('./handlerFactory');





exports.setTourUserIds = (req, res, next) =>{
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;

    next();
}

exports.getAllReviews = factory.getAll(Reviews);
exports.getReview = factory.getOne(Reviews);

exports.createReview = factory.createOne(Reviews);

exports.updateReview = factory.updateOne(Reviews);
exports.deleteReview = factory.deleteOne(Reviews);