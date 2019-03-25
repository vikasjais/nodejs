var http = require('http');
var nodemailer=require('nodemailer');
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: true });

let transporter=nodemailer.createTransport({
    service: 'gmail',
    secure : false,
    port : 25,
    auth: {
        user: 'iamvikaskumarjaiswal@gmail.com',
        pass: 'bikku@1998'
    },
    tls: {
        rejectUnauthorized:false
    }
    
    });

//---------------------------------------------//
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Database4"
  });
  
  //-------------------------------------------//

app.get('/sen',function(req,res){
	var rr="<html>";
	rr = rr+"<body bgcolor='yellow'>";
	rr = rr+"<h1><marquee>Welcome to India Times Stock Management Center</marquee></h1>";
	rr = rr+"<p> Services Provided by Us: </p>";
	rr = rr+"<ul style='list-style-type:circle'> <li> Entering Stock details Manually </li> <li> Search for an item and get the details </li> </ul>";
	rr = rr+"<fieldset>";
	rr = rr+"<legend> Please Login</legend>";
	rr = rr+"<form method = 'post' action='sen'>";
	rr = rr+"<center>Username : "+"<input type ='text' name ='namec' value=''></center><br><br>";
	rr = rr+"<center>Password : "+"<input type ='text' name ='named' value=''></center><br><br>";
	rr = rr+"<center><a href='/send5' target='_blank'>Forgot Password?</a></center><br>";
	rr = rr+"<center><a href='/send1' target='_blank'>Not a Memeber Yet? Register</a></center><br>";
	rr = rr+"<center><input type=submit name='submit' value='Login'></center></center>";
	rr = rr+"</fieldset>";
	rr = rr+"<p align=center> Copyright @2008-2020. All Rights Reserved </p></body></html>";
	res.send(rr);
	})
	
app.post('/sen',urlencodedparser, function(req,res){
	var name=req.body.namec;
    var password=req.body.named;

    con.query('SELECT * FROM register WHERE name = ?',[name], function (error, results) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(results.length >0){
            if(results[0].password == password){
              /*res.send({
                "code":200,
                "success":"login sucessfull"
                  });*/
                  res.redirect('/send2');
	            	res.end();
            }
            else{

                var x="<html><body bgcolor='yellow'>";
         x=x+"<center><a href='/sen' target='_blank'>Username and Password doesn't Match.<br>proceed to login</a></center></body></html>";
         res.send(x);
	     res.end();
            }
          }
          else{

            var x="<html><body bgcolor='yellow'>";
         x=x+"<center><a href='/send1' target='_blank'>Username doesn't exist<br>proceed to Register</a></center></body></html>";
         res.send(x);
	     res.end();
          }
        }
        });
 })
	
app.get('/send1',urlencodedparser,function(req,res){
	var rr="<html>";
	rr = rr+"<body bgcolor='red'>";
	rr = rr+"<h1><center> Register for our Site </center></h1>";
	rr = rr+"<form method = 'post' action='/send1'>";
	rr = rr+"<center>Name:      "+"<input type ='text' name ='namer' value=''></center><br><br>";
	rr = rr+"<center>Email:     "+"<input type ='text' name ='email' value=''></center><br><br>";
	rr = rr+"<center>Select your gender </center><br>";
	rr = rr+"<center><input type='radio' name='group' value='Male'> Male <input type='radio' name='group' value='Female'> Female </center><br><br>";
	rr = rr+"<center>Mobile:    "+"<input type ='number' min=1000000000 name ='mobil' value=''></center><br><br>";
	rr = rr+"<center>Password:  "+"<input type ='text' name ='Children' value=''></center><br><br>";
	rr = rr+"<center>Date of Birth:"+"<input type ='date' name='dat'></center><br><br>";
	rr = rr+"<center><input type=submit name='submit' value='Register'></center></body></html>";
	res.send(rr);
	})
