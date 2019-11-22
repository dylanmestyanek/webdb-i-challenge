const db = require("../data/dbConfig");

const get = (id) => {
    return id
        ? db('accounts').where({ id })
        : db('accounts')
}

const insert = (account) => {
    return db('accounts')
        .insert(account, "id")
        .then(([id]) => get(id))
}

const update = (id, updatedAcc) => {
    return db('accounts')
        .where({ id })
        .update(updatedAcc)
        .then(() => get(id))
}

const remove = (id) => {
    return db('accounts')
        .where({ id })
        .del()
}

module.exports = {
    get,
    insert,
    update,
    remove
}