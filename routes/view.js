var express=require('express');
var router=express.Router();
var Participant=require('../models/participant');

router.get("/viewAllRegistrations",async(req,res)=>{
    try{
        let participants=await Participant.find();
        // participants.push({count:participants.length});
        res.render("viewAll",{participants:participants});
        // res.status(200).send(participants);
    }catch(err){
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