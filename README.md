assesment 1
Soch ke batao
1. Frontend	pe	already	validation	laga	di	hai.	Phir	schema	me	dobara	kyun?
=> frontend validation do't guarantee data security  ,  kyuki  hacker  frontend validation ko bypass karke  api request send kar sakta hai   from postman or custom req
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
=>400 is for bad request   409  is for  conflict   kyuki req ka format galat nahi hai bas review already exist karta hai.

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

assesment 5
Soch ke	batao
1.	401	aur	403	me	fark	ek	line	me.	Kaunsa	"login	karne	se	theek	ho	jaayega"?
=> 401 is unauthorized  error user not login ,  403  is forbidden  ki user login hai but not allowed to access data  dont have permission
2.	Search	me	kuch	na	mile	to	404	kyun	galat	hai?Code?
=>  because search resource exist karta hai bas query match 0 hai .. so normally 200 and not found
3.	Ye	kyun	galat	hai	—	2	problem	batao:	
js	res.status(200).json({	success:	false,	message:	"Product	not	found"	});
=>  ek to  code should be 404 ,  200  ok for success : true
4.	Error	middleware	me	4	parameter	kyun	likhte	hain	jab next	use	hi	nahi	hota
=>  so express can identify it as middleware


Situation
Naya	review	ban	gaya  --> 201
rating:	15	bheja    =-->  400
Token	bheja	hi	nahi   --> 401
Token	sahi	hai	par	role	--> 403
user	hai,	delete	admin-only	hai .
/getSingleReview/<id	>jo	exist	nahi	karti  --> 404
Wahi	email	se	dobara	register  --> 400
Search	me	kuch	nahi	mila  --> 200
Mongoose	connection	tut	gaya  -- > 500

assesment 6 
isModified("password")	ka	check	kyun	hai?	Ye	samajhna	is	assignment	ka	sabse	important	point	hai.
=> this check is important because password is hashing on basis of save not when password change so when dev  change  only one field  other than password and again do  staff.save() this pre method would run again and same hashed password will hash again 
Soch	ke	batao

1.	DB	me	password	ka	hash	pada	hai.	Login	ke	waqt	user	plain	password	bhejta	hai.	
hai	jab	hash	se	wapas	password	nikal	hi	nahi	sakte?
=> stored hash password and  user ke plain password ko same salt same algo. se process karta hai . new result ko stored hash se compare if match  true else false
2. 	Service	me	bhi	 bcrypt.hash()	kar	do	(jab	hook	already	kar	raha	hai)	—	kya	hoga?	Ye	galti	bahut	log	karte	hain.
=> double hashing if doing in service and same in mongoose.pre("save") and when bcrypt.compare to fail ho jaega  even if same password.
3.	JWT	ka	payload	encrypted	hota	hai	ya	sirf	encoded?	Iska	matlab	kya	—	payload	me	kya	cheezein	kabhi	nahi	daalni chahiye?
=> JWT payload encoded hota hai not encrypted islye  from token accsess payload  read kar sakta hai  and so  in payload only user Id or role  not  password  , password hash , OTP , 
4. httpOnly:	true	na	lagayein	to	kaunsa	attack	possible	ho	jaata	hai
=>  if  not use httpOnly:true  than  cookie can be accessible through js ( document.cookie) and  it called XSS (cross site scripting attack)  coolie  ko steal hone ka risk ho sakta hai..  
5. Logout	me	cookie	hata	di.	Kya	wo	token	ab	mar	gaya?	Agar	kisi	ne	wo	token	pehle	copy	kar	liya	ho	to
=>  Nahi sirf  cookie clear karne se  token  invalid nahi ho jata  if attacker steals token before logout  it can access and  without error  info.  till the token expires .. so prevent this  we use  short expiredIn access Token  , rotation  Refresh Token methods