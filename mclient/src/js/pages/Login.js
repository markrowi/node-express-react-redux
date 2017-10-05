import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            password:'',
            isLogged:false,
            error: [],
            name: '',
            user:{}
        }
    }
    logout(){
        var self = this;
        axios.get('/api/logout', this.state).then(function(res){
            console.log(res.data)
            self.setState({isLogged:res.data.isLogged, username:'', password:''}) 
        })
    }
    submit(){
        var self = this;
        axios.post('/api/login', this.state).then(function({data}){
            console.log(data)
            self.setState({isLogged:data.isLogged, error:data.messages.error, user:data.user}) 
        })
        console.log('Submit')
    }
    
    handleInputChange({target}){
        this.setState({[target.name]:target.value});
    }

    componentWillMount(){
        var self = this;
            axios.get('/api/login').then(function({data}){
            self.setState({isLogged:data.isLogged, error:data.messages.error, user:data.user}) 
        })
    }

    render(){
        const logged = this.state.isLogged
        const error = this.state.error;
        const hasError = !!(this.state.error && this.state.error.length);

        return (
        <div>
            <div className={"alert alert-success " + (logged?'':'hidden')}>
                Welcome {!!this.state.user?this.state.user.name:''}
            </div>
            <form className=" form-group" >
                <div className={"form-group " + (logged?'hidden': '')}>
                    <label htmlFor="usr">Username:</label>
                    <input   type="text" className="form-control" value={this.state.username} onChange={this.handleInputChange.bind(this)} name="username"  id="usr"/>
                </div>
                <div className={"form-group " + (logged?'hidden': '')} >
                    <label htmlFor="pwd">Password:</label>
                    <input  type="password" className="form-control" value={this.state.password} onChange={this.handleInputChange.bind(this)} name="password" id="pwd"/>
                </div>
                <div className="form-group">
                    <input className={"btn btn-default " + (logged?'hidden': '')} type="button" onClick={this.submit.bind(this)} value="Log In"/>
                    <input className={"btn btn-default " + (logged?'': 'hidden')} type="button" onClick={this.logout.bind(this)} value="Log Out"/>
                </div>
                <div className={"alert alert-danger " + (hasError?'': 'hidden')}>
                    {error}
                </div>
            </form>    
        </div>);
    }
}


export default Login;