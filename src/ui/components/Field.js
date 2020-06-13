import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";
import {fromEvent} from "rxjs";
import Ship from "./Ship";
import {getShipLength, parseShip} from "../../redux/reducers/ship-reducer";

class Field extends Component {
    constructor(props) {
        super(props);
        this.field = {};
        this.state = {
            renderElement: false,
            color: "field-valid"
        };
        this.eventMouseMove = null;
        this.eventMouseUp = null;
    }

    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    isValid = (start, end) => {
        // if ship horizontal
        let startFloor = Math.floor((start-1)/10);
        let endFloor = Math.floor((end-2)/10);
        return startFloor === endFloor && startFloor !== -1 && endFloor !== -1;
        // TODO implement vertical
    };

    paintPlayground = (id) =>  {
        let startIndex;
        let endIndex;
        if (this.props.activeShip == null) {
            startIndex = id;
            endIndex = startIndex;
        } else {
            let shipIndex = Number(this.props.activeShip.slice(-1));
            startIndex = id - shipIndex;
            endIndex = startIndex + getShipLength(this.props.activeShip);
        }

        let ship;
        if (this.props.activeShip != null) {
            let shipInfo = parseShip(this.props.activeShip)
            ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
        }

        if(this.isValid(startIndex, endIndex) && this.noShipsNear(startIndex, endIndex)) {
            for (let i = startIndex; i < endIndex; i++) {
                this.props.setFieldColor(this.props.playground, {id: i, color: "field-blocked"});
                this.props.setShipFieldIndex(this.props.playground, {id: i, shipIndex: this.props.activeShip.slice(0, -1) + (i - startIndex)});
            }
            // disable ship on the side
            if (ship) {
                this.props.disableShip(this.props.playground, ship);
            }
        } else {
            // deselect ship in the side
            if (ship && !ship.disabled) {
                this.props.deselectShip(this.props.playground, ship);
            }
        }
    };

    isNotDraggedFromPlayground = (field, shipInfo) => {
        let otherShipInfo = parseShip(field.shipIndex);
        return !(shipInfo.id === otherShipInfo.id && shipInfo.name === otherShipInfo.name);
    };

    paintNextBlocked = (shipInfo) =>  {
        this.props.fields[this.props.playground].filter(field => field.color === "field-blocked" && field.shipIndex !== -1 && this.isNotDraggedFromPlayground(field, shipInfo)).forEach(field => {
            // if ship horizontal
            if(!(field.id % 10 === 1 && (field.id - 11) % 10 === 0)) this.paintOnlyIfUnused(field.id - 11);
            this.paintOnlyIfUnused(field.id - 10);
            if(!(field.id % 10 === 0 && (field.id - 9) % 10 === 1)) this.paintOnlyIfUnused(field.id - 9);
            if(!(field.id % 10 === 1 && (field.id - 1) % 10 === 0)) this.paintOnlyIfUnused(field.id - 1);
            if(!(field.id % 10 === 0 && (field.id + 1) % 10 === 1)) this.paintOnlyIfUnused(field.id + 1);
            if(!(field.id % 10 === 1 && (field.id + 9) % 10 === 0)) this.paintOnlyIfUnused(field.id + 9);
            this.paintOnlyIfUnused(field.id + 10);
            if(!(field.id % 10 === 0 && (field.id + 11) % 10 === 1)) this.paintOnlyIfUnused(field.id + 11);
            // TODO implement vertical
        });
    };

    paintOnlyIfUnused = (id) => {
        let fields = this.props.fields[this.props.playground];
        if(fields[id-1] !== undefined) {
            if(fields[id-1].color === "field-unused") {
                this.props.setFieldColor(this.props.playground, {id: id, color: "field-nextBlocked"});
            }
        }
    };

    deleteFromPlayground = (id) => {
        let shipInfo = parseShip(id);
        this.props.fields[this.props.playground].forEach(field => {
            if(isNumber(field.id) && field.shipIndex !== -1) {
                let otherShipInfo = parseShip(field.shipIndex);
                if(shipInfo.id === otherShipInfo.id && shipInfo.name === otherShipInfo.name) {
                    this.props.setFieldColor(this.props.playground, {id: field.id, color: "field-unused"});
                    this.props.setShipFieldIndex(this.props.playground, {id: field.id, shipIndex: -1});
                }
            }
        });
    };

    fireOnMouseDown = () =>  {
        if (!this.props.shipIsDraggable) {
            return;
        }
        let id = this.props.id;
        let isOnPlayground = false;
        if(isNumber(id)) {
            console.log(this.props.fields)
            id = this.props.fields[this.props.playground].filter(field => field.id === id)[0].shipIndex;
            if(id === -1) {
                return;
            }
            isOnPlayground = true;
            this.deleteFromPlayground(id);
        }

        let shipInfo = parseShip(id);
        let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]

        // do not allow using a ship twice
        if (ship.disabled && !isOnPlayground) {
            return;
        }

        this.props.setActiveShip(id);
        this.props.selectShip(this.props.playground, ship);

