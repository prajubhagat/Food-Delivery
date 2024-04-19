const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://prajubhagat10:Uc6m85h2pMJvvSRq@praju.urrkppw.mongodb.net/GoFood?retryWrites=true&w=majority&appName=praju"

const mongoDB =() =>{
     mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err) console.log("---", err)
        else{
            console.log("connected succefully");
            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err, data){
                if(err) console.log(err);
                else console.log(data);
            })
    }
        
    });
}

module.exports= mongoDB;
