import React, {Component} from 'react';

class Message extends Component {
    render() {
        return ( 
            <div className="message">
                <div className="message-username">{this.props.username}</div>
                <div className="message-box"> 
                    <p>{this.props.text}</p>  
                    <div className="message-timestamp">{this.props.timestamp}</div>
                </div> 
            </div> 
        )
    }
}
 
export default Message;  