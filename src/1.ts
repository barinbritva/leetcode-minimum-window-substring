/**
 * Добил решение, которое делали на собеседовании
 * Сложность большая, поэтому получил Time Limit Exceeded на последних 3 тест кейсах
 */

function minWindow(s: string, t: string): string {
    if (t.length > s.length) {
        return '';
    }

    let start = 0;
    let chunk = t.length;

    let result = '';
    do {
        result = iterate(s, t, start, chunk);
        chunk++;
    } while (result === '' && chunk <= s.length);

    return result;
};

function iterate(s: string, t: string, start: number, chunk: number): string {
    for (let i = start; i < s.length; i++) {
        const currentSubstring = s.substring(i, chunk + i);
        if (doesContain(currentSubstring, t)) {
            return currentSubstring;
        }
    }

    return '';
}

function doesContain(s: string, t: string): boolean {
    if (s.length < t.length) {
        return false;
    }

    const resultS = count(s);
    const resultT = count(t);
  
    for (const [letter, amount] of resultT.entries()) {
        const amountInS = resultS.get(letter);
        if (amountInS === undefined || amountInS < amount) {
            return false;
        } 
    }

	return true;
}

function count(s: string) {
    let result = new Map();
  
    for (let i = 0; i < s.length; i++) {
        let letter = s[i];
        if (result.has(letter)) {
            result.set(letter, result.get(letter) + 1);
        } else {
            result.set(letter, 1);
        }
    }
  
    return result;
}