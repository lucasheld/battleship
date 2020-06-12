import React, {Component} from "react";
import Field from "./Field";
import {FIELD_TYPES} from "../../redux/actions/field-action";

export default class Ship extends Component {
    /* props
    id
    shipLength
    shipName
    disabled: marks ship as disabled
    selected: marks ship as selected
     */

    fireOnDrag = (event) =>  {
        event.preventDefault();
    };

    render() {
        // define ship background color
        let backgroundColor;
        if (this.props.disabled) {
            backgroundColor = '#a6a6a6'
        } else if (this.props.selected) {
            backgroundColor = '#9bbb59';
        } else {
            backgroundColor = '#8064a2';
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
            cells.push(<Field type={FIELD_TYPES.SHIP} key={key} id={key}/>)
        }

        return (
            <div className="columns is-centered" style={{marginBottom: '1px'}}>
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
                            <tr draggable
                                onDrag={this.fireOnDrag}
                                id={this.props.id}
                                style={{
                                    backgroundColor: backgroundColor
                                }}
                            >{cells}</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
