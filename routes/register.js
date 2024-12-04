const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const upload = multer({ dest: 'uploads/' })
var { google } = require('googleapis');
var Participant = require('../models/participant');


router.post("/register", upload.single("abstract"), async (req, res) => {
    try {
        if (req.body.teamSize <= 1) {
            res.status(200).send("Minimum Team size should 2");
        }
        else {
            let savedParticipant;
            // const KEYFILEPATH=path.join(path.dirname(__dirname),"psyched-thunder-373816-df557d4e487a.json");
            const KEYFILEPATH = path.join(path.dirname(__dirname), "proud-armor-432117-u6-0c2f9a304820.json");
            console.log("1st check point")
            const SCOPES = ['https://www.googleapis.com/auth/drive'];
            let id;
            const auth = new google.auth.GoogleAuth({
                keyFile: KEYFILEPATH,
                scopes: SCOPES
            });
            console.log(auth)
            async function createUserAndUploadFile(auth) {
                const drive = google.drive({ version: 'v3', auth });
                console.log(req.file.originalname)
                console.log("second ")
                let fileMetadata = {
                    'name': req.body.teamName + '_' + JSON.parse(req.body.teamDetails)[0].leadName + "." + req.file.originalname.split('.').pop(),
                    mimeType: 'application/*',
                    // 'parents': ['1Oo-D9NZ-hvHOQyWuW9nXYszYyOTDT9Si']
                    // 'parents': ['1SmCa_3ic6iad2SMMb4pzJHjRntDmw4NH'] anagha
                    'parents': ['1AZ2ZUaSMVBpObv9xFVh7iPkvmhCD19GH']


                };
                const media = {
                    mimeType: 'application/*',
                    body: fs.createReadStream(req.file.path)
                };
                const file = await drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                });
                console.log("third")
                id = file.data.id;
                let array = JSON.parse(req.body.teamDetails);
                let part = {}
                for (let i = 0; i < array.length; i++) {
                    part = {
                        ...part,
                        ...array[i]
                    }
                }
                var participant = new Participant({
                    teamName: req.body.teamName,
                    teamSize: req.body.teamSize,
                    domain: req.body.domain,
                    referral: req.body.referral,
                    ...part
                });
                savedParticipant = await participant.save();
            }
            console.log("fourth")
            await createUserAndUploadFile(auth).catch(err => { throw err });
            console.log("fifth")
            fs.unlinkSync(req.file.path);
            console.log("sixth")
            res.status(200).send({ "status": 200, "message": "successful" });
        }
    } catch (err) {
        console.log(err);
        fs.unlinkSync(req.file.path);
        res.status(400).send({ err });
    }
});

module.exports = router;