import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import Message from './Message';
import Loader from './Loader';

class MessageList extends Component { 
    constructor(props) {
        super(props);
        this.state = {};
        this.mapIdToUSer = this.mapIdToUSer.bind(this);
    }

    UNSAFE_componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight; 
        }
    }

    mapIdToUSer(senderId) {
        let user = this.props.users.find(user => user.id === senderId);
        return user ? user.name : 'Unknown';
    }

    render() {
        return ( 
            <div className="message-list relative"> 
                {this.props.messages !== undefined 
                    ?  
                        <div> 
                            {this.props.messages
                                ? this.props.messages.map((message, index) => {
                                return (
                                    <Message 
                                        key={index}
                                        username={this.mapIdToUSer(message.senderId)}
                                        text={message.text} 
                                        timestamp={message.timestamp}
                                    />
                                )
                                    }).reverse()
                                : <Loader />}
                        </div>  
                    :
                    <div>{`Not found conversation '${this.props.convName}'`}</div>
                }       
            </div>
        ) 
    }
}

export default MessageList; 