const router = require("express").Router();

const db = require("../data/dbConfig");
const {
    validateAccount,
    validateAccountId
} = require("./accountsMiddleware");

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

module.exports = router;