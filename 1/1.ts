const fs = require('fs');
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


const part1 = async (filename: string) => {
    const lines = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n');
    let sum = 0;
    for(let line of lines){
        let only_digits = line.replace(/[^0-9]/g, '');
        sum += parseInt(`${only_digits[0]}${only_digits[only_digits.length - 1]}`);
    }
    return sum;
}

const part2 = async (filename: string) => {
    const lines = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n');
    let sum = 0;
    for(let line of lines){
        for(let number of numbers){
            line = line.replaceAll(number, `${number[0]}${numbers.indexOf(number) + 1}${number[number.length - 1]}`);
        }
        let only_digits = line.replace(/[^0-9]/g, '');
        sum+= parseInt(`${only_digits[0]}${only_digits[only_digits.length - 1]}`);
    }
    return sum;
}

const run = async (test: boolean) => {
    return {
        p1: await part1(test ? './1/test1.txt' : './1/input.txt'),
        p2: await part2(test ? './1/test2.txt' : './1/input.txt')
    }
}


export default run;