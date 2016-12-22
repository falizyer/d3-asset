import {select} from "d3";
import {LineChart} from "./line-chart";

window.document.addEventListener("DOMContentLoaded", () => {
    let selection = select(window.document.querySelector("#svg"));
    let lineChart = new LineChart(selection, {
        selector: ["lines"]
    });
    lineChart.render([
        [
            [
                [1, 2],
                [3, 4],
                [30, 40],
                [300, 400]
            ]
        ],
        [
            [
                [4, 5],
                [6, 7],
                [60, 70],
                [600, 700]
            ]
        ]
    ]);
});
