// Returns Array<Number>
export const linesToNumbers = input => input.split('\n').map(Number)

// Returns Array<Number> of every number found in the line
export const extractNumbers = str =>
    (str.match(/-?[0-9.,]+/g) || []).map(n => n.replace(/,/g, '')).map(Number)

// Returns true if given Object has some key with a value matching val
export const hasVal = (obj, val) => Object.values(obj).some(v => v === val)

// For testing input trimming
export const trim = str =>
    str
        .split('\n')
        .map(l => l.replace(/^\s*/, ''))
        .filter(l => l !== '')
        .join('\n')
