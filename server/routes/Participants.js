const Participant = require('../models/Participant');
const router = require("express").Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const participants = await Participant.findAll();
            return res.status(200).json(participants);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    router.route('/:id')
    .get(async (req, res) => {
        try {
            const participant = await Participant.findByPk(req.params.id);
            if (participant) {
                return res.status(200).json(participant);
            } else {
                return res.status(404).json({ error: `The participant with id: ${req.params.id} was not found`});
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const participant = await Participant.findByPk(req.params.id);
            if (participant) {
                const updatedParticipant = await participant.update(req.body);
                return res.status(200).json(updatedParticipant);
            } else {
                return res.status(404).json({error: `The participant with id: ${req.params.id} was not found`});
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;

        Participant.destroy({
            where: { idParticipant: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `The participant with id: ${id} was deleted!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete participant with id: ${id}`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Cannot delete participant with id: ${id}`
                });
            })
    })


module.exports = router;