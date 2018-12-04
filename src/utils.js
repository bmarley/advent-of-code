export const linesToNumbers = input => input.split('\n').map(Number)

export const trim = str =>
    str.split('\n')
        .map(l => l.replace(/^\s*/, ''))
        .filter(l => l !== '')
        .join('\n')

export const hasVal = (obj, val) => Object.values(obj).some(v => v === val)
