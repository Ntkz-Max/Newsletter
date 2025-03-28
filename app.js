const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});


app.post("/failure", function(req, res)
{
  res.redirect("/");
});



app.post("/", function(req, res)
{

  const firstName =req.body.fName;
  const lastName =req.body.lName;
  const email =req.body.email;

 var data ={ members:[{
   email_address: email,
   status: "subscribed",
   merge_fields: {FNAME: firstName, LNAME: lastName}
  }]

 };

const jsonData = JSON.stringify(data);

const url = "https://us9.api.mailchimp.com/3.0/lists/bace48d51d";
const options = {
  method: "POST",
  auth:"Ntokozo1:764e6105f58460529420e48f88b0a523-us9"
};


const request = https.request(url, options, function(response)
{
  if (response.statusCode === 200)
  {
    res.sendFile(__dirname + "/success.html");
  }
  else
  {
    res.sendFile(__dirname + "/failure.html");
  }

response.on("data", function(data)
{
  console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();

});



app.listen(process.env.Port || 3000, function()
{
  console.log("Server is running on 3000 smoothly");
});


// API KEY
// 

// LIST ID
// 
