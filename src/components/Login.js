import React, {Component} from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: '' 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 
 
    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handleSubmit(event) {   
        event.preventDefault(); 
        this.props.login(this.state.username);
        this.setState({
            username: '' 
        });  
    } 

    render() {
        return ( 
            <form className="login" onSubmit={this.handleSubmit}>
                <p>Login</p> 
                <input 
                    type="text"
                    placeholder="Enter your User Name" 
                    value={this.state.username}
                    onChange={this.handleChange} 
                /> 
                <button>Login</button>   
            </form> 
        ) 
    }
} 
  
export default Login; 