        this.paintNextBlocked(shipInfo);
        this.setState({
            renderElement: true,
            renderLength: ship.size,
        });
        this.eventMouseMove = fromEvent(document, "mousemove").subscribe(this.handleMouseMove);
        this.eventMouseUp = fromEvent(document, "mouseup").subscribe(this.fireOnMouseUp);
    };

    repaintNextBlocked = () =>  {
        this.props.fields[this.props.playground].filter(field => field.color === "field-nextBlocked").forEach( field => {
            this.props.setFieldColor(this.props.playground, {id: field.id, color: "field-unused"});
        })
    };

    fireOnMouseUp = (event) => {
        this.eventMouseMove.unsubscribe();
        let element = document.elementFromPoint(event.x, event.y);
        if(element === null) {
            // handle cursor outside window
            this.setState({
                renderElement: false
            });
            this.repaintNextBlocked();
            if (this.props.activeShip) {
                let shipInfo = parseShip(this.props.activeShip);
                let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0];
                this.props.deselectShip(this.props.playground, ship);
                this.props.setActiveShip(null);
            }
            return;
        }
        let id = Number(element.id);
        this.paintPlayground(id);
        this.repaintNextBlocked();
        this.setState({
            renderElement: false
        });
        this.props.setActiveShip(null);
    };

    handleMouseMove = (event) => {
        let element = document.getElementsByClassName("ship-current")[0];
        if (!element) {
            this.eventMouseMove.unsubscribe();
            return;
        }
        let bounds = element.getBoundingClientRect();
        element.style.left = `${event.clientX + this.calculateMiddle(bounds)}px`;
        element.style.top = `${event.clientY - bounds.height}px`;
        if(document.elementFromPoint(event.x, event.y) === null) {
            return;
        }
        this.renderDraggedShip(document.elementFromPoint(event.x, event.y).id);
    };

    renderDraggedShip = (id) => {
        let color;
        let shipIndex = Number(this.props.activeShip.slice(-1));
        let startIndex = id - shipIndex;
        let endIndex = startIndex + getShipLength(this.props.activeShip);
        color = this.isValid(startIndex, endIndex) && this.noShipsNear(startIndex, endIndex) ? "field-valid" : "field-invalid";
        this.setState({
            renderElement: true,
            color: color
        });
    };

    noShipsNear = (startIndex, endIndex) => {
        for (let i = startIndex; i < endIndex; i++) {
            // TODO implement vertical
            let fields = this.props.fields[this.props.playground];
            if(fields[i-1] !== undefined) if(fields[i-1].color !== "field-unused") return false;
            if(!(i % 10 === 1 && (i - 1) % 10 === 0)) if(fields[i-1-1] !== undefined) if(fields[i-1-1].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i + 1) % 10 === 1)) if(fields[i-1+1] !== undefined) if(fields[i-1+1].color === "field-blocked") return false;
            if(!(i % 10 === 1 && (i - 11) % 10 === 0)) if(fields[i-1-11] !== undefined) if(fields[i-1-11].color === "field-blocked") return false;
            if(fields[i-1-10] !== undefined) if(fields[i-1-10].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i - 9) % 10 === 1)) if(fields[i-1-9] !== undefined) if(fields[i-1-9].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i + 11) % 10 === 1)) if(fields[i-1+11] !== undefined) if(fields[i-1+10].color === "field-blocked") return false;
            if(fields[i-1+10] !== undefined) if(fields[i-1+10].color === "field-blocked") return false;
            if(!(i % 10 === 1 && (i + 9) % 10 === 0)) if(fields[i-1+9].color === "field-blocked") return false;
        }
        return true;
    };

    calculateMiddle = (bounds) => {
        return (getShipLength(this.props.activeShip) - (Number(this.props.activeShip.slice(-1)))) * 30 - bounds.width - 15;
    };

    getField = () =>  {
        if(this.props.type !== FIELD_TYPES.TEXT) {
            this.field = this.props.fields[this.props.playground].filter( field => field.id === this.props.id && field.type === this.props.type)[0];
        }
    };

    componentDidMount() {
        if(this.props.type !== FIELD_TYPES.TEXT) {
            if(this.field === undefined) {
                this.field = new FieldClass(this.props.id, this.props.type);
                this.props.addField(this.props.playground, this.field);
            }
        }
    }

    componentWillUnmount() {
        if (this.eventMouseUp != null) {
            this.eventMouseUp.unsubscribe()
        }
        if (this.eventMouseMove != null) {
            this.eventMouseMove.unsubscribe()
        }
    }

    render() {
        this.getField();
        let className = "";
        if(this.field !== undefined) {
            className = this.field.color;
        }

        let copyShip = {
            id: 100,
            name: "",
            size: this.state.renderLength,
            selected: true,
            disabled: false
        };

        return (
            this.props.type === FIELD_TYPES.TEXT ?
                <div className={this.props.className + " field-ship"}>{this.props.text}</div>
                : this.props.type === FIELD_TYPES.PLAYGROUND ?
                <div className={this.props.className + " field-ship " + className} id={this.props.id} onMouseDown={this.fireOnMouseDown}>
                    {this.state.renderElement && <Ship id="current" className={this.state.color} ship={copyShip} isCopy={true} />}
                </div>
                : // this.props.type equals FIELD_TYPES.SHIP
                <div className={this.props.className + " field-ship"} id={this.props.id} onMouseDown={this.fireOnMouseDown}>
                    {this.state.renderElement && <Ship id="current" className={this.state.color} ship={copyShip} isCopy={true} />}
                </div>
        )
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

export default connect(mapStateToProps, matchDispatchToProps)(Field);
