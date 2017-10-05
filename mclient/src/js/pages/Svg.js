import React, { Component } from "react";

export default class SVGPage extends Component {
      constructor(){
        super();
        this.state = {
            path:[],
            line:[]
        }
    }

    handleMouseDown({nativeEvent}){
        console.log("Drag: ",nativeEvent.offsetY, nativeEvent.offsetX)
    }



    handleSVGclick({nativeEvent}){
        let {line} = this.state;
        console.log(nativeEvent.offsetY, nativeEvent.offsetX)
        this.setState({line:[...line, `${line.length?'L':'M'} ${nativeEvent.offsetX},${nativeEvent.offsetY}`]})
    }

    render () {
        const svg = {
            border:"1px solid black",
            height:"500px",
            width:"100%"
        }
        const lineStyle = {
            stroke:"#000",
            "stroke-width":3,
            fill:"red"
        }
        const {path, line} = this.state;
        return (
            <div>
                <h1>SVG?</h1>
                <svg style={svg} onClick={this.handleSVGclick.bind(this)}>
                    <path style={lineStyle} d={" " + line + " Z"} fill="red"/>
                    <rect className="draggable" x="30" y="30" width="80" height="80" onMouseDown={this.handleMouseDown.bind(this)} fill="blue" />

                </svg>
            </div>
        )
    }
}