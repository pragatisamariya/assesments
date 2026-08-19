assesment 1
Soch ke batao
1. Frontend	pe	already	validation	laga	di	hai.	Phir	schema	me	dobara	kyun?
=> frontend validation do't guarantee daat security  ,  kyuki  hacker  frontend validation ko bypass karke  api request send kar sakta hai   from postman or custom req
2.	trim:	true	na	lagao	to	"	Rahul	"	aur	"Rahul"	ko	DB	alag	maanega	ya	same?
=>   alag manega they both are diff. string .. spaces also count as part of string

3. default:	"pending"	aur	required:	true	—	dono	ek	saath	lagana	theek	hai	kya?	Kya	hoga	agar	dono	laga	do?
=>  ha laga sakte hai if user send without status  then default pending set ho jayega and required field valid rahega

assesment 2
Soch	ke	batao
1.	Mongoose	me	validation	hai	hi	—	Joi	ki	alag	se	kya	zaroorat?	Do	solid	reason	likho.
=> Mongoose validation only for database  and  to verify req before send to DB  we use third party library JOI  & API specific validation 
2.	?limit=5	bhejne	pe	req.query.limit	string	aati	hai	ya	number?	Kyun?
=> string aati hai kyuki url ke query parameters string  format mein aate hai
3.	stripUnknown:	true	na	lagayein	to	
{"status":	"approved"}	bhejne	pe	kya	hoga?
=> agar joi schema mein status allowed nahi hai  and stripUnknown:	true  ye  nahi lagaya hai then unknown  field validation error aayega
4.	Ek	user	{"rating":	6,	"title":	"x"}	bhejta	hai	—	dono	galat	hain.	Kya	user	ko	dono	errors	ek	saath	milenge?	Kaunsi	Joi
setting	decide	karti	hai
=>   ye abortEarly decide karta hai but by default  abortEarly :true matlab jo first error hai to uspe joi rok dega or ek error return kar dega  
assesment 3
Soch ke Batao
1. Kal	ko	tumhe	ek	CRON	job	likhni	hai	jo	har	raat	purane	review	delete	kare.	Original	code	(sab	kuch	route	me)	se	wo logic	reuse	kar	paate?	Kyun	nahi?
=> nahi  CRON job code ek hi fil mein hone se reuse nahi kar pate CRON does not need req and res
and it just need DB logic to delete reviews so service mein likhna better hai so  w ecan reuse the logic..
2.	Service	me	res.status(400).send()	likh	doge	to	kya	problem	hogi?
=>   error res not defined  because  res whaan exist hi nahi karta  service is only to handle business logic  , sending res is part of controller
3.	Duplicate	review	wala	check	400	deta	hai.	Tumhe	kya	lagta	hai	—	
likho
=>400 is for bad request   409  is for  conflict  or forbidden  kyuki req ka format galat nahi hai bus review already exist karta hai.

assement 4
Soch ke Batao
1.	PUT	use	karke	{	"rating":	4	}	bhejo	—	title	aur	comment	ka	kya	hoga?	PATCH	me	kya	hoga?	Ek	line	me	fark	likho
=> PUT  mein  {	  "rating":	4	} dene se pura resource hi replace hota hai to title comment missing ho sakte hai  but patch mein sirf rating update karega baki fields same rahege
2.	Create	pe	201	kyun,	200	kyun	nahi?	Frontend	ko	isse	kya	fayda?
=> jab server naya resource create karte hai tab 201 
jab req successful ho tab 200 lekin naya resource nahi create karte hai.
to  frontend ko exact info. batane ke liye .. either new resource created or not or just req successful 
3.	Delete	safal	hone	pe	deleted	review	wapas	bhejna	chahiye	ya	nahi?	Apni	raay	do.
=>  ha bhejna chaiye  so  client  ko confirmation mil jaye ki ha wahi  review delete hua hai ya nahi .
4.	findByIdAndUpdate	me	validators	by	default	chalte	hain	ya	nahi?	Nahi	chalte	to	chalane	ke	liye	kya	likhna	padta	hai
=> validators in update  by default nahi chalte hai  .. to hame runvalidators: true  likhna padtha hai  and in update  new : true or  returnDocument: "after" likhna padtha hai  or else wo  old data hi  compass mein save ho jayega
