import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from 'react-router-redux'


class Home extends Component {
    constructor(){
        super();
        this.state = {
            path:[],
            line:[]
        }
    }

    handleLogin(){
        this.props.dispatch(push('/login'))

    }


    render () {
       
        const lineStyle = {
            stroke:"#000",
            "stroke-width":3,
            fill:"red"
        }
        const {path, line} = this.state;
        return (
            <div>
                <h1>Home</h1>
               
                <input type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)} value="login"/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
   return {
       userAuth: state.userauth
    }
}
 
function mapDispatchToProps(dispatch) {
     return({
        dispatch
    })
// Return an object containing action dispatch details
}
 
export default connect( mapStateToProps, mapDispatchToProps ) (Home);