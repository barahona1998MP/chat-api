const conversationsControllers = require('./conversations.controllers')

const getAllConversations = (req, res) => {
    conversationsControllers.findAllConversations()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const postConversation = (req, res) => {
    const {title, imgUrl, participantId} = req.body
    const ownerId = req.user.id
    conversationsControllers.createConversation({title, imgUrl, participantId, ownerId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message,
                fields: {
                    title: 'String',
                    imgUrl: 'String',
                    participantId: 'UUID'
                }
            })
        })

}

module.exports = {
    getAllConversations,
    postConversation
}