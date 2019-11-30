import React, { Component } from 'react'; 
import './App.css'; 
import MessageList from './components/MessageList'; 
import ConversationList from './components/ConversationList'; 
import SendMessageForm from './components/SendMessageForm'; 
import Login from './components/Login';
import { getAllUsers, getConversationsByUser, getLimitedMessages, postMessage } from './components/API'; 
   
class App extends Component {   

  constructor(props) { 
    super(props);  
    this.state = { 
      loggedIn: false, 
      messages: [{ 
        name: 'ChatBot', 
        text: 'Open a conversation :)',
        senderId: null, 
        timestamp: null 
      }],  
      conversationId: null,
      conversationName: '',  
      conversations: null,
      users: null,  
      activeUser: {
        id: null, 
        name: null,
      } 
    }; 
    this.changeChat = this.changeChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);  
    this.login = this.login.bind(this);   
  } 
  
  async componentDidMount() {
    let users = await getAllUsers();    
    this.setState({ users: users });   
  }

  async changeChat({id, name}) {
    this.setState({ 
      messages: null 
    }, async () => {
        const messages = await getLimitedMessages(id);
        this.setState({  
          messages,
          conversationId: id,
          conversationName: name
        });  
      }
    );  
  }    
  
  async sendMessage(text) { 
    const hasPosted = await postMessage(text, this.state.conversationId, this.state.activeUser.id);   
    if (hasPosted) {
      const messages = await getLimitedMessages(this.state.conversationId);  
      this.setState({ messages });
    } 
  }   
    
  async login(username) {
    const user = this.state.users.find(user => username === user.name);
    if (user) {
      this.setState({
        activeUser: user,
        loggedIn: true 
      });
 
      const userConversations = await getConversationsByUser(user.id);     
      this.setState({ conversations: userConversations, activeUser: user });
    } else {
      alert(`Wrong username! (Available user examples: 'Wessel', 'Quint'...)`);  
    }
  }
   
  render() {
    return (
      <div className="app">   
        {
          this.state.loggedIn 
            ? 
              <div className="chat">    
                <ConversationList  
                  conversations={this.state.conversations} 
                  convId={this.state.conversationId} 
                  activeUser={this.state.activeUser}    
                  changeChat={this.changeChat}     
                />   
                {this.state.users && <MessageList 
                  messages={this.state.messages}  
                  users={this.state.users}
                  convName={this.state.conversationName}
                />}
                <SendMessageForm   
                  disabled={!this.state.conversationId || this.state.messages === undefined} 
                  sendMessage={this.sendMessage} 
                />    
              </div>  
            : 
            <Login login={this.login}/>         
        } 
      </div>   
    ); 
  }
}

export default App;
