const express=require('express');
const router=express.Router();
const fs=require('fs');
const multer=require('multer');
const path=require("path");
const upload = multer({ dest: 'uploads/' })
var {google}=require('googleapis');
var Participant=require('../models/participant');


router.post("/register",upload.single("abstract"),async(req,res)=>{
    try{
        if(req.body.teamSize<=1){
            res.status(200).send("Minimum Team size should 2");
        }
        else{
            let savedParticipant;
            const KEYFILEPATH=path.join(path.dirname(__dirname),"wiehackathon2021-491e16d078e1.json");
            const SCOPES=['https://www.googleapis.com/auth/drive'];
            let id;
            const auth = new google.auth.GoogleAuth({
                keyFile:KEYFILEPATH,
                scopes:SCOPES
            });
            async function createUserAndUploadFile(auth){
                const drive = google.drive({version:'v3',auth});
                let fileMetadata = {
                    'name': req.body.teamName + '_' + req.body.teamLeaderEmail,
                    mimeType: 'application/pdf',
                    'parents': ['1Ay5a1HKTgs07WJaeWWGQrGOnsoBBkRcn']
                };
                const media = {
                    mimeType: 'application/pdf',
                    body: fs.createReadStream(req.file.path)
                };
                const file = await drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                });
                id=file.data.id;
                var participant=new Participant({
                    ...req.body,
                });
                savedParticipant=await participant.save();
            }
            await createUserAndUploadFile(auth).catch(err=>{throw err});
            fs.unlinkSync(req.file.path);
            res.status(200).send(savedParticipant);
        }
    }catch(err){
        console.log(err);
        fs.unlinkSync(req.file.path);
        res.status(400).send({err});
    }
});

module.exports=router;