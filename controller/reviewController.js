const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            res.json({
                message: "reviews found",
                data: reviews
            })
        }
        else {
            res.json({
                message: "reviews not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if (reviews) {
            res.json({
                message: "reviews found",
                data: reviews
            })
        }
        else {
            res.json({
                message: "reviews not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        const planid = req.params.id;
        console.log("plan id", planid);
        let reviews = await reviewModel.find();

        reviews = reviews.filter(review => review.plan["_id"] == planid);
        // console.log(reviews);
        return res.json({
            data: reviews,
            message: 'reviews retrieved for a particular plan successful'
        });
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

module.exports.createReview = async function createReview(req, res) {
    try {
        const id = req.params.plan;
        let plan = await planModel.findById(id);
        console.log('createreview ca,me ',req.body);
        let review = await reviewModel.create(req.body);
       
        //replace with orig formula
        plan.totalRating+=review.rating;
        plan.totalNoOfRatings+=1;

        plan.ratingsAverage = plan.totalRating/plan.totalNoOfRatings;

        await review.save();
        await plan.save();
        res.json({
            message: "review created",
            data: review,
        });
    }
    catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let planid = req.params.plan;
        let id = req.body.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            if (key == id) continue;
            keys.push(key);
        }
        let review = await reviewModel.findById(id);
        let plan = await planModel.findById(planid);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == 'rating') {
                console.log(keys);

                plan['totalRating'] -= review['rating'];
                plan.totalRating+=dataToBeUpdated.rating;
                if (plan['totalNoOfRatings'] > 0) {
                    plan['ratingsAverage'] = (plan['totalRating']) / (plan['totalNoOfRatings']);
                }

                console.log(plan['ratingsAverage'], review['rating'], dataToBeUpdated['rating']);

                await plan.save();
            }
            review[keys[i]] = dataToBeUpdated[keys[i]];


        }
        await review.save();
        return res.json({
            message: 'plan updated succesfully',
            data: review
        });
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let planid = req.params.plan;
        let id = req.body.id;
        let plan = await planModel.findById(planid);
        let review=await reviewModel.findById(id);
        
        //update average ratings 
        console.log("reviewId", id);
        // calc 
        plan['totalNoOfRatings'] -= 1;
        plan['totalRating'] -= review['rating'];
        if (plan['totalNoOfRatings'] > 0) {
            plan['ratingsAverage'] = (plan['totalRating']) / (plan['totalNoOfRatings']);
        }else{
            plan['ratingsAverage']=0;

        }
       
        // deletion
        let review2 = await reviewModel.findByIdAndDelete(id);


        res.json({
            message: "review deleted",
            data: review,
        });
        await plan.save();
    }
    catch (err) {
        return res.json({
            message: err.message,
        });
    }

    //average rating change update

}
