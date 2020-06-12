import React, {Component} from "react";
import Field from "./Field";
import ShipDirectionDialog from "./ShipDirectionDialog";
import "./Ship.css";

export default class Ship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPopup: false
        }
    }

    /* props
    id
    shipLength
    shipName
    disabled: marks ship as disabled
    selected: marks ship as selected
     */

    displayPopup = (status) => {
        this.setState({
            displayPopup: status
        })
    };

    render() {
        // define ship background color
        let shipClass = "";
        if (this.props.disabled) {
            shipClass = 'ship-disabled'
        } else if (this.props.selected) {
            shipClass = 'ship-selected';
        } else {
            shipClass = 'ship-normal';
        }

        // define ship label color
        let labelColor;
        if (this.props.selected) {
            labelColor = '#9bbb59';
        } else {
            labelColor = 'black';
        }

        let cells = [];
        for (let i = 0; i < this.props.shipLength; i++) {
            let key = this.props.id + "-" + i;
            cells.push(<Field key={key} id={key}/>)
        }

        return (
            <React.Fragment>
                <div className={"modal" + (this.state.displayPopup === true ? " is-active" : "")}>
                    <div className="modal-background" onClick={() => this.displayPopup(false)}/>
                    <div className="modal-content">
                        <ShipDirectionDialog shipName={this.props.shipName} shipLength={this.props.shipLength} />
                    </div>
                </div>

                <div className="columns is-centered" style={{marginBottom: '1px'}} onClick={() => this.displayPopup(true)}>
                    <div className="column has-text-right">
                        <div className="field">
                            <div className="control" style={{whiteSpace: "nowrap"}}>
                                <label className="label"
                                       style={{
                                           textDecoration: this.props.disabled ? 'line-through' : '',
                                           color: labelColor
                                       }}
                                >{this.props.shipName}</label>
                            </div>
                        </div>
                    </div>
                    <div className="column has-text-left">
                        <table>
                            <tbody>
                            <tr id={this.props.id} className={shipClass}>{cells}</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
