import {debounce} from "lodash";
import {scaleLinear} from "d3";

export class LineChart {

    constructor(parent, settings) {
        const {
            width,
            height
        } = settings;
        this.parent = parent;
        this.width = width;
        this.height = height;

        this.x = {
            className: "x-axis",
            label: "x-label",
            scale: scaleLinear()
                .range([0, this.width])
        };
        this.y = {
            className: "y-axis",
            label: "y-label",
            scale: scaleLinear()
                .range([0, this.height])
        };

        this.data = [];

    }

    configure(settings) {
        const {
            width = this.width,
            height = this.height
        } = settings;
        this.width = width;
        this.height = height;
        this.x.scale.range([0, this.width]);
        this.y.scale.range([0, this.height]);
    }

    render() {

    }

    update(data) {
        this.data = data;
        return this.render();
    }
}