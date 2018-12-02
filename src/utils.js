export const linesToNumbers = input => input.split('\n').map(Number)

export const sum = arr => arr.reduce((acc, num) => acc + num, 0)

export const trim = str =>
    str.split('\n')
        .filter(l => l !== '')
        .map(l => l.replace(/^\s*/, ''))
        .join('\n')

export const hasVal = (obj, val) => Object.values(obj).some(v => v === val)
