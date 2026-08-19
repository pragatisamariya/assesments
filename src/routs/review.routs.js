//	src/routes/review.route.js
const	express	=	require("express");

const reviewController = require("../controller/review.controller");
const validationSchema = require("../validationSchema/reviewJoiSchema");
const validationMiddleware = require("../middleware/validationMiddleware");
const	router	=	express.Router();
router.post("/createReview",validationMiddleware(validationSchema.createReviewSchema), reviewController.reviewController	);
router.get("/getReviews",validationMiddleware(validationSchema.getReviewSchema),	reviewController.getReviewsController);

router.patch("/updateReviews" , validationMiddleware(validationSchema.updateReviewSchema) , reviewController.updateReviews);
router.get("/getReviews/:id" , validationMiddleware(validationSchema.reviewIdSchema) ,reviewController.getReviewsById );

router.delete("/deleteReviews" , reviewController.deleteReviews);

router.patch("/reviews/:id/approve" ,reviewController.statusApprove );


module.exports	=	router;