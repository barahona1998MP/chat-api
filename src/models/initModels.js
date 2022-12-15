const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')


const Conversations = require('./conversations.models')
const Participants = require('./participants.models')
const Messages = require('./messages.models')



const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)
    
    //? FK = messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //? FK = conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)
    
    //? usuarios - participaciones tabla pivote entre usuarios - conversations
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //? conversations - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? conversations - participaciones tabla pivote entre usuarios - conversations
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels