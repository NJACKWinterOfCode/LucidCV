var express = require('express');
var router = express.Router();
var jbuilder = require('jbuilder');
const fs = require('fs');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//making output var global
  var output = null;
  var theme = null;

router.post('/', function(req, res, next) {

  // console.log(output);
  var tempOutput;

  if(output !== null)
  {
    tempOutput = output;
  }
  if(output === null)
  {
    output === tempOutput;
  }

    output = jbuilder.encode(function(json) {

     json.set('header', function(json) {
       json.set('avatar', req.body.avatar);
       json.set('name', req.body.name);
       json.set('job', req.body.job);
       json.set('bio', req.body.bio);
       json.set('email', req.body.email);

       json.set('icon', function(json) {
         json.set('github', req.body.github);
         json.set('linkdin', req.body.linkedin);
         json.set('facebook', req.body.facebook);
         json.set('twitter', req.body.twitter);
         json.set('website', req.body.website);
       });
     });

     json.set('language', function(json) {
       var language1 = {lang: req.body.l1 ,perc: req.body.p1};
       var language=[language1];
       if(req.body.l2!=null){
         language.push({lang: req.body.l2 ,perc: req.body.p2});
       }
       if(req.body.l3!=null){
         language.push({lang: req.body.l3,perc: req.body.p3});
       }
       if(req.body.l4!=null){
         language.push({lang: req.body.l4,perc: req.body.p4});
       }
       if(req.body.l5!=null){
         language.push({lang: req.body.l5,perc: req.body.p5});
       }
       if(req.body.l6!=null){
         language.push({lang: req.body.l6,perc: req.body.p6});
       }
       if(req.body.l7!=null){
         language.push({lang: req.body.l7,perc: req.body.p7});
       }
       if(req.body.l8!=null){
         language.push({lang: req.body.l8,perc: req.body.p8});
       }
       if(req.body.l9!=null){
         language.push({lang: req.body.l9,perc: req.body.p9});
       }
       if(req.body.l10!=null){
         language.push({lang: req.body.l10,perc: req.body.p10});
       }
         json.extract(language, 'lang', 'perc');
     });



     json.set('projects', function(json) {
       var project1 = {name: req.body.namep ,link: req.body.link ,desc:req.body.bio1};
       var project=[project1];
       if(req.body.cname2!=null){
         project.push({name: req.body.name2 ,link: req.body.link2 ,desc:req.body.bio1});
       }
       if(req.body.cname3!=null){
         project.push({name: req.body.name3 ,link: req.body.link3 ,desc:req.body.bio1});
       }
         json.extract(project, 'name', 'link', 'desc');
     });

     json.set('experience', function(json) {
       var experience1 = {name: req.body.cname ,job: req.body.cjob,date:{start: req.body.csdate,end: req.body.cedate}};
       var experience=[experience1];
       if(req.body.cname2!=null){
         experience.push({name: req.body.cname2 ,job: req.body.cjob2,date:{start: req.body.csdate2,end: req.body.cedate2}});
       }
       if(req.body.cname3!=null){
         experience.push({name: req.body.cname3 ,job: req.body.cjob3,date:{start: req.body.csdate3,end: req.body.cedate3}});
       }
          json.extract(experience, 'name','job', 'date');
     });

     json.set('eduandcert', function(json) {
       json.set('edu', function(json) {
         var edu1 = {title: req.body.ename ,name: req.body.ecourse ,date:{start: req.body.esdate,end: req.body.eedate}};
         var edu=[edu1];
         if(req.body.ename2!=null){
           edu.push({title: req.body.ename2 ,name: req.body.ecourse ,date:{start: req.body.esdate2,end: req.body.eedate2}});
         }
         if(req.body.ename3!=null){
           edu.push({title: req.body.ename3 ,name: req.body.ecourse ,date:{start: req.body.esdate3,end: req.body.eedate3}});
         }
           json.extract(edu, 'title',  'name', 'date');
       });
     });
   });

   console.log("____________________OUTPUT___________________",output);
   fs.writeFileSync('cv.json', output);
  // console.log(output);
  console.log("req body",req.body.theme);

  /*Adding logic for storing theme to a variable and then using it !*/
  /*This will store the value when we will first submit the form */
  if(theme === null && req.body.theme)
  {
    console.log("-----------ENTER THE BOTH NULL CASE !--------- ");
    theme = req.body.theme ;
  }

/* store the value when we will update the value from the theme*/
  if(theme !== null && req.body.theme)
  {
    console.log("-----------SETTING THEME FOR THE SECOND TIME------------------------");
    theme = req.body.theme;
    console.log("_________TEMP---------",tempOutput);
    output=tempOutput;
    console.log("____________________OUTPUT_____2______________",output);
  }
  console.log("____________________OUTPUT___3________________",output);
/*when the second request is made this makes req.body.theme undefined so it will store the value in it */
  if (theme !== null && !(req.body.theme))
  {
    console.log("---------------SETTING REQ>THEME to THEME------------------------------");
    req.body.theme = theme;
  }


  if(req.body.theme === "theme1"){
    res.render('resume',{out:JSON.parse(output)});
  }
  else if(req.body.theme === "theme2"){
    console.log("matched");
    res.render('theme2',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme3"){
    res.render('theme3',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme4"){
    res.render('theme4',{out:JSON.parse(output)});
  }
  else if(req.body.theme ==="theme5"){
    res.render('theme5',{out:JSON.parse(output)});
  }
  else{
    //default
      res.render('resume',{out:JSON.parse(output)});
  }

});



router.get('*', function(req, res, next) {
  res.render("404");
});

module.exports = router;
