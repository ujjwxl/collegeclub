import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import razorpay from 'razorpay'
import crypto from 'crypto'
import AuthRoute from './routes/AuthRoute.js'
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { db } from './firebase.js'

dotenv.config();

const app = express();
app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log("Listening")
})

//razorpay code

const instance = new razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET
})

app.post('/checkout', async (req,res) => {
    
    const options = {
        // amount: Number(req.body.amount * 100)
        amount: 500000,
        currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success: true, order
    })
})

app.post("/paymentverification",async(req,res) => {

    const userId = req.query.userid;

    const { razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" +razorpay_payment_id;
    const expectedsgnature = crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
    const isauth = expectedsgnature === razorpay_signature;

    if(isauth){
    //  await Payment.create({
    //      razorpay_ordcer_id,razorpay_payment_id,razorpay_signature 
    //  })
     console.log('Order id')
     console.log(razorpay_order_id)

     console.log('Payment id')
     console.log(razorpay_payment_id)

     const usersCollectionRef = collection(db, "users");
     const q = query(usersCollectionRef, where("userId", "==", userId));
     const querySnapshot = await getDocs(q);

     querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
    
        // await updateDoc(docRef, { paymentStatus: true });

        await updateDoc(docRef, { 
            paymentStatus: true,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        });
        
        console.log('Payment status updated successfully');
    });

     res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
    }
    else{
     res.status(400).json({success:false});
    }
 })

app.get("/api/getkey",(req,res)=>{
    return res.status(200).json({key:process.env.KEY})
})

app.use('/auth',AuthRoute)
// app.use('/todo',ToDoRoute)