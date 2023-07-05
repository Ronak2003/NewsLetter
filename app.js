const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { request } = require("http");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{

    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ],
        update_existing: true
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/899fd51438";
    const options={
        method: "POST",
        auth: "ronak:8d1c6b8b201a69bf63fa68f185ccb71d-us14"
    }
    const request = https.request(url,options,(response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/sucess.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",(req,res)=>{
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server is up and running");
})


//8d1c6b8b201a69bf63fa68f185ccb71d-us14  apikey
//899fd51438.                            listId