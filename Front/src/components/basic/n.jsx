import React from "react";
import { calendar } from "./calendar";
import { code } from "./code";

export const toLocalNumbers = (value) => {
    if (value == undefined) return "";
    else if (typeof children === "number") return code.localNumbers(code.numberWithCommas(value.toString()));
    else if (typeof children === "string") return code.localNumbers(value);
    return value;
};

export const N = ({ as = "", className = "", style = null, children, ...props }) => {
    if (children == undefined) {
        children = code.numberWithCommas((props.value ?? "").toString());
    } else {
        if (typeof children === "number") children = code.localNumbers(code.numberWithCommas(children.toString()));
        else if (typeof children === "string") children = code.localNumbers(children);
    }

    if (!as) as = "span";

    return React.createElement(as, { ...props, className, style }, children);
};

export const D = ({ as, format, children, ...props }) => {
    format = format?.toUpperCase();

    const elem = !children ? (
        ""
    ) : format == "YMD" ? (
        <N>{calendar.dateToString(children)}</N>
    ) : format == "HHMM" ? (
        <N>{calendar.toHHMM(children)}</N>
    ) : (
        <span className="d-inline-block" style={{ direction: "ltr" }}>
            <span className="d-inline-block">
                <N>{calendar.dateToString(children)}</N>&nbsp;
            </span>{" "}
            <N>{calendar.toHHMM(children)}</N>
        </span>
    );

    if (!as) return elem;
    return React.createElement(as, { ...props }, elem);
};
