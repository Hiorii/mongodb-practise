const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const prod = await Product.findOne().skip(rand);
        if(!prod) res.status(404).json({ message: 'Not found...' });
        else res.json(prod);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if(!prod) res.status(404).json({ message:'Not found...' });
        else res.json(prod);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    const { name, client } = req.body;
    try {
        const newProd = new Product({ name:name, client:client });
        await newProd.save();
        res.json({ message: 'Ok' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {
    const { name, client } = req.body;
    try {
        const prod = await(Product.findById(req.params.id));
        if(prod) {
            prod.name = name;
            prod.client = client;
            await prod.save();
            res.json({ message: 'Ok' });
        }
        else res.status(404).json({ message: 'Not found..' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.remove = async (req, res) => {
    try {
        const prod = await(Product.findById(req.params.id));
        if(prod) {
            await Product.deleteOne({_id:req.params.id});
            res.json({ message: 'Ok' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};