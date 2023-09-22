/**
 * Решил подумать с нуля, попробовал порисовать
 * Подумал, как можно использовать мап, пришёл в мысли, что можно посчитать количество
 * каждого символа в искомой строке и потом как-то в цикле делать декремент \ инкремент
 * 
 * А вот как привильно делать sliding window - подсмотрел. Поэтому решил сделать обход, посомтреть как это работает
 * Тут без имплементации
 */

type SymbolMap = Map<string, number>;

function minWindow(s: string, t: string): string {
    if (s.length < t.length) {
        return '';
    }


    const tMap = countSymbols(t);
    const windowSize = t.length
    let left = 0;
    let right = windowSize;

    console.log('target', t);
    console.log('search', s);
    while (left + windowSize < right) {
        console.log(left, right, s.substring(left, right));
        if (doesContain(tMap, countSymbols(s, left, right))) {
            left++;
        } else {
            if (s.length - right > 0) {
                right++;
            }
        }
    }

    return '';
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