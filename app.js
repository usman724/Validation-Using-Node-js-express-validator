//Here the insert ,update ,delete and view the record using the node js .
const express = require('express');

const path = require('path');

const bodyparser = require('body-parser');
const validator = require('express-validator');

const {check,validationResult} = require('express-validator/check');
const {matchedData ,sanitize} = require('express-validator/filter');

var app = express();

app.use(bodyparser.urlencoded({extended : false  }))
app.set('view engine','ejs');


app.get('/form',(req,res)=>{
       res.render("form",{
         error:" " ,
         user :""
       })
});


app.post('/',[

        check('username',"Error In Email").trim().isEmail(),
        check('password',"Error In Password").trim().isLength({min:5}),
        check('info',"Error In Information").trim().isLength({min:5}),
        check('repassword',"Error In rePassword").custom((value,{req}) =>{
              if (value !== req.body.password) {
              throw new Error("Password Not match")

            }else {
              return true;
            }
          })

],

(req,res)=>{
        const error = validationResult(req);

        if (!error.isEmpty()) {
          console.log(error.mapped());

          const user =matchedData(req);

           res.render('form',{
             error:error.mapped() ,
             user : user
           })
        }

          else {
             const user =matchedData(req); //make the data object and send to the user like this {username:usman,password:456}
             res.render('subbmit',
             {user : req.body}
            )
          }
})


app.listen('3000',()=>{
  console.log('Connect and Running On Port 3000');
});
