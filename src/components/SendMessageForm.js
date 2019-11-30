import React, {Component} from 'react';

class SendMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 
     
    handleChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleSubmit(event) {   
        event.preventDefault(); 
        if (this.state.message.trim() !== "") {
            this.props.sendMessage(this.state.message);
            this.setState({
                message: ''
            }); 
        }  
    }
      
    render() { 
        return (
            <form className="send-message-form" onSubmit={this.handleSubmit}> 
                <input 
                    disabled={this.props.disabled}
                    onChange={this.handleChange} 
                    value={this.state.message}
                    placeholder={this.props.disabled ? "" : "Enter message here..."} 
                    type="text"   
                /> 
            </form>
        )
    } 
}

export default SendMessageForm; 