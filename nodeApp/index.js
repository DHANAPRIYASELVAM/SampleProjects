const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const {celebrate, Joi, errors}= require('celebrate');
var fs = require("fs");
console.log("My App");
var sqrtAge = 0.0;
app.use(celebrate({
    headers: Joi.object({
        token: Joi.string().required().regex(/abc/)
    }).unknown()
}))

app.use(BodyParser.json())

app.get('/',(req,res)=>
{
res.send("Hello App!");
})

function square(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.sqrt(x));
    }, 2000);
  });
}

async function layer(x)
{
  const value = await square(x);
  sqrtAge = value;
  return new Promise(resolve => {
   resolve(value);
  });
}

app.get('/validatehello',(req,res)=>
{
res.send("Hello App is validating .... !");
})

app.post('/postValidate',celebrate({
body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer() 
})
}),async (req,res)=>{
await layer(req.body.age);
res.send("The name and age after successful validation is : "+ req.body.name + " and "+ req.body.age +" respectively! "+"And the square root of the age of given person is :"+ sqrtAge);
})

app.post('/postValidateQuery', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().integer(),
      role: Joi.string().default('admin')
    }),
    query: {
      token: Joi.string().token().required()
    }
  }), (req, res) => {
res.send("After successful validation the response is : "+ req.body.name +" "+ req.body.age+" "+req.body.role+" "+ req.query.token);   
});

app.use(errors());

app.listen(process.env.port || 3000);
