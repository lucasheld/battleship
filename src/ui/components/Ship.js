import React, {Component} from "react";
import "./Ship.css";
import {Redirect} from "react-router-dom";
import "./Ship.css";
import "./Field.css"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/ship-mapper";

class Ship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            displayPopup: false
        }
    }
    /* props
    id: ship id
    ship: the ship object from the reducer
    isCopy: if this ship is a floating copy
     */

    render() {
        // define ship background color
        let backgroundColor;
        if (this.props.ship.disabled) {
            backgroundColor = '#a6a6a6'
        } else if (this.props.ship.selected) {
            backgroundColor = '#9bbb59';
        } else {
            backgroundColor = '#8064a2';
        }

        // define ship label color
        let labelColor;
        if (this.props.ship.selected) {
            labelColor = '#9bbb59';
        } else {
            labelColor = 'black';
        }

        let cells = [];
        for (let i = 0; i < this.props.ship.size; i++) {
            let key = this.props.id + "-" + i;
            cells.push(<div className={this.props.className + " field-ship "} key={key}/>)
        }

        if (this.state.reload) {
            return <Redirect to="/strategy-mode/0" />;
        }

        let className;
        if (this.props.isCopy) {
            className = "ship-current";
        }

        let orientation = this.props.orient[this.props.playground].filter(ship => ship.id === this.props.ship.id && ship.name === this.props.ship.name)[0]
        if (orientation) {
            orientation = orientation.orientation;
        }

        return (
            <div className={"columns is-centered " + className} style={{marginBottom: '1px'}}>
                <div className="column has-text-right">
                    {
                        !this.props.isCopy &&
                        <div className="field">
                            <div className="control" style={{whiteSpace: "nowrap"}}>
                                <label className="label"
                                       style={{
                                           textDecoration: this.props.ship.disabled ? 'line-through' : '',
                                           color: labelColor
                                       }}
                                >{this.props.ship.name}</label>
                            </div>
                        </div>
                    }
                </div>
                <div className="column has-text-left">
                    <div id={this.props.id}
                        style={{backgroundColor: backgroundColor, display: orientation === "horizontal" || !this.props.isCopy ? "flex" : ""}}
                    >{cells}</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Ship);
