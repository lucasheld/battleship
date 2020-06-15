import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";
import {fromEvent} from "rxjs";
import Ship from "./Ship";
import {getShipLength, parseShip} from "../../redux/reducers/ship-reducer";
import {PLAYGROUND_TYPE} from "../../redux/reducers/field-reducer";

/**
 * Component for a field.
 */
class Field extends Component {
    constructor(props) {
        super(props);
        // Actual field
        this.field = {};
        this.fieldRef = null;
        this.state = {
            renderElement: false,
            color: "field-valid"
        };
        // Events for dragging
        this.eventMouseMove = null;
        this.eventTouchMove = null;
        this.eventMouseUp = null;
        this.eventTouchEnd = null;
    }

    /**
     * Checks if a ship is outside the playground
     * Could be outside on top/bottom (vertical check)
     * Could be outside on left/right (horizontal check)
     * @param start: Left side of the ship
     * @param index: Anchor point (dragged field)
     * @param end: Right side of the ship
     * @returns {boolean}
     */
    isValid = (start, index, end) => {
        // Gets the orientation
        let shipInfo = parseShip(this.props.activeShip);
        let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
        let orientation = this.props.orient[this.props.playground].filter(orient => orient.id === ship.id && orient.name === ship.name)[0].orientation
        // Actual check
        if (orientation === "horizontal") {
            // Look if it's not in one row
            let startFloor = Math.floor((start - 1) / 10);
            let endFloor = Math.floor((end - 2) / 10);
            return startFloor === endFloor && startFloor !== -1 && endFloor !== -1;
        } else {
            // Rotate the ship on the anchor point
            let s = parseInt(index) - (parseInt(index) - parseInt(start)) * 10;
            let e = parseInt(index) + (parseInt(end) - parseInt(index) - 1) * 10;
            // Look if it is outside top or bottom
            return s > 0 && e < 101;
        }
    };

    /**
     * Calculates all necessary params for painting the ship when dropped
     * Disables/deselects ship on the side list
     * @param id: Id of dragged field
     */
    paintPlayground = (id) => {
        // Get left and right side of the ship
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

        // Get ship from reducer states to paint it on the side
        let ship;
        if (this.props.activeShip != null) {
            let shipInfo = parseShip(this.props.activeShip);
            ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0];
        }

        // Check if the ship should be painted when it is dropped
        let valid = true;
        if (this.props.activeShip != null) {
            valid = this.isValid(startIndex, id, endIndex) && this.noShipsNear(startIndex, id, endIndex);
        }

