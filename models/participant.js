const mongoose=require("mongoose");

const participantSchema=new mongoose.Schema({
    teamName:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true
    },
    teamSize:{
        type:Number,
        required:true
    },
    teamLeaderName:{
        type:String,
        required:true
    },
    teamLeaderEmail:{
        type:String,
        required:true
    },
    teamLeaderPhone:{
        type:String,
        required:true
    },
    teamLeaderCollege:{
        type:String,
        required:true
    },
    member1Name:{
        type:String,
        required:true
    },
    member1Email:{
        type:String,
        required:true
    },
    member1Phone:{
        type:String,
        required:true
    },
    member1College:{
        type:String,
        required:true
    },
    member2Name:{
        type:String,
    },
    member2Email:{
        type:String,
    },
    member2Phone:{
        type:String,
    },
    member2College:{
        type:String,
    },
    member3Name:{
        type:String,
    },
    member3Email:{
        type:String,
    },
    member3Phone:{
        type:String,
    },
    member3College:{
        type:String,
    },
},{timestamps:true});

module.exports=mongoose.model("Participant",participantSchema);