import {scaleLinear} from "d3";
import {LineElement} from "./line-element.class";
import {AxisElement, AXIS_DIRECTION} from "./axis-element.class";

export class LineChart {

    constructor(parent, settings) {
        const {
            width = 800,
            height = 400,
            alias,
            selector,
            padding = {}
        } = settings;
        const {
            top = 30,
            left = 50,
            bottom = 30,
            right = 50
        } = padding;
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.padding = {
            top,
            left,
            bottom,
            right
        };
        this.xScale = scaleLinear()
            .range([0, this.width - this.padding.left - this.padding.right]);
        this.yScale = scaleLinear()
            .range([0, this.height - this.padding.top - this.padding.bottom]);
        this.translate = [this.padding.left, this.padding.top];

        this.parent
            .attr("width", this.width)
            .attr("height", this.height);

        this.xAxis = new AxisElement(this.parent, {
            direction: AXIS_DIRECTION.TOP,
            selector: ["x-axis"],
            label: "x-axis",
            scale: this.xScale,
            translate: this.translate
        });

        this.yAxis = new AxisElement(this.parent, {
            direction: AXIS_DIRECTION.LEFT,
            selector: ["y-axis"],
            label: "y-axis",
            scale: this.yScale,
            translate: this.translate
        });

        this.line = new LineElement(this.parent, {
            selector,
            alias,
            translate: this.translate,
            xMutation: d => this.xScale(d[0]),
            yMutation: d => this.yScale(d[1])
        });
    }

    render(data) {
        this.xScale.domain([0, 1000]);
        this.yScale.domain([0, 1000]);

        this.xAxis.render([[]]);
        this.yAxis.render([[]]);
        this.line.render(data);
    }
}