app.post('/send1',urlencodedparser, function(req,res){
		var register={
         "name" : req.body.namer,
		 "email" : req.body.email,
		 "gender" : req.body.group,
		 "mobile" : req.body.mobil,
		 "password" : req.body.Children,
         "doc" : req.body.dat
        }
 

  con.query('INSERT INTO register SET ?',register, function (error, results) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      //console.log('The solution is: ', results);
       // res.write("Registration Successful!")
        var x="<html><body bgcolor='yellow'>";
         x=x+"<center><a href='/sen' target='_blank'>Registration successful<br>proceed to login</a></center></body></html>";
         res.send(x);
	     res.end();
    }
    });
})
	
app.get('/send2',function(req,res){
	var rr="<html>";
	rr = rr+"<body bgcolor='turquoise'>";
	rr = rr+"<h1><center> Welcome to Stock Management System </center></h1>";
	rr = rr+"<form method = 'post' action 'send'>";
	rr = rr+"<center>Name of the product : "+"<input type ='text' name ='namet' value=''></center><br><br>";
	rr = rr+"<center>Select Type of the item</center>";
	rr = rr+"<center><input type='radio' name='group' value='Food and Beverages'> Food and Beverages </center>";
	rr = rr+"<center><input type='radio' name='group' value='Cosmetics'> Cosmetics </center>";
	rr = rr+"<center><input type='radio' name='group' value='Garment'> Garment </center><br><br>";
	rr = rr+"<center>Product ID : "+"<input type ='number' min=0 name ='Pid' value=''></center><br><br>";
	rr = rr+"<center>Price Per Unit : "+"<input type ='number' min=0 name ='ppu' value=''></center><br><br>";
	rr = rr+"<center>Quantity : "+"<input type ='number' min=0 name ='quan' value=''></center><br>";
	rr = rr+"<h3><center><a href='/send3' target='_blank'>Check Stock</a></center></h3>";
	rr = rr+"<h3><center><a href='/send4' target='_blank'>Stock Decreament</a></center></h3>";
	rr = rr+"<center><input type=submit name='submit' value='Add'></center></body>";
	res.send(rr);
	})
	app.post('/send2',urlencodedparser, function(req,res){
        var stock={
            "name" : req.body.namet,
            "type" : req.body.group,
            "ppu"  : req.body.ppu,
            "quant": req.body.quan,
            "pid"  : req.body.Pid,
            "prize": req.body.ppu*req.body.quan
            }
            con.query('INSERT INTO stock SET ?',stock, function (error, results) {
                if (error) {
                  console.log("error ocurred",error);
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                }else{
                  console.log('The solution is: ', results);
                    var x="<html><body bgcolor='yellow'>";
                    x=x+"<p><center>Stock details entered Successfully </center></p>";
                     x=x+"<center><a href='/send2' target='_blank'>Do you want to add another item? Click Here</a></center></body></html>";
                     res.send(x);
                     res.end();
                }
                });
	})
	
	app.get('/send3',function(req,res){
        var rr="<html>";
        rr = rr+"<body bgcolor='orange'>";
        rr = rr+"<h1><center> Check Stock</center></h1>";
        rr = rr+"<form method = 'post' action='/send3'>";
        rr = rr+"<center>Enter Product ID : "+"<input type ='number' name ='Adults' value=''></center><br><br>";
        rr = rr+"<center><input type=submit name='submit' value='Search'></center></body></html>";
        res.send(rr);
        })
        app.post('/send3',urlencodedparser, function(req,res){
             var pid = req.body.Adults;
            
        if(pid=='')
        {   
            var rr="<html>";
            rr = rr+"<body bgcolor='orange'>";
            rr = rr+"<h3><center><a href='/send3'> Invalid productID!<br> Click to enter again</a></center></h3>";
            rr = rr+"</body></html>";
            res.send(rr);
        res.end();
        }
        else
        {

            con.query('SELECT * FROM stock WHERE pid = ?',[pid], function (error, results) {
                if (error) {
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                }else{
                  if(results.length >0){
                      var quanti=results[0].quant;
                   
                    var x="<html><body bgcolor='yellow'>";
                 x=x+"<h3><center><a href='/send3' target='_blank'>Number of items in stock are</a></center></h3></body></html>";
                 res.send(x);
                 res.end();
                  }
                  else{
        
                    var x="<html><body bgcolor='yellow'>";
                 x=x+"<h3><center><a href='/send3' target='_blank'>Enter correct PID<br>Click to search</a></center></h3></body></html>";
                 res.send(x);
                 res.end();
                  }
                }
                });
        }
        })

