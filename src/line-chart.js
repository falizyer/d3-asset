import {LineElement} from "./line-element.class";

export class LineChart {

    constructor(parent, settings) {
        this.line = new LineElement(parent, {
            selector: ["lines"],
            alias: ["line-1", "line-2"]
        });
        const {
            width, height
        } = settings;
        this.width = width;
        this.height = height;
    }

    configure() {
    }

    render(data) {
        this.line.render(data);
    }
}