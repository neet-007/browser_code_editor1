
let text = "";

const VALID_INPUT = [
    "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H",
    "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "o", "O", "p", "P",
    "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X",
    "y", "Y", "z", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const lineNumbers = document.createElement("div");
lineNumbers.classList.add("line-numbers");
const firstLine = document.createElement("div");
firstLine.innerHTML = "1";
lineNumbers.appendChild(firstLine);
document.body.appendChild(lineNumbers);

const textArea = document.createElement("textarea");
textArea.addEventListener("keydown", handleInput);
textArea.addEventListener("input", handleTextAreaDebuh);
textArea.classList.add("text-area");
textArea.spellcheck = false;
textArea.autocomplete = "off";

const textAreaDebug = document.createElement("textarea");
textAreaDebug.classList.add("text-area-debug");
textAreaDebug.spellcheck = false;
textAreaDebug.autocomplete = "off";

const textDiv = document.createElement("div");
textDiv.classList.add("text-div");
const firstCol = document.createElement("div");
firstCol.classList.add("text-div-col");
textDiv.appendChild(firstCol);

document.body.append(textArea);
document.body.append(textAreaDebug);
document.body.append(textDiv);

function handleTextAreaDebuh(e) {
    textAreaDebug.value = e.target.value;
}

/**
 * @param {string | undefined} word=false
 */

function newLine(word = undefined) {
    const col = document.createElement("div");
    col.classList.add("text-div-col");
    if (word !== undefined) {
        const wordDiv = document.createElement("span");
        wordDiv.innerHTML = word;
        col.appendChild(wordDiv);
    }

    textDiv.appendChild(col);
    const lineNumber = document.createElement("div");
    lineNumber.innerHTML = `${lineNumbers.children.length + 1}`;
    lineNumbers.appendChild(lineNumber);
}

/**
 * @param {KeyboardEvent} e - The input event from the textarea.
 */
function handleInput(e) {
    if (e.key === "Enter") {
        newLine();
        return
    }

    const last = textDiv.children[textDiv.children.length - 1];

    if (e.key === "Backspace") {
        if (last === undefined) {
            return
        }
        if (last.children.length === 0) {
            if (lineNumbers.children.length > 0) {
                lineNumbers.removeChild(lineNumbers.children[lineNumbers.children.length - 1]);
            }
            textDiv.removeChild(last);
            return
        }

        if (last.children[last.children.length - 1].innerHTML.length === 1) {
            last.removeChild(last.children[last.children.length - 1]);
            return
        }

        last.children[last.children.length - 1].innerHTML = last.children[last.children.length - 1].innerHTML.slice(0, last.children[last.children.length - 1].innerHTML.length - 1);
        return
    }

    if (!VALID_INPUT.includes(e.key)) {
        return;
    }

    if (last === undefined) {
        newLine(e.key);
        return
    }

    if (e.key === " ") {
        const word = document.createElement("span");
        last.appendChild(word);
    }

    if (last.children.length === 0) {
        const word = document.createElement("span");
        word.innerHTML = e.key;
        last.appendChild(word);
        return
    }

    last.children[last.children.length - 1].innerHTML += e.key;
    if (last.getBoundingClientRect().width >= 500 - 8) {
        newLine();
    }
}
