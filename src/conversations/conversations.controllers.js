const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imageUrl,
        userId: obj.ownerId //? Creador de la conversacion owner
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //? Este es el owner que viene desde token
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

module.exports = {
    findAllConversations,
    createConversation
}

/* createConversation({
    title: 'Conversacion Sahid - Evertz',//? Titulo del chat
    ownerId: 'd52afc5e-ccc3-4ef4-ad19-4ca3d669b308', //? Evertz como owner
    participantId: '1f336fa5-4d1f-4c79-9357-94aec8ed0b61' //? Sahid como invitado
})
.then(data => console.log(data))
.catch(err => console.log(err)) */
