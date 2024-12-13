export class RopeString {
    /**
     *@param {string} value 
     *@param {RopeString} [left=null]  
     *@param {RopeString} [right=null] 
     *@param {number} [length=null] 
     * */
    constructor(value, left = null, right = null, length = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        if (length === null) {
            this.len = value.length;
        } else {
            this.len = length;
        }
    }

    /**
     *@param {RopeString} b 
     *@returns {RopeString}
     * */
    concat(b) {
        return new RopeString("", this, b, this.len + b.len);
    }

    /**
     *@param {number} i 
     *@returns {string}
     * */
    getChar(i) {
        if (this.left === null && this.right === null) {
            if (i >= this.len) {
                return "";
            }
            return this.value[i]
        }

        if (i < this.left.len) {
            return this.left.getChar(i);
        }

        return this.right.getChar(i - this.left.len);
    }

    /**
     *@param {number} i 
     *@param {string} s 
     *@returns {boolean}
     * */
    insert(i, s) {
        if (this.left === null && this.right === null) {
            if (i >= this.len) {
                return false;
            }

            const l = this.value.slice(0, i);
            const r = this.value.slice(i);

            this.value = l + s + r;
            this.len = this.value.length;
            return true;
        }

        if (i < this.left.len) {
            return this.left.insert(i, s);
        }

        if (i - this.left.len >= this.right.len) {
            return false;
        }

        return this.right.insert(i - this.left.len, s);
    }

    /**
     *@param {number} i 
     *@param {number} len 
     *@returns {boolean}
     * */
    deleteSubString(i, len) {
        if (len <= 0) {
            return false;
        }

        if (this.left === null && this.right === null) {
        }


        return true;
    }

    /**
     *@returns {string}
     * */
    toString() {
        if (this.left === null && this.right === null) {
            return this.value;
        }

        return this.left.toString() + this.right.toString();
    }
}

const a = new RopeString("hello");
const b = new RopeString("world");

const c = a.concat(b);
const res = c.insert(5, " ");
console.log(res);
console.log(c.toString());
