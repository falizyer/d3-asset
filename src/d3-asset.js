import {select} from "d3";
import {LineChart} from "./line-chart";

window.document.addEventListener("DOMContentLoaded", () => {
    let selection = select(window.document.body);
    let lineChart = new LineChart(selection, {});
    lineChart.render([
        [
            [
                [1, 2],
                [3, 4]
            ]
        ],
        [
            [
                [4, 5],
                [6, 7]
            ]
        ]
    ]);
});
