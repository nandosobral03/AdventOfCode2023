const fs = require('fs');
const day = 3;

const part1 = async (filename: string) => {
}

const part2 = async (filename: string) => {
}

const run = async (test: boolean) => {
    return {
        p1: await part1(test ? `./${day}/test.txt` : `./${day}/input.txt`),
        p2: await part2(test ? `./${day}/test.txt` : `./${day}/input.txt`)
    }
}

export default run;