app.get('/send4',function(req,res){
	var rr="<html>";
	rr = rr+"<body bgcolor='Spanish Green'>";
	rr = rr+"<h1><center> Welcome to Stock Management System </center></h1>";
	rr = rr+"<form method = 'post' action 'send'>";
	rr = rr+"<center>Name of the product : "+"<input type ='text' name ='namet' value=''></center><br><br>";
	rr = rr+"<center>Select Type of the item</center>";
	rr = rr+"<center><input type='radio' name='group' value='Food and Beverages'> Food and Beverages </center>";
	rr = rr+"<center><input type='radio' name='group' value='Cosmetics'> Cosmetics </center>";
	rr = rr+"<center><input type='radio' name='group' value='Garment'> Garment </center><br><br>";
	rr = rr+"<center>Product ID : "+"<input type ='number' min=0 name ='Pid' value=''></center><br><br>";
	rr = rr+"<center>Price Per Unit : "+"<input type ='number' min=0 name ='ppu' value=''></center><br><br>";
	rr = rr+"<center>Quantity : "+"<input type ='number' min=0 name ='quan' value=''></center><br><br>";
	rr = rr+"<center><input type=submit name='submit' value='Remove'></center></body></html>";
	res.send(rr);
	})
	app.post('/send4',urlencodedparser, function(req,res){
		var name= req.body.namet;
		var id = req.body.group;
		var adults = req.body.Pid;
		var children = req.body.ppu;
		var type=req.body.quan;

		if(name==''||id==''||adults==''||children==''||type=='')
		{
	res.write("Please enter valid credentials");
	res.end()
		}
	else
	{
	res.write("Stock removed Successfully");
	res.end();
	}
	})

app.get('/send5',urlencodedparser,function(req,res){
	var rr="<html>";
	rr = rr+"<body bgcolor='yellow'>";
	rr = rr+"<h1><center> Forgot Password? </center></h1>";
    rr = rr+"<h2><center> Enter your Email <center></h2>";
    rr = rr+"<form method ='post' action='/send5'>";
	rr = rr+"<center>Your Email : "+"<input type ='text' name ='namul' value=''></center><br><br>";
	rr = rr+"<center><input type=submit name='submit' value='send code' ></center></body></html>";
    res.send(rr);
    
})
app.post('/send5',urlencodedparser, function(req,res){
		var email= req.body.namul;
		if(email=='')
		{
            var rr="<html>";
	rr = rr+"<body bgcolor='yellow'>";
	rr = rr+"<h1><center> Please enter valid credential. </center></h1>";
    rr = rr+"<a href='/send5' ><center> Enter your Email Again! <center></a>";
    rr=rr+"</body>";
	res.send(rr);
	
		}
	else{

    con.query('SELECT * FROM register WHERE email = ?',[email], function (error, results) {
        if (error) {
          
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          // console.log('The solution is: ', results);
          if(results.length >0){

            var resu=results[0].password;
            var nm=results[0].name;

            let HelperOptions= {
                form: '"Vikas kumar"<iamvikaskumarjaiswal@gmail.com',
                to: email,
                subject:'Password of stock management',
                text: 'your username is  '+nm+'\nyour password is  '+resu
            };
            transporter.sendMail(HelperOptions,(error,info)=>{
            if(error){
                return console.log(error);
                
            }
            console.log("This message was sent");
            console.log(info);
            });
            var rr="<html>";
            rr = rr+"<body bgcolor='yellow'>";
            rr = rr+"<h1><center> Your password is sent on your email </center></h1>";
            rr = rr+"<a href='/sen' ><center> Click here to login <center></a>";
            rr=rr+"</body>";
            res.send(rr);
	     res.end();
           
            
          }
          else{
         var x="<html><body bgcolor='yellow'>";
         x=x+"<center><h1><a href='/send1' target='_blank'>Email doesn't exist<br>proceed to Register</a><h1></center></body></html>";
         res.send(x);
	     //res.end();
          }
        }
        });
	}
}).listen(9000);