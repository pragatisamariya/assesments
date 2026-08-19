const	express	=	require("express");
const	ReviewModel	=	require("../model");

const createReviewService = async (data)=>{
  try  {
    const {	title,	comment,	rating,	reviewerName	} = data;
    const	alreadyReviewed	=	await	ReviewModel.findOne({	reviewerName,	title	});
if	(alreadyReviewed)	{
return	null;
}
const	review	=	await	ReviewModel.create({
title,	comment,	rating,	reviewerName,
});
 return {alreadyReviewed , review}}
catch(err){
    console.log(err);
}
}

const getReviewsService = async (data)=>{
try{
    const {	status,	page	=	1,	limit	=	10	} = data;
const	filter	=	{};
if	(status)	filter.status	=	status;
const	reviews	=	await	ReviewModel.find(filter)
.skip((page	-	1)	*	limit)
.limit(limit);

return {reviews};
}
catch(err){
    console.log(err);
}
}
module.exports = {createReviewService , getReviewsService};