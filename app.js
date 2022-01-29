const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'merchant_service'
  });

  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected with App...');
  });

  app.get('/merchant', (req, res) => (
    res.render('merchant')
  ));


app.post('/merchant/register', async (req, res) => {
    const data = { 
        id: req.body.id,
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        phone_number: req.body.phone_number 
    };
    console.log(data);
    let sqlQuery = "INSERT INTO merchant SET ?";
    
    await conn.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

app.get('/merchant/login', (req, res) => {
    res.render('login');
});

  app.post('/merchant/login', async (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    if (id && password) {
        await conn.query('SELECT * FROM merchant WHERE id = ? AND password = ?', [id, password], function(error, results, fields) {
            if (results.length > 0) {
                res.redirect(`/merchant/${id}/product`);
			} else {
                res.status(401);
                res.redirect(`/merchant/login`);
			}			
			response.end();
		});
    }
});

app.delete('/merchant/:id',(req, res) => {
    let sqlQuery = "DELETE FROM merchant WHERE id="+req.params.id+"";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

  app.post('/merchant/product', async (req, res) => {
    const addProduct = { 
        id: req.body.id,
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        price: req.body.price,
        merchant_id: req.body.merchant_id 
    };
    
    let sqlQuery = "INSERT INTO product SET ?";
    
    await conn.query(sqlQuery, addProduct,(err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

app.delete('/merchant/:id/product/',(req, res) => {
    let sqlQuery = "DELETE FROM product WHERE id="+req.params.id+"";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

  app.put('/merchant/:id/product',(req, res) => {
    let sqlQuery = "UPDATE product SET quantity='"+req.body.quantity+"', price='"+req.body.price+"' WHERE id="+req.params.id;
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

app.get('/merchant/product',(req, res) => {
    let sqlQuery = "SELECT * FROM product";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });


function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });

