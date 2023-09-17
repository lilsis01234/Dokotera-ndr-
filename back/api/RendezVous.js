const express = require('express');
const router = express.Router();
const RendezVous = require('../models/Rendezvous');

// Route pour créer un rendez-vous (Create)
router.post('/vous', async (req, res) => {
    try {
        const { patient, heureStart, docteur, description, date } = req.body;

        const newRendezVous = new RendezVous({
            patient,
            docteur,
            description,
            heureStart,
            date
        });

        const savedRendezVous = await newRendezVous.save();
        res.status(201).json(savedRendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du rendez-vous.' });
    }
});

// Route pour obtenir tous les rendez-vous (Read)
router.get('/vous', async (req, res) => {
    try {
        const rendezvous = await RendezVous.find().populate('patient docteur');
        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' });
    }
});

// Route pour obtenir un rendez-vous par son ID (Read)
router.get('/vous/:id', async (req, res) => {
    try {
        const rendezvous = await RendezVous.findById(req.params.id).populate('patient docteur');
        if (!rendezvous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }
        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du rendez-vous.' });
    }
});

// Route pour mettre à jour un rendez-vous par son ID (Update)
router.put('/vous/:id', async (req, res) => {
    try {
        const { patient, docteur, contenu, date } = req.body;

        const updatedRendezVous = await RendezVous.findByIdAndUpdate(
            req.params.id,
            { patient, docteur, contenu, date },
            { new: true }
        );

        if (!updatedRendezVous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }

        res.json(updatedRendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du rendez-vous.' });
    }
});

// Route pour supprimer un rendez-vous par son ID (Delete)
router.delete('/vous/:id', async (req, res) => {
    try {
        const deletedRendezVous = await RendezVous.findByIdAndRemove(req.params.id);

        if (!deletedRendezVous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }

        res.json({ message: 'Rendez-vous supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du rendez-vous.' });
    }
});


router.get('/vous/:user1Id/:user2Id', async (req, res) => {
    try {
        const { user1Id, user2Id } = req.params;

        // Recherchez les rendez-vous entre les deux utilisateurs en utilisant leurs ID
        const rendezvous = await RendezVous.find({
            $or: [
                { patient: user1Id, docteur: user2Id },
                { patient: user2Id, docteur: user1Id }
            ]
        }).sort({ date: 1 });

        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' });
    }
});
module.exports = router;
