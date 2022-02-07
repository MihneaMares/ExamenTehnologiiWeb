'use strict'

const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routerMeeting = require('./routes/Meetings');
const routerParticipant = require('./routes/Participants');
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');

Meeting.hasMany(Participant);

app.use(cors())
 
app.get('/', (req, res) => {
    res.send('Welcom to my API');
})

app.listen(port, () => {
    console.log('Running on port' + port);
})


app.use('/meetings', routerMeeting);
app.use('/participants', routerParticipant);

//un utilizator sa poata aduga mai multe alimente
app.post('/meeting/:idMeeting/participants', async (req, res, next) => {
    try {
        const meeting = await Meeting.findByPk(req.params.idMeeting);
        if (meeting) {
            const participant = new Participant(req.body);
            participant.MeetingIdMeeting = meeting.idMeeting;
            console.log(req.params.idMeeting);
            await participant.save();
            res.status(201).json({ message: `Participant was created!` });
        }
        else {
            res.status(404).json({ message: `The meeting with id ${req.params.id} was not found!` });
        }
    } catch (err) {
        next(err);
    }
})

app.get('/meeting/:idMeeting/participants', async (req, res, next) => {
    try {
        const meeting = await Meeting.findByPk(req.params.idMeeting, {
            include: [Participant],
        })
        if (meeting) {
            res.status(201).json(meeting.participants);
        }
        else {
            res.status(404).json({ message: 'Meeting was not found!' });
        }
    } catch (err) {
        next(err);
    }
})

app.put('/meeting/:idMeeting/participants/:idParticipant', async (req, res) => {
    try {
        if (req.params.idMeeting && req.params.idParticipant) {
            const meeting = await Meeting.findByPk(req.params.idMeeting);

            const participant = await Participant.findByPk(req.params.idParticipant);

            if (meeting && participant) {
                Object.entries(req.body).forEach(([attribute, value]) => participant[attribute] = value);
                const updatedParticipant = await participant.save();
                return res.status(200).json(updatedParticipant);
            } else {
                return res.status(404).json({ error: `The participant with id: ${req.body.idCrewMember} was not found` });
            }
        }

    } catch (err) {
        return res.status(500).json(err);
    }
})

app.delete('/meeting/:idMeeting/participants/:idParticipant', async (req, res, next) => {
    Participant.destroy({
        where: {
            MeetingIdMeeting: req.params.idMeeting,
            idParticipant: req.params.idParticipant
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Participant with meeting id: ${req.params.idMeeting} and participant id: ${req.params.idParticipant} deleted!`
                });
            } else {
                res.send({
                    message: `Cannot delete participant with meeting id: ${req.params.idMeeting} and participant id: ${req.params.idParticipant}. Maybe Entitate2 was not found!`
                });
            }
        })
})