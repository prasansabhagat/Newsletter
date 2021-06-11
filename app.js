const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { response } = require("express");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");//dirname gives us the loaction of the current directory
    //console.log(__dirname);
});
app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/57353b2e6a";

    const options = {
        method: "POST",
        auth: "PB:a33b07c2937d8ae7d634c7316edda8b2-us6"
    }
    const request = https.request(url, options, function(response){
        
        if(response.statusCode = 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
        request.write(jsonData);
        request.end();  
    
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 4000,function(){
    console.log("Server started at port 4000.")
});



//API key
//0adc6e194ce9361fbc3a4c324509b3e5-us6
//a33b07c2937d8ae7d634c7316edda8b2-us6

//list id
//57353b2e6a