export function primitive(settings) {
    const {
        tagName,
        defaultSelector = []
    } = settings;

    return target => {
        target.prototype.getTagName = () => tagName;
        target.prototype.getSelector = (selector = []) => [tagName, ...defaultSelector, ...selector].join(".");
        target.prototype.getClassName = (selector = [], alias = "") => `${[...defaultSelector, ...selector].join(" ")} ${alias}`;
    };
}
