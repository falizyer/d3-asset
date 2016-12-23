import {axisTop, axisLeft, axisBottom, axisRight, format, interpolateBasis} from "d3";
import {primitiveChild} from "./decorators/primitive-child.decorator";
import {GroupElement} from "./group-element.class";

export const AXIS_DIRECTION = {
    TOP: Symbol("TOP"),
    LEFT: Symbol("LEFT"),
    BOTTOM: Symbol("BOTTOM"),
    RIGHT: Symbol("RIGHT")
};

@primitiveChild({
    tagName: "text",
    selector: ["axis-label"]
})
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
            padding = 0,
            ticks = 10,
            scale,
            direction,
            tickSizeOuter = 6,
            tickSizeInner = 6,
            tickPadding = 5
        } = settings;
        this.direction = direction;
        this.scale = scale;
        this.padding = padding;
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

    render(data = "") {
        const parent = super.render([data]);
        return parent
            .call(this.axis)
            .call(selection => {
                let label = selection.selectAll(this.getChildSelector())
                    .data([data]);
                if (label.empty()) {
                    label = label.enter()
                        .append(this.getChildTagName())
                        .attr("class", this.getChildClassName());
                }
                let i = interpolateBasis(this.scale.domain());
                let x, y, angle;
                switch (this.direction) {
                    case AXIS_DIRECTION.TOP:
                        x = this.scale(i(0.5));
                        y = -this.padding;
                        angle = 0;
                        break;
                    case AXIS_DIRECTION.LEFT:
                        x = -this.padding;
                        y = this.scale(i(0.5));
                        angle = -90;
                        break;
                    default:
                        throw new Error(`transform: ${String(this.direction)}`);
                }
                label
                    .attr("text-anchor", "middle")
                    .attr("transform", `translate(${[x, y]}) rotate(${angle})`)
                    .attr("fill", "black")
                    .text(d => d);
            });
    }
}
