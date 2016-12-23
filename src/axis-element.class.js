import {axisTop, axisLeft, axisBottom, axisRight, format} from "d3";
import {GroupElement} from "./group-element.class";

export const AXIS_DIRECTION = {
    TOP: Symbol("TOP"),
    LEFT: Symbol("LEFT"),
    BOTTOM: Symbol("BOTTOM"),
    RIGHT: Symbol("RIGHT")
};

export class AxisElement extends GroupElement {

    static getAxisByDirection(direction, scale) {
        switch (direction) {
            case AXIS_DIRECTION.TOP:
                return axisTop(scale);
            case AXIS_DIRECTION.LEFT:
                return axisLeft(scale);
            case AXIS_DIRECTION.BOTTOM:
                return axisBottom(scale);
            case AXIS_DIRECTION.RIGHT:
                return axisRight(scale);
            default:
                throw new Error(`getAxisByDirection: ${String(direction)}`);
        }
    }

    constructor(parent, settings) {
        super(parent, settings);
        const {
            ticks = 10,
            scale,
            direction,
            tickSizeOuter = 6,
            tickSizeInner = 6,
            tickPadding = 5
        } = settings;
        this.direction = direction;
        this.scale = scale;
        this.tickSizeOuter = tickSizeOuter;
        this.tickSizeInner = tickSizeInner;
        this.tickPadding = tickPadding;
        this.ticks = ticks;
        this.axis = AxisElement.getAxisByDirection(this.direction, this.scale)
            .tickSizeOuter(this.ticks)
            .tickSizeInner(this.ticks)
            .tickPadding(this.tickPadding)
            .tickFormat(value => format(value % 1 === 0 ? "" : ".2f")(value))
            .ticks(this.ticks);
    }

    render(data) {
        const parent = super.render(data);
        return parent.call(this.axis);
    }
}
