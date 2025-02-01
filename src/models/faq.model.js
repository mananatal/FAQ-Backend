import mongoose, { Schema } from "mongoose";


const translatedSchema=new Schema({
    que:{ 
        type: String, 
        required: true 
    },
    ans:{ 
        type: String, 
        required: true 
    }
},{ _id: false });

const FAQSchema=new Schema({
    question:{
        type:String,
        required:true,
        unique:true
    },
    answer:{
        type:String,
        required:true,
    },
    translations:{
        type:Map,
        of:translatedSchema
    }
},{timestamps:true});


export const FAQ=mongoose.model("FAQ",FAQSchema);