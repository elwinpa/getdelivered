const product = require('../models/productModel');

const multer = require('multer');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      },
  });

const upload = multer({ storage: storage });


// Example usage in a route


exports.create = async (req,res,next) => {

    // Create a product
    const productVal = new product({
        productName: req.body.productName || "Untitled productName", 
        productDescription: req.body.productDescription,
        category : req.body.category,
        image : req.body.image,
        price : req.body.price
    });

    // Save Note in the database
    productVal.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
}

// Find all the products with a category
exports.findByCategory = (req,res) => {

    product.find({ category : req.body.category})
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
}

// Find a single product with a productId
exports.findOne = (req, res) => {
    console.log(req.params.productId);
    product.findById(req.body.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.productId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }


    // Find note and update it with the request body
    product.findByIdAndUpdate(req.body.productId, {
        productName: req.body.productName || "Untitled productName", 
        productDescription: req.body.productDescription,
        category : req.body.category,
        image : req.body.image,
        price : req.body.price
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.productId
        });
    });
};


exports.delete = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Product  content can not be empty"
        });
    }

    product.findByIdAndDelete(req.body.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.productId
        });
    });

};