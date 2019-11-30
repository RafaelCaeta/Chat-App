import React, {Component} from 'react';
import Loader from './Loader';  

class ConversationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterStr: ''
        };
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(event) {  
        this.setState({
            filterStr: event.target.value
        });
    }
  
    render() {  
        const orderedConversations = this.props.conversations 
            ?   [...this.props.conversations]
                    .sort((a, b) => a.id > b.id)
                    .filter(conv => {
                        let chatName = conv.conversation.name;
                        return chatName && chatName.toLowerCase().includes(this.state.filterStr.toLowerCase());
                    })
                    .splice(0, 20)
            :   []; 
  
        return ( 
            <div className="conversation-list relative">
                <h3>{this.props.activeUser.name} #{this.props.activeUser.id} Chat Conversations:</h3> 
                <input    
                    onChange={this.handleChange}  
                    value={this.state.filterStr} 
                    placeholder="Search..." 
                    type="text"
                /> 
                {!this.props.conversations && <Loader />} 
                {this.props.conversations && <ul>
                    {orderedConversations.map((obj, index) => {
                        const conversationTitle = obj.conversation.name === null ? "Unnamed" : obj.conversation.name;
                        const active = this.props.convId === obj.conversation.id ? "active" : "";
                        return (       
                            <li key={index} className={"conversation " + active}>  
                                <a onClick={() => this.props.changeChat(obj.conversation)}>  
                                    # &nbsp; {conversationTitle}   
                                </a>     
                            </li>        
                        )   
                    })} 
                </ul>}
            </div> 
        ) 
    }
} 
    
export default ConversationList;  