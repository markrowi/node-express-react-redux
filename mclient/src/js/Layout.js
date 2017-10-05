import React, { Component } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer"



export default class Layout extends Component {
    render() {

        const containerStyle = {
            marginTop: "60px"
        };
        return (
            <div>
                <Nav/>
                <div className="container" style={containerStyle}>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}