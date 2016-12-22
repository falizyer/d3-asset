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
            yMutation = d => d[1]
        } = settings;
        this.x = {
            mutate: xMutation
        };
        this.y = {
            mutate: yMutation
        };
        this.line = line()
            .x(d => this.x.mutate(d))
            .y(d => this.y.mutate(d))
    }

    render(data) {
        const parent = super.render(data);
        let selection = parent.selectAll(this.getChildSelector())
            .data(d => d);
        if (selection.empty()) {
            selection = selection.enter()
                .append(this.getChildTagName())
                .attr("class", this.getChildClassName());
        }
        return selection
            .attr("d", this.line);
    }
}