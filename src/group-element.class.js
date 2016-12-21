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
            selector
        } = settings;
        this.selector = selector;
        this.alias = alias;
    }

    render(data) {
        let selection = this.parent.selectAll(this.getSelector(this.selector))
            .data(data);
        if (selection.empty()) {
            selection = selection.enter()
                .append(this.getTagName())
                .attr("class", (d, i) => this.getClassName(this.selector, this.alias[i]));
        }
        return selection;
    }
}