        if (valid) {
            // Paints the ship
            this.paintShip(startIndex, id, endIndex);
            // Disable ship on the side
            if (ship) {
                this.props.disableShip(this.props.playground, ship);
            }
        } else {
            // Deselect ship in the side
            if (ship && !ship.disabled) {
                this.props.deselectShip(this.props.playground, ship);
            }
        }
    };

    /**
     * Paints ship on playground
     * Has different ways for painting horizontal/vertical
     * @param startIndex: Left side of the ship
     * @param index: Anchor point (dragged field)
     * @param endIndex: Right side of the ship
     */
    paintShip = (startIndex, index, endIndex) => {
        // Gets orientation
        let orientation;
        if (this.props.activeShip != null) {
            let shipInfo = parseShip(this.props.activeShip);
            let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
            orientation = this.props.orient[this.props.playground].filter(orient => orient.id === ship.id && orient.name === ship.name)[0].orientation
        }

        if (orientation === "horizontal") {
            // Paints ship from left to right and sets every shipIndex to every painted field
            for (let i = startIndex; i < endIndex; i++) {
                this.props.setFieldColor(this.props.playground, i, "field-blocked");
                this.props.setShipFieldIndex(
                    this.props.playground,
                    i,
                    this.props.activeShip.slice(0, -1) + (i - startIndex)
                );
            }
        } else {
            // Rotates the ship on the anchor point
            let start = parseInt(index) - (parseInt(index) - parseInt(startIndex)) * 10;
            let end = parseInt(index) + (parseInt(endIndex) - parseInt(index) - 1) * 10;
            // Paints ship from top to bottom and sets every shipIndex to every painted field
            for (let i = start, j = startIndex; i < end + 1; i += 10, j++) {
                this.props.setFieldColor(this.props.playground, i, "field-blocked");
                this.props.setShipFieldIndex(this.props.playground,
                    i,
                    this.props.activeShip.slice(0, -1) + (j - startIndex)
                );
            }
        }
    };

    isNotDraggedFromPlayground = (field, shipInfo) => {
        let otherShipInfo = parseShip(field.shipIndex);
        return !(shipInfo.id === otherShipInfo.id && shipInfo.name === otherShipInfo.name);
    };

    /**
     * Paints the fields that are next to a ship on the playground (the fields that are blocked)
     * @param shipInfo: Ship info of a ship that is this instance of field-component on playground
     */
    paintNextBlocked = (shipInfo) => {
        this.props.fields[this.props.playground].filter(field => field.color === "field-blocked" && field.shipIndex !== -1 && this.isNotDraggedFromPlayground(field, shipInfo)).forEach(field => {
            // Top field left from field
            if (!(field.id % 10 === 1 && (field.id - 11) % 10 === 0)) this.paintOnlyIfUnused(field.id - 11);
            // Top field from field
            this.paintOnlyIfUnused(field.id - 10);
            // Top field right from field
            if (!(field.id % 10 === 0 && (field.id - 9) % 10 === 1)) this.paintOnlyIfUnused(field.id - 9);
            // Left field from field
            if (!(field.id % 10 === 1 && (field.id - 1) % 10 === 0)) this.paintOnlyIfUnused(field.id - 1);
            // Right field from field
            if (!(field.id % 10 === 0 && (field.id + 1) % 10 === 1)) this.paintOnlyIfUnused(field.id + 1);
            // Bottom field left from field
            if (!(field.id % 10 === 1 && (field.id + 9) % 10 === 0)) this.paintOnlyIfUnused(field.id + 9);
            // Bottom field from field
            this.paintOnlyIfUnused(field.id + 10);
            // Bottom right field from field
            if (!(field.id % 10 === 0 && (field.id + 11) % 10 === 1)) this.paintOnlyIfUnused(field.id + 11);
        });
    };

    /**
     * Paints a field that is unused and in the array (not over top or under bottom of playground)
     * @param id: The field to be painted
     */
    paintOnlyIfUnused = (id) => {
        let fields = this.props.fields[this.props.playground];
        if (fields[id - 1]) {
            if (fields[id - 1].color === "field-unused") {
                this.props.setFieldColor(this.props.playground, id, "field-nextBlocked");
            }
        }
    };

    /**
     * When a ship from the playground is dragged repaint it to unused and delete it from playground
     * @param id: The id of the ship to be painted
     */
    deleteFromPlayground = (id) => {
        let shipInfo = parseShip(id);
        this.props.fields[this.props.playground].forEach(field => {
            if (isNumber(field.id) && field.shipIndex !== -1) {
                let otherShipInfo = parseShip(field.shipIndex);
                if (shipInfo.id === otherShipInfo.id && shipInfo.name === otherShipInfo.name) {
                    this.props.setFieldColor(this.props.playground, field.id, "field-unused");
                    this.props.setShipFieldIndex(this.props.playground, field.id, -1);
                }
            }
        });
    };

    /**
     * Is fired when a field is clicked and player is in the strategy mode
     */
    handleDragStartEvent = (event) => {
        // If in fight mode return
        if (!this.props.shipIsDraggable) {
            return;
        }
        let id = this.props.id;
        let isOnPlayground = false;
        // If a field on the playground is clicked get the actual ship id and not the fields id
        // (is a number and not from a string like this: shipId-Index)
        if (isNumber(id)) {
            id = this.props.fields[this.props.playground].filter(field => field.id === id)[0].shipIndex;
            if (id === -1) {
                return;
            }
            isOnPlayground = true;
            // When there is an ship from playground dragged -> repaint
            this.deleteFromPlayground(id);
        }

        let shipInfo = parseShip(id);
        let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]

        // Sets orientation based on the orientation prop that is given by the <Field ...> from ShipDirectionDialog.js
        if (this.props.orientation) {
            this.props.setOrient(this.props.playground, this.props.orientation, shipInfo.name, shipInfo.id);
        }

        // do not allow using a ship twice
        if (ship.disabled && !isOnPlayground) {
            return;
        }
        // Set dragged as active
        this.props.setActiveShip(id);
        // Set dragged as selected
        this.props.selectShip(this.props.playground, ship);

        // Paint the fields next to all remaining fields with ships on playground as nextBlocked (this bright red color)
        this.paintNextBlocked(shipInfo);
        // Render the copy ship
        this.setState({
            renderElement: true
        });
        // Subscribe to the mousemove and mouseup event of the document
        this.eventMouseMove = fromEvent(document, "mousemove").subscribe(this.handleMoveEvent);
        this.eventTouchMove = fromEvent(document, "touchmove").subscribe(this.handleMoveEvent);
        this.eventMouseUp = fromEvent(document, "mouseup").subscribe(this.handleDragStopEvent);
        this.eventTouchEnd = fromEvent(document, "touchend").subscribe(this.handleDragStopEvent);
        // Prevents scrolling when a field is dragged therefore mobile devices working too!
        event.preventDefault();
    };

    /**
     * Repaints bright red fields (nextBlocked) to unused
     */
    repaintNextBlocked = () => {
        this.props.fields[this.props.playground].filter(field => field.color === "field-nextBlocked").forEach(field => {
            this.props.setFieldColor(this.props.playground, field.id, "field-unused");
        })
    };

    /**
     * Is fired when the user is dragging and then drops the ship
     * Invokes the paint of the ship on the playground
     * @param event
     */
    handleDragStopEvent = (event) => {
        // No need to subscribe to mouseMove event when not dragging
        this.eventMouseMove.unsubscribe();
        this.eventTouchMove.unsubscribe();
        // Get the playground field to which was dragged

        let pageX;
        let pageY;
        if (event.changedTouches) {
            let changes = event.changedTouches;
            if (changes.length !== 1) return;
            event = changes[0];
            pageX = event.pageX;
            pageY = event.pageY;
        } else {
            pageX = event.x;
            pageY = event.y;
        }

        let element = document.elementFromPoint(pageX, pageY);
        // Was this not on the playground?
        if (element === null) {
            // Handle cursor outside window and don't render copy anymore
            this.setState({
                renderElement: false
            });
            // Repaint bright red fields
            this.repaintNextBlocked();
            // If you had an active ship unset some states/attributes
            if (this.props.activeShip) {
                let shipInfo = parseShip(this.props.activeShip);
                let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0];
                this.props.deselectShip(this.props.playground, ship);
                this.props.setActiveShip(null);
            }
            // Don't paint -> return
            return;
        }
        let id = Number(element.id);
        // Paints ship
        this.paintPlayground(id);
        // Repaint bright red fields
        this.repaintNextBlocked();
        // Don't render copy anymore
        this.setState({
            renderElement: false
        });
        // Close popup
        this.props.openPopup(false);
        // No active ship anymore
        this.props.setActiveShip(null);
    };

    /**
     * Is fired as often as the player is dragging and moving an ship
     * Does checks if ship could be set to playground and invokes rendering it
     * @param event: Used to get mouse position
     */
    handleMoveEvent = (event) => {
        // Gets the copy ship
        let element = document.getElementsByClassName("ship-current")[0];
        // If there's no return and unsubscribe
        if (!element) {
            this.eventMouseMove.unsubscribe();
            this.eventTouchMove.unsubscribe();
            return;
        }
        // Gets the ships position on screen
        let bounds = element.getBoundingClientRect();
        // Gets the orientation
        let shipInfo = parseShip(this.props.activeShip);
        let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0];
        let orientation = this.props.orient[this.props.playground].filter(orient => orient.id === ship.id && orient.name === ship.name)[0].orientation;

        // if the event is a touch event, use the event from the fist finger and adjust the page x and y coordinate
        let pageX;
        let pageY;
        if (event.changedTouches) {
            let changes = event.changedTouches;
            if (changes.length !== 1) return;
            event = changes[0];
            pageX = event.pageX;
            pageY = event.pageY;
        } else {
            pageX = event.x;
            pageY = event.y;
        }

        if (orientation === "horizontal") {
            // Sets horizontal ship to anchor point
            element.style.left = `${event.clientX + this.calculateMiddle(bounds, bounds.width)}px`;
            element.style.top = `${event.clientY - bounds.height}px`;
        } else {
            // Sets vertical ship to anchor point
            element.style.left = `${event.clientX - bounds.width + 15}px`;
            element.style.top = `${event.clientY + this.calculateMiddle(bounds, bounds.height + 15)}px`;
        }
        if (document.elementFromPoint(pageX, pageY) === null) {
            return;
        }
        // Invokes rendering color when dragging
        this.renderDraggedShip(document.elementFromPoint(pageX, pageY).id);
    };

    /**
     * Renders ship green or red -> checks if there's a valid position to place it
     * @param id: Field id where ship is moved over
     */
    renderDraggedShip = (id) => {
        let color;
        // Left side of the ship
        let shipIndex = Number(this.props.activeShip.slice(-1));
        // Anchor point of the ship
        let startIndex = id - shipIndex;
        // Right side of the ship
        let endIndex = startIndex + getShipLength(this.props.activeShip);
        // Gets color by checking if the ship is outside the playground or if it is near or over a ship
        color = this.isValid(startIndex, id, endIndex) && this.noShipsNear(startIndex, id, endIndex) ? "field-valid" : "field-invalid";
        // Sets the color to green or red
        this.setState({
            renderElement: true,
            color: color
        });
    };

    /**
     * Checks if the ship is on top of a ship or near to one
     * @param startIndex: Left side of the ship
     * @param index: Anchor point (dragged field)
     * @param endIndex: Right side of the ship
     * @returns {boolean}
     */
    noShipsNear = (startIndex, index, endIndex) => {
        // Gets orientation
        let shipInfo = parseShip(this.props.activeShip);
        let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
        let orientation = this.props.orient[this.props.playground].filter(orient => orient.id === ship.id && orient.name === ship.name)[0].orientation

        if (orientation === "horizontal") {
            // Checks for other ships from left to right field
            for (let i = startIndex; i < endIndex; i++) {
                if (!this.checkNoShipsNear(i)) {
                    return false;
                }
            }
        } else {
            // Rotates the ship on the anchor point
            let start = parseInt(index) - (parseInt(index) - parseInt(startIndex)) * 10;
            let end = parseInt(index) + (parseInt(endIndex) - parseInt(index) - 1) * 10;
            // Checks for other ships from top to bottom field
            for (let i = start; i < end + 1; i += 10) {
                if (!this.checkNoShipsNear(i)) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Checks if one field of the ship is on top of a ship or near to one
     * @param i: Id of the field of the ship on the playground (when it would be placed)
     * @returns {boolean}
     */
    checkNoShipsNear = (i) => {
        let fields = this.props.fields[this.props.playground];
        // Actual pos of the field
        if (fields[i - 1]) if (fields[i - 1].color !== "field-unused") return false;
        // Left field left from field
        if (!(i % 10 === 1 && (i - 1) % 10 === 0)) if (fields[i - 1 - 1]) if (fields[i - 1 - 1].color === "field-blocked") return false;
        // Right field left from field
        if (!(i % 10 === 0 && (i + 1) % 10 === 1)) if (fields[i - 1 + 1]) if (fields[i - 1 + 1].color === "field-blocked") return false;
        // Top left field left from field
        if (!(i % 10 === 1 && (i - 11) % 10 === 0)) if (fields[i - 1 - 11]) if (fields[i - 1 - 11].color === "field-blocked") return false;
        // Top field left from field
        if (fields[i - 1 - 10]) if (fields[i - 1 - 10].color === "field-blocked") return false;
        // Top right field left from field
        if (!(i % 10 === 0 && (i - 9) % 10 === 1)) if (fields[i - 1 - 9]) if (fields[i - 1 - 9].color === "field-blocked") return false;
        // Bottom right field left from field
        if (!(i % 10 === 0 && (i + 11) % 10 === 1)) if (fields[i - 1 + 11]) if (fields[i - 1 + 10].color === "field-blocked") return false;
        // Bottom field left from field
        if (fields[i - 1 + 10]) if (fields[i - 1 + 10].color === "field-blocked") return false;
        // Bottom left field left from field
        if (fields[i - 1 + 9]) if (!(i % 10 === 1 && (i + 9) % 10 === 0)) if (fields[i - 1 + 9].color === "field-blocked") return false;
        return true;
    };

    /**
     * Calculates middle of anchor point
     * @param bounds: Bounds of the ship
     * @param orientation: Horizontal or vertical?
     * @returns {number}
     */
    calculateMiddle = (bounds, orientation) => {
        return (getShipLength(this.props.activeShip) - (Number(this.props.activeShip.slice(-1)))) * 30 - orientation - 15;
    };

    /**
     * Returns the field from the state.
     * @returns {*}
     */
    getField = () => {
        this.field = this.props.fields[this.props.playground].filter(field => field.id === this.props.id && field.type === this.props.type)[0];
    };

    /**
     * Adds field to store
     */
    componentDidMount() {
        // The listener are added here to set them passive false
        this.fieldRef.addEventListener("mousedown", this.handleDragStartEvent, { passive: false });
        this.fieldRef.addEventListener("touchstart", this.handleDragStartEvent, { passive: false });
        if (!this.field) {
            this.field = new FieldClass(this.props.id, this.props.type);
            this.props.addField(this.props.playground, this.field);
        }
    }

    /**
     * Unsubscribe events if they aren't
     */
    componentWillUnmount() {
        // Remove the listeners from componentDidMount
        this.fieldRef.removeEventListener("mousedown", this.handleDragStartEvent);
        this.fieldRef.removeEventListener("touchstart", this.handleDragStartEvent);
        if (this.eventMouseUp != null) {
            this.eventMouseUp.unsubscribe();
        }
        if (this.eventTouchEnd != null) {
            this.eventTouchEnd.unsubscribe();
        }
        if (this.eventMouseMove != null) {
            this.eventMouseMove.unsubscribe();
        }
        if (this.eventTouchMove != null) {
            this.eventTouchMove.unsubscribe();
        }
    }

    /**
     * Fires when player is in fight mode and a playground field is clicked
     * Repaints field blue if there's no ship, red if there's one
     */
    fireOnClick = () => {
        // Don't accept this event when you are on false playground or mode or if the field isn't unused
        if (
            this.props.shipIsDraggable ||
            this.props.playground === PLAYGROUND_TYPE.PLAYER1FULL ||
            this.props.playground === PLAYGROUND_TYPE.PLAYER2FULL ||
            this.field.color !== "field-unused" ||
            this.props.noFire
        ) {
            return;
        }
        // Gets the actual playground (not the copy) to check for a hit
        let playground = this.props.playground === PLAYGROUND_TYPE.PLAYER1PART ? PLAYGROUND_TYPE.PLAYER1FULL : PLAYGROUND_TYPE.PLAYER2FULL;
        // Gets the field
        let field = this.props.fields[playground].filter(field => field.id === this.props.id)[0];
        switch (field.color) {
            // When there is no ship
            case "field-unused":
                // Paint field on both playground (actual and copy) blue
                // and forbids firing this turn anymore (but end turn button is activated!)
                this.props.setFieldColor(playground, field.id, "field-missed");
                this.props.setFieldColor(this.props.playground, this.props.id, "field-missed");
                this.props.setNoFire(true);
                break;
            // When there is a ship
            case "field-valid":
                // Paint field on both playground (actual and copy) red
                this.props.setFieldColor(playground, field.id, "field-invalid");
                this.props.setFieldColor(this.props.playground, this.props.id, "field-invalid");
                break;
            default:
                console.log("Error!")
        }
    };

    render() {
        // Gets the actual field
        this.getField();
        // Adds CSS
        let className = "";
        if (this.field) {
            className = this.field.color;
        }

        // Creates a copy ship
        let copyShip = {};
        if (this.props.activeShip) {
            let shipInfo = parseShip(this.props.activeShip);
            let ship = this.props.ships[this.props.playground].filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
            copyShip = {
                id: ship.id,
                name: ship.name,
                size: ship.size,
                selected: true,
                disabled: false
            };
        }

        // Renders a field with (type playground)or without (type overlay) an onClick listener
        // Renders an copy ship inside if state is true
        return (
            this.props.type === FIELD_TYPES.PLAYGROUND ?
                <div className={this.props.className + " field-ship " + className} id={this.props.id}
                     ref={ref => this.fieldRef = ref} onClick={this.fireOnClick}>
                    {this.state.renderElement &&
                    <Ship playground={this.props.playground} className={this.state.color} ship={copyShip}
                          isCopy={true}/>}
                </div>
                : // this.props.type === FIELD_TYPES.OVERLAY ?
                <div className={this.props.className + " field-ship"} id={this.props.id}
                     ref={ref => this.fieldRef = ref} >
                    {this.state.renderElement &&
                    <Ship playground={this.props.playground} className={this.state.color} ship={copyShip}
                          isCopy={true}/>}
                </div>
        )
    }
}

/**
 * Checks if param is from type number
 * @param n: Number to check
 * @returns {boolean}
 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export default connect(mapStateToProps, matchDispatchToProps)(Field);
