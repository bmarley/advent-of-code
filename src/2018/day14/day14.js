export const solvePart1 = input => {
    const idx = Number(input)

    const recipes = [3, 7]
    let [a, b] = [0, 1]

    while (recipes.length < idx + 10) {
        const sum = recipes[a] + recipes[b]
        const newRecipes = sum >= 10 ? [1, sum % 10] : [sum]

        recipes.push(...newRecipes)

        a = (a + 1 + recipes[a]) % recipes.length
        b = (b + 1 + recipes[b]) % recipes.length
    }

    return recipes.slice(idx, idx + 10).join('')
}

export const solvePart2 = input => {
    input = input.split('').map(Number)
    const recipes = [3, 7, 1, 0]
    let [a, b] = [0, 1]

    let idx = 3
    // eslint-disable-next-line
    while (true) {
        const sum = recipes[a] + recipes[b]
        const newRecipes = sum >= 10 ? [1, sum % 10] : [sum]

        recipes.push(...newRecipes)
        idx += newRecipes.length

        a = (a + 1 + recipes[a]) % recipes.length
        b = (b + 1 + recipes[b]) % recipes.length

        for (let k = newRecipes.length; k > 0; k--) {
            let match = true

            for (let i = 0; i < input.length; i++) {
                if (recipes[recipes.length - k - 1 - i] !== input[input.length - 1 - i]) {
                    match = false
                    break
                }
            }

            if (match) {
                return idx - k - input.length + 1
            }
        }
    }
}
