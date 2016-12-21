import {line} from "d3";
import {primitiveChild} from "./decorators/primitive-child.decorator";
import {GroupElement} from "./group-element.class";

@primitiveChild({
    tagName: "path",
    selector: ["line-path"]
})
export class LineElement extends GroupElement {

    constructor(parent, settings) {
        super(parent, settings);
        const {
            xMutation = d => d[0],
            xLabel,
            yMutation = d => d[1],
            yLabel
        } = settings;
        this.x = {
            className: "x-axis",
            label: xLabel,
            mutate: xMutation
        };
        this.y = {
            className: "y-axis",
            label: yLabel,
            mutate: yMutation
        };
        this.line = line()
            .x(d => this.x.mutate(d))
            .y(d => this.x.mutate(d))
    }

    render(data) {
        const parent = super.render(data);
        let selection = parent.selectAll(this.getChildSelector())
            .data(d => window.console.log(d) || d);
        if (selection.empty()) {
            selection = selection.enter()
                .append(this.getChildTagName())
                .attr("class", this.getChildClassName());
        }
        return selection
            .attr("d", this.line);
    }
}