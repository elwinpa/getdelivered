const profile = require('../models/ProfileModel');



exports.create = async (req,res,next) => {

    // Create a product
    const profileVal = new profile({
        userId: req.body.userId || "Untitled productName", 
        address: req.body.address,
        items : req.body.items,
        finalPrice : req.body.finalPrice,
    });

    // Save Note in the database
    profileVal.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
}


// Find all the products with a category
exports.findByUser = (req,res) => {

    profile.find({ userId : req.body.userId})
        .then(profiles => {
            res.send(profiles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
}