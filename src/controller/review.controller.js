const	express	=	require("express");

const reviewService = require("../service/review.service");
const reviewController  =async	(req,	res)	=>	{
try	{
const	{	title,	comment,	rating,	reviewerName	}	=	req.body;
const {alreadyReviewed , review} = await  reviewService.createReviewService({	title,	comment,	rating,	reviewerName	});
if(alreadyReviewed){
    return res.send(" you already reviewed it..");}
res.send(review);
}	catch	(err)	{
console.log(err);
res.status(500).send("internal	server	error");
}
}

const getReviewsController = async	(req,	res)	=>	{
try	{
const	{	status,	page	=	1,	limit	=	10	}	=	req.query;
const reviews = await reviewService.getReviewsService(req.query);
res.send(reviews);
}	catch	(err)	{
res.status(500).send("error");
}
}

module.exports = {reviewController , getReviewsController};

