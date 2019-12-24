const acceptMessage = ({name, dj = ''}) => `Hi @${name}! YODJ @${dj} has accepted your song request and will deliver it with 10 minutes`
const rejectMessage = ({name, dj = ''}) =>  `Hi @${name}! YODJ @${dj} did not accept your song request. You will not be charged! Thank you!`
const requestReceivedMessage = () => `YODJ! You've received a new song request!`

module.exports = { rejectMessage, requestReceivedMessage, acceptMessage}