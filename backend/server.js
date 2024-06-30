import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import razorpay from 'razorpay'
import crypto from 'crypto'
import multer from 'multer';
import AuthRoute from './routes/AuthRoute.js'
import SlotRoute from './routes/SlotRoute.js'
import AdminRoute from './routes/BackOfficeRoute.js'
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db } from './firebase.js'
import { format } from 'path'

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

app.post('/coursecheckout', async (req,res) => {
    
    const options = {
        amount: 300000,
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


 app.post("/coursepaymentverification",async(req,res) => {

    const userId = req.query.userid;
    const userName = req.query.username;
    const selectedCourse = req.query.courseid;
    const courseName = req.query.coursename;
    const instructorName = req.query.instructorname;

    console.log("Selected course : ", selectedCourse);

    const { razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" +razorpay_payment_id;
    const expectedsgnature = crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
    const isauth = expectedsgnature === razorpay_signature;

    if(isauth){
     console.log('Order id')
     console.log(razorpay_order_id)

     console.log('Payment id')
     console.log(razorpay_payment_id)

    const docRef = await addDoc(collection(db, "paidcourseapplicants"), {
      userId,
      userName,
      courseId: selectedCourse,
      courseName,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      instructorName,
      purchasedAt: Date.now()
    });

     const usersCollectionRef = collection(db, "users");
     const q = query(usersCollectionRef, where("userId", "==", userId));
     const querySnapshot = await getDocs(q);

     querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;

        const courseDetails = {
            paymentStatus: "partial",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            courseId: selectedCourse,
            courseName,
            instructorName,
            paid: 3000
        }

        await updateDoc(docRef, { 
            purchasedCourses: arrayUnion(courseDetails),
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


const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload/profile/:userId", upload.single("filename"), async (req, res) => {

    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                profilePicture: downloadURL
            });
            
            console.log('Profile picture updated successfully');
        });

        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});


app.post("/upload/banner/:userId", upload.single("filename"), async (req, res) => {

    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Banner image successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                bannerImage: downloadURL
            });
            
            console.log('Banner image URL updated successfully');
        });

        return res.send({
            message: 'Banner image uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/studentprofilepicture/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Student profile photo successfully uploaded.');

        return res.send({
            message: 'PAN card uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/employeeprofilepicture/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Employee profile photo successfully uploaded.');

        return res.send({
            message: 'PAN card uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/authorization/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Authorization letter successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                authorizationLetter: downloadURL
            });
            
            console.log('Authorization letter URL updated successfully');
        });

        return res.send({
            message: 'Authorization letter uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/ranking/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Ranking reference document successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                rankingReference: downloadURL
            });
            
            console.log('Ranking reference document URL updated successfully');
        });

        return res.send({
            message: 'Ranking reference document uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});
app.post("/upload/pancard/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('PAN card successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                panCard: downloadURL
            });
            
            console.log('PAN card URL updated successfully');
        });

        return res.send({
            message: 'PAN card uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/registration/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Registration certificate successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                registrationCertificate: downloadURL
            });
            
            console.log('Registration certificate URL updated successfully');
        });

        return res.send({
            message: 'Registration certificate uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/address/:userId", upload.single("filename"), async (req, res) => {
    const { userId } = req.params;

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Adress proof successfully uploaded.');

        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                addressProof: downloadURL
            });
            
            console.log('Adress proof URL updated successfully');
        });

        return res.send({
            message: 'Adress proof uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post("/upload/resume", upload.single("filename"), async (req, res) => {

    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Resume successfully uploaded.');

        return res.send({
            message: 'Resume uploaded to Firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});


app.post("/upload/images/:userId", upload.array("images", 5), async (req, res) => {
    const { userId } = req.params;

    try {
        const images = req.files;
        const imageUrls = [];

        // Upload each image to Firebase Storage
        for (const image of images) {
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `images/${image.originalname + "       " + dateTime}`);
            const metadata = {
                contentType: image.mimetype,
            };

            const snapshot = await uploadBytesResumable(storageRef, image.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            imageUrls.push(downloadURL);
        }

        console.log('Images successfully uploaded.');

        // Update the user document with the image URLs
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;

            await updateDoc(docRef, { 
                galleryImages: imageUrls
            });
            
            console.log('Image URLs updated successfully');
        });

        return res.send({
            message: 'Images uploaded to Firebase storage',
            imageUrls: imageUrls
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});


const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

app.use('/auth',AuthRoute)
app.use('/slot',SlotRoute)
app.use('/admin', AdminRoute)
// app.use('/todo',ToDoRoute)