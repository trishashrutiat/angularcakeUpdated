const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB server');
    } catch (err) {
        console.error('Error connecting to MongoDB server', err);
        process.exit(1);
    }
}
const { cakes } = require('./cakes');

// Define endpoint to serve the data
app.get('/api/cakes', (req, res) => {
    res.json(cakes);
});


app.get('/insert', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');
        console.log(req.query)
        const result = await collection.insertOne(req.query);
        data={ status:true,message: "Inserted Successfully" };
        
        console.log(req.query.email);

        sendRegistrationEmail(req.query.email);
        res.status(200).json({ message: 'Registration email sent successfully' });
    } catch (err) {
        console.error('Error ', err);
        console.log(req.query);
        data={ status:false,message: "Insert Failed" };
    res.json(data);
    }
  });
  app.get('/checkout', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('order');
        console.log(req.query)
        const result = await collection.insertOne(req.query);
        data={ status:true,message: "Inserted Successfully" };
        
    } catch (err) {
        console.error('Error ', err);
        console.log(req.query);
        data={ status:false,message: "Insert Failed" };
    res.json(data);
    }
  });
  app.get('/api/cakes/existingImageNames', (req, res) => {
    try {
      // Extract image names from cake objects
      const imageNames = cakes.map(cake => cake.image);
      res.json(imageNames);
      console.log(res.json);
    } catch (error) {
      console.error('Error fetching existing image names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
function sendRegistrationEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure:true,
        auth: {
            user: 'contact.atenterprises@gmail.com ',
            pass: 'ytibkosayyrrvhrc'
        },
        debug: true
    });
    
    

    const mailOptions = {
        from: 'contact.atenterprises@gmail.com',
        to: email,
        subject: 'Welcome to Belsingh Bakes!',
        html: '<p>Thank you for registering!</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
  app.get('/insert1', async function (req, res) {
    try {
        // Check if the path starts with "/admin"
        res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        if (/^admin/i.test(req.query.username)) {
            // If it starts with "/admin", check in the admin collection
            const db = client.db('CAKE_PROJECT');
            const collection = db.collection('admin');
            const user = await collection.findOne(req.query);
            
            if (user) {
                // Admin found
                const data = { status: true, message: "admin" };
                res.json(data);
            } else {
                // Admin not found
                const data = { status: false, message: "not admin" };
                res.json(data);
            }
        } else {
            // If not starting with "/admin", check in the customer collection
            const db = client.db('CAKE_PROJECT');
            const collection = db.collection('customer');
            const user = await collection.findOne(req.query);
            
            if (user) {
                // Customer found
                const data = { status: true, message: "user" };
                res.json(data);
            } else {
                // Customer not found
                const data = { status: false, message: "not user" };
                res.json(data);
            }
        }
    } catch (err) {
        console.error('Error ', err);
        const data = { status: false, message: "Error processing login" };
        res.json(data);
    }
});
app.delete('/api/cakes', (req, res) => {
    const cakeName = req.query.name;
    if (!cakeName) {
        return res.status(400).json({ message: 'Cake name is required for deletion' });
    }

    const index = cakes.findIndex(cake => cake.name === cakeName);
    if (index !== -1) {
        cakes.splice(index, 1);
        res.status(200).json({ message: 'Cake deleted successfully', cakeName: cakeName });
    } else {
        res.status(404).json({ message: 'Cake not found', cakeName: cakeName });
    }
});


  app.get('/insert2', async function (req, res){
    try {
     console.log(req);
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
    const db = client.db('CAKE_PROJECT');
    const collection=db.collection('admin');
    const collection2=db.collection2('customer');
      const admin= await collection.findOne(req.query);
      const user = await collection2.findOne(req.query);
    console.log(user);
    if(user){
      data={ status:true,message: "Logged in Successfully" };
      res.json(data);
  
    }
    }catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "Login failed" };
    res.json(data);
    }
  });
  


  app.post('/api/cakes', (req, res) => {
    const newCake = req.body;
    console.log('New Cake:', newCake);
  
    // Assuming cakes array is accessible here
    cakes.push(newCake);
  
    res.status(201).json({ message: 'Cake added successfully', cake: newCake });
  });
  app.put('/api/cakes', async (req, res) => {
    try {
        const newCake = req.body; // Assuming the request body contains the new cake object
        console.log('New Cake:', newCake);

        // Assuming 'cakes' is an array containing existing cakes
        cakes.push(newCake); // Add the new cake to the array

        // Alternatively, if you're using a database like MongoDB, you would insert the new cake into your database here

        res.status(200).json({ message: 'Cake added successfully', cake: newCake });
    } catch (error) {
        console.error('Error adding new cake:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to handle login requests for admin users

  app.get('/findAll', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');		
        const result = await collection.find({},{name:1,_id:0,username:1,email:1,phone:1,password:1,gender:1}).toArray();
    data={ status:true,message: "Successfully find the docs",list:result };
    res.json(data);
    } catch (err) {
        console.error('Error', err);
        data={ status:false,message: "Failed find the docs"};
    res.json(data);
    }
  });
  
  app.get('/findAll1', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('order');		
        const result = await collection.find({},{cakeName:1,_id:0,customerName:1,date:1,time:1,priceCents:1,quantity:1,total:1,grandTotal:1}).toArray();
    data={ status:true,message: "Successfully find the docs",list:result };
    res.json(data);
    } catch (err) {
        console.error('Error', err);
        data={ status:false,message: "Failed find the docs"};
    res.json(data);
    }
  });
  app.get('/delete', async function (req, res){
    try {
		res.setHeader('content-type','application/json')
		res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');
        const result = await collection.deleteOne(req.query);
		if(result.deletedCount>0)
			data={ status:true,message: "deleted Successfully",noOfDoc:result.deletedCount };
		else
			data={ status:true,message: "No data found",noOfDoc:result.deletedCount };
		res.json(data);
    } catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "delete action failed" };
		res.json(data);
    }
});

app.get('/update', async function (req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const db = client.db('CAKE_PROJECT');
        const collection = db.collection('customer');
        const filter = { email: req.query.email };

        const result = await collection.updateOne(filter, { $set: { password: req.query.password } });

        let data;
        if (result.modifiedCount > 0) {
            data = { status: true, message: "Updated Successfully", noOfDoc: result.modifiedCount };
        } else {
            data = { status: false, message: "No data found", noOfDoc: result.modifiedCount };
        }
        res.json(data);
    } catch (err) {
        console.error('Error ', err);
        const data = { status: false, message: "Update action failed" };
        res.json(data);
    }
});


process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    connect(); // Connect to MongoDB when the server starts
});
