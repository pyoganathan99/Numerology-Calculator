const app = {
    data () {
        return {
            input: ''
        }
    },
    computed: {
        summary: (app) => {
            const results = [];
            let sum = 0;

            app.input.split('')
                .forEach(char => {
                    const value = getValueForChar(char);
                    results.push({ char, value });
                    sum += value;
                });

            results.push({
                char: '=',
                value: sum
            });

            while (results[results.length - 1].value > 10) {
                results.push({
                    char: '=',
                    value: sumOfDigits(results[results.length - 1].value)
                });
            }

            return results;
        }
    }
}

const valueMap = generateValueMap();

/**
 * Create a Map that has the mapping between different uppercase
 * characters, and the corresponding numerological value
 * @return {Map<string, number>}
 */
function generateValueMap () {
    const values = [
        { number: 1, chars: ['A', 'Q', 'Y', 'I', 'J', '1'] },
        { number: 2, chars: ['B', 'R', 'K', '2'] },
        { number: 3, chars: ['G', 'C', 'L', 'S', '3'] },
        { number: 4, chars: ['D', 'M', 'T', '4'] },
        { number: 5, chars: ['E', 'H', 'N', 'X', '5'] },
        { number: 6, chars: ['U', 'V', 'W', '6'] },
        { number: 7, chars: ['O', 'Z', '7'] },
        { number: 8, chars: ['F', 'P', '8'] }
    ];

    return values.reduce((map, record) => {
        record.chars.forEach(char => { map.set(char, record.number) });
        return map;
    }, new Map())
}

/**
 * Returns the numerological value for the given character
 * @param {string} char The input character
 * @return {number} The numerological value
 */
function getValueForChar (char) {
    const upperCaseChar = char.toUpperCase();
    if (valueMap.has(upperCaseChar)) {
        return valueMap.get(upperCaseChar);
    }
    return 0;
}

/**
 * Determines the sum of all the digits of the given number
 * @param {number} num The input number
 * @return {number} The sum of digits
 */
function sumOfDigits (num) {
    return String(num).split('').map(Number)
        .reduce((sum, digit) => sum + digit, 0);
}

Vue.createApp(app).mount('#app');