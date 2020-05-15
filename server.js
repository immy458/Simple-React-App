const express=require('express'); 
//require function's job is to load modules which gives you access to their exports  
//express is a module of node to make routes to database
//require('express') returns a function reference. that function is called with express()

const PORT=4000; //set the port to 4000 
const mysql=require('mysql');
const cors=require('cors'); //Cross Origin Resource Sharing (CORS),CORS essentially
// means cross-domain requests.
// It allows you to specify (on your server) what other servers can have access, 
//This makes it possible to serve your front-end app from one server, and your back-end API
// from a different server, without sacrificing security.

const app=express();        //initialise express, app is an object returned by express().
app.use(cors());


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1522',
    database:'try'
});

connection.connect(function(err){
    (err)?console.log(err):console.log(connection);
});

app.get('/',function(req,res){              //makes a get request
    //  res.send('hello from simple -react project');
    connection.query('SELECT * FROM products', function(err,data){
      (err)?res.send(err):res.json({products: data});
    });
  });

app.get('/products/add',function(req,res){
    const{pid,pname,price}=req.query; //with request.query we directly get the query string from the url  
    //console.log(name,price);
    const insert_query=`INSERT INTO products (pid,pname,price) VALUES('${pid}','${pname}','${price}')`;
    connection.query(insert_query,function(err,data){
        (err)?res.send(err):res.send("Product Successfully added!!!");
      });
});

app.get('/products/search',function(req,res){
  const{pid}=req.query; //with request.query we directly get the query string from the url  
  console.log(pid);
  const search_query=`SELECT * FROM products where pid=${pid}`;
  connection.query(search_query,function(err,data){
      (err)?res.send(err):res.json({searchedproducts: data});
    });
});




/*start the server*/
app.listen(PORT,() =>{
    console.log(`App running on port: ${PORT}`);
});