//	buggy.js	—	isme	5	galtiyan	hain,	sab	dhoondho	aur	fix	karo
const	express	=	require("express");
const { errorHandler } = require("./src/middleware/errorHandler");
const	app	=	express(); 
const reviewRouter = require("./src/routs/review.routs");
app.use("/reviews",	reviewRouter); // 2 route should be call  before erorr  
app.use(errorHandler)	 // 1 did not import error handler  		 and reviewRouter																	

const	getReview	=	async	(req,	res)	=>	{				

const	review	=	await	ReviewModel.findById(req.params.id);
if	(!review)	{
 return res.status(404).json({	success:	false,	message:	"not	found"	});			
}
res.json(review);																																																				
};
app.use((err,	req,	res , next)	=>	{																																											
res.status(500).send(err.message);
});