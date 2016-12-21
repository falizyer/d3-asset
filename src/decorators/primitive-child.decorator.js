export function primitiveChild(settings) {
    const {
        tagName,
        selector = []
    } = settings;

    return target => {
        target.prototype.getChildTagName = () => tagName;
        target.prototype.getChildSelector = () => [tagName, ...selector].join(".");
        target.prototype.getChildClassName = () => selector.join(" ");
    };
}
