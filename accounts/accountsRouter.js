const router = require("express").Router();

const db = require("../data/dbConfig");

// Get all accounts
router.get("/", (req, res) => {
    db('accounts')
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(500).json({ error: "Failed to get accounts." }))
});

// Get account by ID
router.get("/:id", validateAccountId, (req, res) => res.status(200).json(req.account));

// Add an account
router.post("/", validateAccount, (req, res) => {
    db('accounts')
    .insert(req.body)
    .then(added => res.status(201).json(added))
    .catch(err => res.status(500).json({ error: "Failed to add new account." }))
});

// Update an account
router.put("/:id", validateAccountId, validateAccount, (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(updated => res.status(201).json(updated))
    .catch(err => res.status(500).json({ error: "Failed to update account." }))
});

// Delete an account
router.delete("/:id", validateAccountId, (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(deleted => res.json(deleted))
    .catch(err => res.status(500).json({ error: "Failed to delete account." }))
})

function validateAccount (req, res, next) {
    const newAcc = req.body;
    if (!Object.getOwnPropertyNames(newAcc).length) {
        res.status(400).json({ errorMessage: "Please provide a new account to add to the database." })
    } else if (!newAcc.name || !newAcc.budget) {
        res.status(400).json({ errorMessage: "Please provide a name and budget." })
    } else next();
};

function validateAccountId(req, res, next) {
    db('accounts')
    .where({ id: req.params.id })
    .then(account => {
        if (account.length) {
            req.account = account;
            next();
        } else {
            res.status(404).json({ errorMessage: "There is not an account with that ID." })
        }
    })
    .catch(err => res.status(500).json({ error: "Failed to get account." }))
}

module.exports = router;