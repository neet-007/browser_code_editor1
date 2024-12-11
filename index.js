
let text = "";

const lineNumbers = document.createElement("div");
lineNumbers.classList.add("line-numbers");
const firstLine = document.createElement("div");
firstLine.innerHTML = "1";
lineNumbers.appendChild(firstLine);
document.body.appendChild(lineNumbers);

const textArea = document.createElement("textarea");
textArea.addEventListener("keydown", newLine);
const textDiv = document.createElement("div");
textArea.classList.add("text-area");
textArea.spellcheck = false;
textArea.autocomplete = "off";

textDiv.classList.add("text-div");
const firstCol = document.createElement("div");
firstCol.classList.add("text-div-col");
textDiv.appendChild(firstCol);
document.body.append(textArea);
document.body.append(textDiv);

/**
 * @param {KeyboardEvent} e - The input event from the textarea.
 */
function newLine(e) {
    if (e.key === "Enter") {
        const col = document.createElement("div");
        col.classList.add("text-div-col");
        textDiv.appendChild(col);
        const lineNumber = document.createElement("div");
        lineNumber.innerHTML = `${lineNumbers.children.length + 1}`;
        lineNumbers.appendChild(lineNumber);
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

    if (last === undefined) {
        const col = document.createElement("div");
        col.classList.add("text-div-col");
        const word = document.createElement("span");
        word.innerHTML = e.key;
        col.appendChild(word);
        textDiv.appendChild(col);
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
    if (last.getBoundingClientRect().width >= 500) {
        console.log("here");
        const col = document.createElement("div");
        col.classList.add("text-div-col");
        textDiv.appendChild(col);
    }
}
