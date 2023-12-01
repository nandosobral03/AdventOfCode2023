const fs = require('fs');
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const part1 = async () => {
    const lines = fs.readFileSync('./1/input.txt', { encoding: 'utf-8' }).split('\n');
    let sum = 0;
    for(let line of lines){
        let only_digits = line.replace(/[^0-9]/g, '');
        sum += parseInt(`${only_digits[0]}${only_digits[only_digits.length - 1]}`);
    }
    console.log("Part 1: ", sum);
}

const part2 = async () => {
    const lines = fs.readFileSync('./1/input.txt', { encoding: 'utf-8' }).split('\n');
    let sum = 0;
    for(let line of lines){
        for(let number of numbers){
            line = line.replaceAll(number, `${number[0]}${numbers.indexOf(number) + 1}${number[number.length - 1]}`);
        }
        let only_digits = line.replace(/[^0-9]/g, '');
        sum+= parseInt(`${only_digits[0]}${only_digits[only_digits.length - 1]}`);
    }

    console.log("Part 2: ", sum);
}

const run = async () => {
    await part1();
    await part2();
}


export default run;