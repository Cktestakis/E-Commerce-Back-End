const router = require("express").Router();
const { Category, Product } = require("../.../models");

// The ` /api/categories` endpoint

router.get("/", (req, res) => {
    // FIND ALL CATEGORIES
    // INCLUDE ITS ASSOCIATED PRODUCTS

    Category.findAll({
        include: {
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
    })
        .then((categoryData) => {
            if (!categoryData) {
                res.status(404).json({ message: `No Categories Found!` });
                return
            }
            res.json(categoryData);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res) => {
    // FIND ONE CATEGORY BY ITS `ID` VALUE
    // INCLUDE ITS ASSOCIATED PRODUCTS
    Category.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
    })
        .then((categoryData) => {
            if (!categoryData) {
                res.status(404).json({ message: `NO Categories found with this ID` });
                return;
            }
            res.json(categoryData);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.post("/", (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
        .then((categoryData) => res.json(categoryData))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.put("/:id", (req, res) => {
    // UPDATE A CATEGORY BY ITS `ID` VALUE  
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((categoryData) => {
            if(!categoryData) {
                res.status(404).json({ message: `No Category found with this ID` });
                return;
            }
            res.json(categoryData);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((categoryData) => {
            if (!categoryData) {
                res.status(404).json({ message: `No Category found with this id` });
                return;
            }
            res.json(categoryData);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

module.exports = router;