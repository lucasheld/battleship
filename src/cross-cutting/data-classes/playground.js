import Vector2 from "./vector2";
import Field from "./field";

export default class Playground {

    fields;

    constructor() {
        this.fields = [];
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                this.fields.push(new Field(new Vector2(x, y)));
            }
        }
    }

}
