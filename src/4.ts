/**
 * Всё работает, но жрёт много памятии и времени
 * 
 * Готов развивать мысль дальше 😊
 */

type SymbolMap = Map<string, number>;
type Result = [number, number]
type Results = Result[];

function minWindow(s: string, t: string): string {
    if (s.length < t.length) {
        return '';
    }

    const tMap = countSymbols(t);
    const windowSize = t.length;
    let left = 0;
    let right = windowSize;

    for (let i = left; i < right; i++) {
        updateSymbolCounter(tMap, s[i], '-');
    }

    const results: [number, number][] = [];
    while (right - left >= windowSize) {
        if (checkAllLettersFound(tMap)) {
            results.push([left, right]);
            updateSymbolCounter(tMap, s[left], '+');
            left++;
        } else {
            if (s.length - right > 0) {
                updateSymbolCounter(tMap, s[right], '-');
                right++;
            } else {
                updateSymbolCounter(tMap, s[left], '+');
                left++;
            }
        }
    }

    const bestResult = pickBestResult(results);
    if (bestResult == null) {
        return '';
    } else {
        return s.substring(bestResult[0], bestResult[1]);
    }
}

function updateSymbolCounter(counter: SymbolMap, letter: string, action: '+' | '-'): void {
	let number =  counter.get(letter);
    if (number == null) {
        return;
    }

    if (action === '+') {
        number++;
    } else {
        number--;
    }
    counter.set(letter, number);
}

function checkAllLettersFound(symbols: SymbolMap): boolean {
    for (let symbol of symbols) {
        if (symbol[1] > 0) {
            return false;
        }
    }

    return true;
}

function pickBestResult(results: Results): Result | null {
    let bestResultLength = 0;
    let bestResult: Result | null = null;
    for (const result of results) {
        const length = result[1] - result[0];
        if (bestResult == null || length < bestResultLength) {
            bestResultLength = length;
            bestResult = result;
        }
    }

    return bestResult;
}

function countSymbols(s: string, startIndex: number = 0, endIndex: number = s.length): SymbolMap {
    let result = new Map<string, number>();
  
    for (let i = startIndex; i < endIndex; i++) {
        let letter = s[i];
		let letterAmount = result.get(letter);
        if (letterAmount == null) {
            result.set(letter, 1);
        } else {
            result.set(letter, letterAmount + 1);
        }
    }
  
    return result;
}