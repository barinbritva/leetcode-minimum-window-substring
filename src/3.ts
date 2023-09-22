/**
 * Готово, но последние тесты не проходят, так как логика сравнения подстрок ещё старая
 */

type SymbolMap = Map<string, number>;
type Result = [number, number]
type Results = Result[];

function minWindow(s: string, t: string): string {
    if (s.length < t.length) {
        return '';
    }


    const tMap = countSymbols(t);
    const windowSize = t.length
    let left = 0;
    let right = windowSize;

    const results: [number, number][] = [];
    while (right - left >= windowSize) {
        if (doesContain(tMap, countSymbols(s, left, right))) {
            results.push([left, right]);
            left++;
        } else {
            if (s.length - right > 0) {
                right++;
            } else {
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

function doesContain(target: SymbolMap, searchable: SymbolMap): boolean {
    for (const [letter, amount] of target.entries()) {
        const lettersInSearchable = searchable.get(letter);
        if (lettersInSearchable === undefined || lettersInSearchable < amount) {
            return false;
        } 
    }

	return true;
}

function countSymbols(s: string, startIndex: number = 0, endIndex: number = s.length): SymbolMap {
    let result = new Map<string, number>();
  
    for (let i = startIndex; i < endIndex; i++) {
        let letter = s[i];
        if (result.has(letter)) {
            result.set(letter, result.get(letter) + 1);
        } else {
            result.set(letter, 1);
        }
    }
  
    return result;
}