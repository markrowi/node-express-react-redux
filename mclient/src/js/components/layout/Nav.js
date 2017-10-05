import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

class Nav extends Component {

    isActive(path){
        const { pathname } = this.props.router.location;
        return pathname===path?"active":""
    }

    render() {
        
        return (
             <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">NuWorks</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className={this.isActive("/")}><Link to="/">Home</Link></li>
                        <li className={this.isActive("/login")}><Link to="/login">About</Link></li>
                        <li className={this.isActive("/svg")}><Link to="/svg">SVG</Link></li>
                        <li className={this.isActive("/contact")}><Link to="/contact">Contact</Link></li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


function mapStateToProps(state, ownProps) {
   return {
       router: state.router
    }
}
 
function mapDispatchToProps(dispatch) {
     return({
        dispatch
    })
}
 
export default connect( mapStateToProps, mapDispatchToProps ) (Nav);