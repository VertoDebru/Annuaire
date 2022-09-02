const Contacts = require('../models/Contacts');

// Rechercher un contact.
exports.getContact = (req, res) => {
    let contactId = req.query.id;
    let contactSearch = req.query.search;
    let isLetter = false;
    // Verifie si il s'agit d'une recherche.
    if(contactSearch) {
        // Verifie si 'contactSearch' contient des lettres.
        let checkSearch = contactSearch.match(/[A-Za-z]/g);
        if(checkSearch) isLetter = true;
        
        if(!isLetter) {
            Contacts.find({phone: new RegExp('.*' + contactSearch + '.*')})
            .then( (result) => {
                if(!result || result.length === 0) return res.status(204).json('No results!');

                console.log("[INFO] New search by phone number ...");
                console.log("[SUCCESS] Contact found!");
                return res.status(200).json(result);
            }).catch( (error) => {
                console.log("[ERROR] "+error);
                return res.status(400).json({ error: error });
            });
        }
        else {
            Contacts.find({name: new RegExp('.*' + contactSearch + '.*')})
            .then( (result) => {
                if(!result || result.length === 0) return res.status(204).json('No results!');

                console.log("[INFO] New search by name ...");
                console.log("[SUCCESS] Contact found!");
                return res.status(200).json(result);
            }).catch( (error) => {
                console.log("[ERROR] "+error);
                return res.status(400).json({ error: error });
            });
        }
    }
    // Si il s'agit d'une recherche par ID.
    else {
        if(!contactId) return res.status(500).json('Params ID undefined!');
        console.log("[INFO] New 'GET' request ...");

        Contacts.findOne({ _id: contactId}).then( (result) => {
            if(!result) return res.status(204).json('No results!');

            console.log("[SUCCESS] Contact found!");
            return res.status(200).json(result);
        }).catch( (error) => {
            console.log("[ERROR] "+error);
            return res.status(400).json({ error: error });
        });
    }
};

// Ajouter un contact.
exports.postContact = (req, res) => {
    let contactObj = req.body;
    console.log("[INFO] New 'POST' request ...");
    const contact = new Contacts({...contactObj});
    contact.save().then(() => {
        res.status(201).json({ message: 'Contact enregistré !'});
        console.log("[SUCCESS] Contact added!");
    })
    .catch(error => {
        res.status(400).json({ error });
        console.log("[ERROR] "+error);
    });
};
