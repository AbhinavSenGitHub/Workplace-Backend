const mongoose = require("mongoose")

const urlOfDB = "mongodb://localhost:27017/workplace"

const connectionToDB = async () => {
    try{
        mongoose.connect(urlOfDB)
        console.log("connected to database")
    }catch (error) {
        console.log("error in connecting to mongodb: ", error)
    }
}

connectionToDB()
module.exports= mongoose;















// const mongoose = require("mongoose");

// const atlsURLofMongoDB = "mongodb://0.0.0.0:27017/workplace"
// const connectToMongoDB = async () => {
//     try{
//         await mongoose.connect(atlsURLofMongoDB, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: true,
//             useCreateIndex: true,
//         });
//         console.log("Connected to MongoDB");
//     }catch (error){
//         console.log("Error connecting to MongoDB: " + error)
//         process.exit(1);
//     }
// }
// connectToMongoDB();
// module.exports = mongoose;