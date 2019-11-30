import axios from 'axios'; 

export const getAllUsers = async () => {
    return axios.get("http://assignment.bunq.com/users")
        .then((res) => res.data)
        .catch(err => {
            console.error(`Error on getting users: ${err}`);
            return [];   
        });
};
 
export const getConversationsByUser = async (userId) => {
    return axios.get(`http://assignment.bunq.com/conversation/user/${userId}`)
        .then((res) => res.data)
        .catch(err => {
            console.error(`Error on getting conversations by user: ${err}`);
            return [];   
        });
}; 
    
export const getLimitedMessages = async (cnvId) => {
    return axios.get(`http://assignment.bunq.com/conversation/${cnvId}/message/limited?limit=25&offset=0`)
        .then(res => res.data.map(message => ({ 
            text: message.message,  
            name: message.senderId,  
            senderId: message.senderId,  
            timestamp: message.timestamp 
        }))) 
        .catch(err => {
            console.error(`Error on getting messages: ${err}`);
            return undefined; 
        });  
}; 

export const postMessage = async (text, convId, userId) => {   
    return axios.post(`http://assignment.bunq.com/conversation/${convId}/message/send`, {
        senderId: userId, 
        message: text    
    })
    .then(res => res.status === 200)
    .catch(err => { 
        console.error(`Error on sending message: ${err}`);
        return [];
    });     
};
   