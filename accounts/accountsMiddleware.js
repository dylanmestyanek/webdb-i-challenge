const db = require("./accountsDb");

const validateAccount = (req, res, next) => {
    const newAcc = req.body;
    
    if (!Object.getOwnPropertyNames(newAcc).length) {
        res.status(400).json({ errorMessage: "Please provide a new account to add to the database." })
    } else if (!newAcc.name || !newAcc.budget) {
        res.status(400).json({ errorMessage: "Please provide a name and budget." })
    } else next();
};

const validateAccountId = (req, res, next) => {
    db.get(req.params.id)
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

module.exports = {
    validateAccount,
    validateAccountId
}