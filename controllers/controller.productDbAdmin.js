const Item = require('../models/model.productDb')

const controller = {
    getAll: async (request, response) => {
        await Item.find()
            .then(items => response.json(items))
            .catch(err => response.status(400).json('Error: ' + err));
    },

    getById: async (request, response) => {
        await Item.findById(request.params.id)
            .then(items => response.json(items))
            .catch(err => response.status(400).json('Error: ' + err));
    },

    addMedicine: async (request, response) => {
        const itemName = request.body.itemName;
        const price = request.body.price;
        let quantity = request.body.quantity;
        const minimumThresholdValue = request.body.minimumThresholdValue;
        let query = {
            itemName: { $regex: itemName }
        };
        Item.findOne(query, async (err, result) => {
            if (err) {
                response.json(('Error: ') + err);
            }
            else if (result == null) {
                const newItem = new Item({
                    itemName,
                    price,
                    quantity,
                    minimumThresholdValue
                });
                await newItem.save()
                    .then(() => response.json("Medicine Not found in Database. Creating New Entry! Medicine added in the Database"))
                    .catch(err => response.status(400).json('Error: ' + err));
            }
            else {
                quantity += result.quantity;
                await Item.findByIdAndUpdate(result.id, { $set: request.body })
                    .then(() => {
                        Item.findByIdAndUpdate(result.id, { $set: { quantity } })
                            .then(() => {
                                response.write("Medicine already availale! Updated the Database")
                                response.send();
                            })
                            .catch(err => response.status(400).json("Error: " + err));
                    })
                    .catch(err => response.status(400).json("Error: " + err));
            }
        });
    },

    deleteById: async (request, response) => {
        const ID = request.params.id;
        await Item.findByIdAndDelete(ID)
            .then(() => {
                response.json("Medicine Deleted from Database");
            })
            .catch(err => response.status(400).json("Error: " + err));
    },

    updateById: async (request, response) => {
        await Item.findByIdAndUpdate(request.params.id, { $set: request.body })
            .then(() => response.json("Updated Databse"))
            .catch(err => response.status(400).json("Error: " + err));
    }
}

module.exports = controller;