import React, { Component } from "react";

export default class SVGPage extends Component {
      constructor(){
        super();
        this.state = {
            path:[],
            objects:[],
            line:[],
            selected:{
                objects:[],
                circles:[],
                selectedHandle:0,
                isObjDrag:false
            }
        }
         this.handleDrag = this.handleDrag.bind(this);
    }

    handleMouseDown({nativeEvent}){
        console.log("Drag: ",nativeEvent.offsetY, nativeEvent.offsetX)
    }



    handleSVGDclick({nativeEvent}){
        let {line} = this.state;
        let {selected} = this.state;
        let objF = this.state.objects.map((o,i)=>{
            if(selected.objects[0].id === o.id){
                return {
                    ...o,
                    corners:[...o.corners, {id:++o.corners.length,coor:`${nativeEvent.offsetX},${nativeEvent.offsetY}`}]
                }
            }
            return o;
        })
        console.log(nativeEvent.offsetY, nativeEvent.offsetX)
        this.setState({objects:objF})
    }

    addNewObject(){
        var {objects} = this.state;
        this.setState({objects:[...objects, {id:++objects.length, corners:[{id:0,coor:"479,104"},{id:1,coor:"576,103"}, {id:2,coor:"574,164"}, {id:3,coor:"489,164"}]}]})
        console.log(this.state);
    }

    handleObjclick(obj){
        const sel = this.selected;
        
        this.setState({selected:{...sel, objects:[obj], circles:obj.corners.map((c,i) => { 
                    return c;
                }
            )}
        });
    }

    handleDrag(e){

        const sel = this.state.selected;
        const {circles} = this.state.selected;

        let c = circles.map((c,i)=>{
            if(!sel.isObjDrag){
                if (c.id === sel.selectedHandle) {
                    c.coor = `${e.offsetX},${e.offsetY}`
                }
                return c
            }else{
                let currentCoor = c.coor.split(',');
                let x=0,y=0;
                x = (e.offsetX + (e.offsetX - parseInt(currentCoor[0])));
                y = (e.offsetY + (e.offsetY - parseInt(currentCoor[1])));
                
                c.coor = x + "," + y;
                console.log(currentCoor, x, y,"Present",e.offsetX,e.offsetY, "past", parseInt(currentCoor[0]), parseInt(currentCoor[1]))
                return c
            }
            
            
        })
        console.log(c)
        let objF = this.state.objects.map((o,i)=>{
            if(sel.objects[0].id === o.id){
                return {
                    ...o,
                    corners:c
                }
            }
            return o;
        })

        
        this.setState({selected:{...sel, objects:objF, 
                circles:c
            }
        })
 
    }

    attachDrag(obj){
        
        const {selected} = this.state;
        window.addEventListener("mousemove", this.handleDrag)
        this.setState({selected:{...selected, selectedHandle:obj.id, isObjDrag:obj.corners!==undefined}})
        
    }
    detachDrag(obj){
        console.log('detachDrag')
        window.removeEventListener("mousemove",this.handleDrag)
    }

    render () {
        const svg = {
            border:"1px solid black",
            height:"500px",
            width:"100%"
        }
        const lineStyle = {
            stroke:"#101010",
            "strokeWidth":3,
            fill:"red"
        }
        const circleStyle = {
            cursor:'move',
            "strokeWidth":3,
            stroke:"green"
        }
        

        const {path, selected, objects} = this.state;
        const circles = selected.circles.map((l,i)=>{
            const [x, y] = l.coor.split(',')
            return (<circle data-id={i} key={i} style={circleStyle} onMouseDown={this.attachDrag.bind(this,l)} onMouseUp={this.detachDrag.bind(this,l)} cx={x} cy={y} r="5"  fill="rgba(0, 255, 0, 0.3)" />)
         })

         const obj = objects.map((l,i)=>{
            return <path key={l.id} style={lineStyle} onDoubleClick={this.handleSVGDclick.bind(this)} onMouseDown={this.attachDrag.bind(this,l)} onClick={this.handleObjclick.bind(this, l)} id={l.id} d={" " + l.corners.map((l,i) => (i?'L'+l.coor:'M'+l.coor)).join(" ") + " Z"} fill="red"/>
         })
        return (
            <div>
                <h1>SVG?</h1>
                <svg style={svg}>
                    {obj}
                    {/* <path style={lineStyle} d={" " + line.map((l,i) => (i?'L'+l:'M'+l)).join(" ") + " Z"} fill="red"/> */}
                    {circles}
                </svg>
                <input type="button" className="btn btn-primary" value="Add Item" onClick={this.addNewObject.bind(this)}/>
            </div>
        )
    }
}