var express=require('express');
var router=express.Router();
var Participant=require('../models/participant');

router.get("/viewAllRegistrations",async(req,res)=>{

    try{
        let participants=await Participant.find();
        // console.log(participants)
        res.render("viewAll",{participants:participants});
    }catch(err){
        console.log(err)
        res.status(400).send({message:err});
    }
});

router.get("/viewAllRegistrationsJSON",async(req,res)=>{
    try{
        let participants=await Participant.find();
        participants.push({count:participants.length});
        res.status(200).send(participants);
    }catch(err){
        res.status(400).send({message:err});
    }
});

module.exports=router;