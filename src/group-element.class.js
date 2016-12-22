import {primitive} from "./decorators/primitive.decorator";

@primitive({
    tagName: "g",
    defaultSelector: ["group-container"]
})
export class GroupElement {

    constructor(parent, settings) {
        this.parent = parent;
        const {
            alias = [],
            selector,
            translate = [0, 0]
        } = settings;
        this.selector = selector;
        this.alias = alias;
        this.translate = translate;
    }

    render(data) {
        window.console.log(this.getSelector(this.selector));
        let selection = this.parent.selectAll(this.getSelector(this.selector))
            .data(data);
        if (selection.empty()) {
            selection = selection.enter()
                .append(this.getTagName())
                .attr("class", (d, i) => this.getClassName(this.selector, this.alias[i]));
        }
        return selection
            .attr("transform", `translate(${this.translate})`);
    }
}
