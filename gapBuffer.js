export class GapBuffer {
    /**
     * @param {number} size - Initial size of the buffer.
     */
    constructor(size) {
        this.buffer = Array(size).fill("_");
        this.gapStart = 0;
        this.gapEnd = size;
    }

    resize() {
        const newSize = this.buffer.length * 2;
        const newBuffer = Array(newSize).fill("_");
        const gapSize = this.gapEnd - this.gapStart;

        for (let i = 0; i < this.gapStart; i++) {
            newBuffer[i] = this.buffer[i];
        }

        const newGapEnd = newSize - gapSize;
        for (let i = this.gapEnd + 1; i < this.buffer.length; i++) {
            newBuffer[newGapEnd + (i - this.gapEnd - 1)] = this.buffer[i];
        }

        this.buffer = newBuffer;
        this.gapEnd = newGapEnd - 1;
    }

    /**
     * @param {string} s - The character to insert.
     */
    insert(s) {
        if (this.gapStart > this.gapEnd) {
            this.resize();
        }
        this.buffer[this.gapStart++] = s;
    }

    delete() {
        if (this.gapStart > 0) {
            this.buffer[--this.gapStart] = "_";
        }
    }

    /**
     * @param {number} newPosition - The new position for the gap.
     */
    move(newPosition) {
        if (newPosition < 0 || newPosition > this.buffer.length) {
            throw new Error("Invalid position");
        }

        if (newPosition < this.gapStart) {
            while (newPosition < this.gapStart) {
                this.buffer[--this.gapEnd] = this.buffer[--this.gapStart];
                this.buffer[this.gapStart] = "_";
            }
        } else {
            while (this.gapStart < newPosition) {
                this.buffer[this.gapStart++] = this.buffer[this.gapEnd + 1];
                this.buffer[++this.gapEnd] = "_";
            }
        }
    }

    /**
     * @returns {string} - The current buffer content as a string.
     */
    toString() {
        return this.buffer
            .slice(0, this.gapStart)
            .concat(this.buffer.slice(this.gapEnd))
            .join("");
    }
}

