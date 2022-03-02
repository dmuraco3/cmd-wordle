"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
let preLine = [{ character: " ", color: "white" },
    { character: " ", color: "white" },
    { character: " ", color: "white" },
    { character: " ", color: "white" },
    { character: " ", color: "white" }];
let preLines = [
    preLine,
    preLine,
    preLine,
    preLine,
    preLine,
    preLine,
];
// @ts-ignore
const App = () => {
    const { exit } = (0, ink_1.useApp)();
    (0, ink_1.useInput)((input, key) => {
        if (key.escape) {
            exit();
        }
        else if (key.return) {
            setLines([
                ...lines.slice(0, pos.y),
                curLine,
                ...lines.slice(pos.y + 1),
            ]);
            setCurLine(preLine);
            setPos({ x: 0, y: pos.y + 1 });
        }
        else if (key.delete && key.meta === false) {
            if (pos.x > 0) {
                setCurLine([
                    ...curLine.slice(0, pos.x - 1),
                    ...preLine.slice(0, 5 - pos.x + 1)
                ]);
                setPos({ ...pos, x: pos.x - 1 });
            }
        }
        else if (pos.x < 5) {
            if (/^[A-Z]$/i.test(input)) {
                setCurLine([
                    ...curLine.slice(0, pos.x),
                    { character: input, color: "white" },
                    ...curLine.slice(pos.x + 1),
                ]);
                setPos({ ...pos, x: pos.x + 1 });
            }
        }
    });
    // @ts-ignore
    const [charmap, setCharmap] = (0, react_1.useState)([
        [..."qwertyuiop"].map(val => Object({ character: val, color: "white" })),
        [..."asdfghjkl"].map(val => Object({ character: val, color: "white" })),
        [..."zxcvbnm"].map(val => Object({ character: val, color: "white" }))
    ]);
    const [pos, setPos] = (0, react_1.useState)({ x: 0, y: 0 });
    const [lines, setLines] = (0, react_1.useState)(preLines);
    const [curLine, setCurLine] = (0, react_1.useState)([{ character: " ", color: "white" },
        { character: " ", color: "white" },
        { character: " ", color: "white" },
        { character: " ", color: "white" },
        { character: " ", color: "white" }]);
    return (react_1.default.createElement(ink_1.Box, { width: "100%" },
        react_1.default.createElement(ink_1.Box, { flexDirection: 'column', height: 3 * 6 }, lines.map((line, y) => (react_1.default.createElement(ink_1.Box, { flexDirection: 'row', height: 3, key: y, width: 5 * 5 }, y === pos.y ?
            curLine.map((box, x) => (react_1.default.createElement(ink_1.Box, { key: x, flexDirection: "column" },
                react_1.default.createElement(ink_1.Text, { color: box.color }, "\u256D\u2500\u2500\u2500\u256E"),
                react_1.default.createElement(ink_1.Text, null,
                    "\u2502 ",
                    pos.x == x && pos.y == y ? "_" : box.character,
                    " \u2502"),
                react_1.default.createElement(ink_1.Text, null, "\u2570\u2500\u2500\u2500\u256F"))))
            :
                line.map((box, x) => (react_1.default.createElement(ink_1.Box, { key: x, flexDirection: "column" },
                    react_1.default.createElement(ink_1.Text, { color: box.color }, "\u256D\u2500\u2500\u2500\u256E"),
                    react_1.default.createElement(ink_1.Text, null,
                        "\u2502 ",
                        pos.x == x && pos.y == y ? "_" : box.character,
                        " \u2502"),
                    react_1.default.createElement(ink_1.Text, null, "\u2570\u2500\u2500\u2500\u256F")))))))),
        react_1.default.createElement(ink_1.Box, { flexDirection: 'column', height: 3 * 6, marginLeft: 2 }, charmap.map((line, y) => (react_1.default.createElement(ink_1.Box, { flexDirection: 'row', height: 3, key: y, width: 5 * 10, justifyContent: "center" }, line.map((box, x) => (react_1.default.createElement(ink_1.Box, { key: x, flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, { color: box.color }, "\u256D\u2500\u2500\u2500\u256E"),
            react_1.default.createElement(ink_1.Text, null,
                "\u2502 ",
                box.character,
                " \u2502"),
            react_1.default.createElement(ink_1.Text, null, "\u2570\u2500\u2500\u2500\u256F")))))))),
        react_1.default.createElement(ink_1.Box, { height: 6 * 3, flexDirection: "column" },
            charmap.map((line, y) => (react_1.default.createElement(ink_1.Box, { key: y, flexDirection: "row", height: 3, width: 5 * 10 }, line.map((box, x) => {
                react_1.default.createElement(ink_1.Box, { key: x, flexDirection: "column" },
                    react_1.default.createElement(ink_1.Text, null, "\u256D\u2500\u2500\u2500\u256E"),
                    react_1.default.createElement(ink_1.Text, null,
                        "\u2502 ",
                        box.character,
                        " \u2502"),
                    react_1.default.createElement(ink_1.Text, null, "\u2570\u2500\u2500\u2500\u256F"));
            })))),
            [0, 1, 2].map((y) => (react_1.default.createElement(ink_1.Box, { key: y, flexDirection: "row", height: 3, width: 5 * 10 }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((box, x) => {
                react_1.default.createElement(ink_1.Box, { key: x, flexDirection: "column" },
                    react_1.default.createElement(ink_1.Text, null, "\u256D\u2500\u2500\u2500\u256E"),
                    react_1.default.createElement(ink_1.Text, null,
                        "\u2502 ",
                        box,
                        " \u2502"),
                    react_1.default.createElement(ink_1.Text, null, "\u2570\u2500\u2500\u2500\u256F"));
            })))))));
};
/*

╭───╮╭───╮╭───╮╭───╮╭───╮
│ _ ││   ││   ││   ││   │
╰───╯╰───╯╰───╯╰───╯╰───╯
*/
module.exports = App;
exports.default = App;
