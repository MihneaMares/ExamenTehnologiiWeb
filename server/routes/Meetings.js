const Meeting = require('../models/Meeting');
const router = require("express").Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const meetings = await Meeting.findAll();
            return res.status(200).json(meetings);
        } 
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newMeeting = await Meeting.create(req.body);
            return res.status(200).json(newMeeting);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    //http://localhost:8080/entitati1/filter?idEntitate1=2
    router.route('/filter')
    .get(async (req, res) => {
        const meetings = await Meeting.findAll();
        let filteredMeetings;
        if(req.query.idEntitate1){
            filteredMeetings =  meetings.filter(x => x.idMeeting == req.query.idMeeting);
            return res.status(200).json(filteredMeetings);

        }else{
            return res.status(500).json("Not found");
        }
    })

    router.route('/sortare')
    .get(async (req, res) => {
        const meetings = await Meeting.findAll();
        
        if(meetings){
          return res.status(200).json(meetings.sort((a, b) => a.descriere.length - b.descriere.length ));
        }
            

        else{
            return res.status(500).json("Meetings don't exist");
        }
    })

    //http://localhost:8080/entitati1/filter?idEntitate1=5&numeEntitate1=bianca
    router.route('/filter2/')
    .get(async (req, res) => {
        const meetings = await Meeting.findAll();
        let filteredMeetings;
        if(req.query.idMeeting && req.query.descriere){
            filteredMeetings =  meetings.filter(x => (x.idMeeting >= req.query.idMeeting && x.descriere.length >= req.query.descriere));
            return res.status(200).json(filteredMeetings);

        }else{
            return res.status(500).json("Not found");

        }
    })

    router.route('/:id')
    .get(async (req, res) => {
        try {
            const meeting = await Meeting.findByPk(req.params.id);
            if (meeting) {
                return res.status(200).json(meeting);
            } else {
                return res.status(404).json({ error: `The meeting with id: ${req.params.id} was not found`});
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const meeting = await Meeting.findByPk(req.params.id);
            if (meeting) {
                const updatedMeeting = await meeting.update(req.body);
                return res.status(200).json(updatedMeeting);
            } else {
                return res.status(404).json({ error: `The meeting with id: ${req.params.id} was not found` });
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;

        Meeting.destroy({
            where: { idMeeting: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `The meeting with id: ${id} was deleted!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete meeting with id: ${id}`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete meeting with id: ${id}`
                });
            })
    })
    
    module.exports = router;


