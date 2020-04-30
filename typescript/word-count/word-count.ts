import { OutgoingMessage } from "http";


class Words {
    public count(input: any): Map<string, number> {
        let out = new Map();
        for (let w of input.replace(/^\s+/, "").replace(/\s+$/, "").split(/[\s]+/)) { //this is ugly as shit
            w = w.toLowerCase();
            let len = out.get(w) || 0
            out.set(w, ++len)
        }
        return out;
    }
}

export default Words
