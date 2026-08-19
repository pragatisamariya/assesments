//	src/routes/review.route.js
const	express	=	require("express");

const reviewController = require("../controller/review.controller0");
const validationSchema = require("../validationSchema/reviewJoiSchema")
const	router	=	express.Router();
router.post("/createReview",validationSchema.createReviewSchema, reviewController.reviewController	);
router.get("/getReviews",validationSchema.getReviewSchema,	reviewController.getReviewsController);

router.patch("/updateReviews" , validationSchema.updateReviewSchema , );
router.get("/getReviews/:id" , validationSchema.reviewIdSchema , );

router.delete("/deleteReviews" , );



module.exports	=	router;