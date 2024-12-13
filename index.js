
let text = "";
let currIndex = [0, 0, 0];

const VALID_INPUT = [
    "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H",
    "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "o", "O", "p", "P",
    "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X",
    "y", "Y", "z", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "
];

const lineNumbers = document.createElement("div");
lineNumbers.classList.add("line-numbers");
const firstLine = document.createElement("div");
firstLine.innerHTML = "1";
lineNumbers.appendChild(firstLine);
document.body.appendChild(lineNumbers);

const textArea = document.createElement("textarea");
textArea.addEventListener("keydown", handleInput);
textArea.addEventListener("input", handleTextAreaDebug);
//textArea.addEventListener("click", trackCursor);
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

/**
 *@param {number} index 
 * */
function findWord(index) {
    let acc = 0;
    for (let i = 0; i < textDiv.children.length; i++) {
        const curr = textDiv.children[i];

        for (let j = 0; j < curr.children.length; j++) {
            if (curr.children[j].innerHTML.length + acc < index) {
                acc += curr.children[j].innerHTML.length;
                continue;
            }

            currIndex[0] = i;
            currIndex[1] = j;
            currIndex[2] = index - acc;
        }
    }
}

function trackCursor(event) {
    const cursorPosition = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;

    console.log(`Cursor Position: ${cursorPosition}, Selection End: ${selectionEnd}`);

    if (cursorPosition === textArea.value.length) {
        console.log("Cursor is at the end of the text.");
    }
}

function handleTextAreaDebug(e) {
    textAreaDebug.value = e.target.value;
}

/**
 * @param {string | undefined} word=false
 */

function newLine(word = undefined) {
    const col = document.createElement("div");
    col.classList.add("text-div-col");

    currIndex[0]++;
    currIndex[1] = 0;
    currIndex[2] = 0;

    if (word !== undefined) {
        const wordDiv = document.createElement("span");
        wordDiv.innerHTML = word;
        currIndex[2] = word.length;
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
    const selectionEnd = textArea.selectionEnd;
    if (e.key === "Enter") {
        newLine();
        return
    }

    const curr = textDiv.children[currIndex[0]];

    if (e.key === "Backspace") {
        console.log("bakcsapc");
        if (curr === undefined) {
            console.log("undefiond");
            return
        }
        if (curr.children.length === 0) {
            console.log("col lenth 0");
            if (lineNumbers.children.length > 0) {
                lineNumbers.removeChild(lineNumbers.children[lineNumbers.children.length - 1]);
            }
            const newIndex = currIndex[0] - 1;
            currIndex[1] = textDiv.children[newIndex].children.length - 1;
            currIndex[2] = textDiv.children[newIndex].children[currIndex[1]].innerHTML.length - 1;
            textDiv.removeChild(curr);
            currIndex[0] = newIndex;
            return
        }

        if (curr.children[currIndex[1]].innerHTML.length === 1) {
            console.log("word lentth 1");
            const newIndex = currIndex[1] - 1;
            currIndex[2] = curr.children[newIndex].innerHTML.length - 1;
            curr.removeChild(curr.children[currIndex[1]]);
            currIndex[1] = newIndex;
            return
        }

        const child = curr.children[currIndex[1]];
        console.log(`child ${child.innerHTML}`);
        child.innerHTML = child.innerHTML.slice(0, currIndex[2]) + child.innerHTML.slice(currIndex[2]-- + 1);
        return
    }

    if (!VALID_INPUT.includes(e.key)) {
        return;
    }

    if (curr === undefined) {
        newLine(e.key);
        return
    }

    if (e.key === " ") {
        const word = document.createElement("span");
        currIndex[1]++;
        currIndex[2] = 0;
        curr.appendChild(word);
        console.log(curr);
        return;
    }

    if (curr.children.length === 0) {
        const word = document.createElement("span");
        word.innerHTML = e.key;
        curr.appendChild(word);
        return
    }

    curr.children[currIndex[1]].innerHTML += e.key;
    currIndex[2]++;
    if (curr.getBoundingClientRect().width >= 500 - 8) {
        newLine();
    }
}
