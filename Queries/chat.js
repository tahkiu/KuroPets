const pool = require('./connect')

const getAllChats = (request, response) => {
    pool.query('SELECT * FROM tbl_Chat', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllUserChats = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM tbl_Chat WHERE sendeeID = $1 OR senderID = $1',
    [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserChat = (request, response) => {
    const id1 = parseInt(request.params.accID1)
    const id2 = parseInt(request.params.accID2)
    pool.query('SELECT * FROM tbl_Chat WHERE (sendeeID = $1 AND senderID = $2) OR (sendeeID = $2 AND senderID = $1)',
    [id1, id2],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createChat = (request, response) => {
    const id1 = parseInt(request.params.accID1)
    const id2 = parseInt(request.params.accID2)
    const {chatMessage, chatTimestamp} = request.body
    pool.query('INSERT INTO tbl_Chat (sendeeID, senderID, chatMessages, chatTime) VALUES ($1, $2, $3, $4)',
    [id1, id2, chatMessage, chatTimestamp],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Chat created with ID: ${results.chatID}`)
    })
}

module.exports = {
    getAllChats,
    getAllUserChats,
    getUserChat,
    createChat
};
