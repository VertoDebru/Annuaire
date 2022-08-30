const DB_Contacts = require('../models/Contacts');

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
            DB_Contacts.find({phone: {$gt:contactSearch}})
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
            DB_Contacts.find({name: new RegExp('.*' + contactSearch + '.*')})
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

        DB_Contacts.findOne({ _id: contactId}).then( (result) => {
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
    let name = req.body.name;
    let phone = req.body.phone;
    console.log("[INFO] New 'POST' request ...");

    console.log("[SUCCESS] Contact added!");
    return res.status(200).json('OK');
};
