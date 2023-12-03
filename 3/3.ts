const fs = require('fs');
const day = 3;

const isNumber = (char: string) => { 
    return !isNaN(parseInt(char));
}


const isSymbol = (char: string) => {
    return ['%', '#', '*', '/', '@', '$', '&', '=', '+', '-'].includes(char);
}

const hasAdjacentSymbol = (matrix: string[][], i: number, j: number) => {
    let indexes = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    for(let index of indexes){
        if(matrix[index[0]] === undefined) continue;
        if(matrix[index[0]][index[1]] === undefined) continue;
        if(isSymbol(matrix[index[0]][index[1]])){
            return true;
        }
    }
    return false;
}


const part1 = async (filename: string) => {
    let matrix = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n').map((line: string) => line.split(''));
    let sum = 0;
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(isNumber(matrix[i][j])){
                let isPart = false;
                let fullNumber = '';
                while(isNumber(matrix[i][j])){
                    fullNumber += matrix[i][j];
                    isPart = isPart || hasAdjacentSymbol(matrix, i, j);
                    j++;
                }
                sum += isPart ? parseInt(fullNumber) : 0;
            }
        }
    }
    return sum;
}

const getPartNumbersStartingIndexes = (matrix: string[][], i: number, j: number) : number[] => {
    let partNumbersStartingIndexes = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(isNumber(matrix[i][j])){
                let isPart = false;
                let fullNumber = '';
                while(isNumber(matrix[i][j])){
                    fullNumber += matrix[i][j];
                    isPart = isPart || hasAdjacentSymbol(matrix, i, j);
                    j++;
                }
                if(isPart){
                    partNumbersStartingIndexes.push(i * matrix[i].length + j - fullNumber.length);
                }
            }
        }
    }
    return partNumbersStartingIndexes;
}


const getAdjacentNumbers = (matrix: string[][], i: number, j: number, validIndexes: number[]) => {
    let indexes = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    let numbers : {start : number, number: number}[] = [];
    for(let index of indexes){
        if(matrix[index[0]] === undefined) continue;
        if(matrix[index[0]][index[1]] === undefined) continue;
        if(isNumber(matrix[index[0]][index[1]])){
           const number = getFullNumber(matrix, index[0], index[1]);
            if(!numbers.some((n) => n.start === number.start) && validIndexes.includes(number.start)){
                numbers.push(number);
            }
        }
    }
    return numbers.map((n) => n.number);
}

const getFullNumber = (matrix: string[][], i: number, j: number) => {
    let fullNumber = '';
    let delta = 0;
    while(isNumber(matrix[i][j + delta])){
        fullNumber += matrix[i][j + delta];
        delta++;
    }
    delta = 1;
    while(isNumber(matrix[i][j - delta])){
        fullNumber = matrix[i][j - delta] + fullNumber;
        delta++;
    }
    return {
        start: (i * matrix[i].length + j - delta + 1),
        number: parseInt(fullNumber)
    }
}

const part2 = async (filename: string) => {
    let matrix = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n').map((line: string) => line.split(''));
    let sum = 0;
    const partNumbersStartingIndexes = getPartNumbersStartingIndexes(matrix, 0, 0);
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] === '*'){
                let numbers = getAdjacentNumbers(matrix, i, j, partNumbersStartingIndexes);
                if(numbers.length == 2){
                    sum += numbers[0] * numbers[1];
                }
            }
        }
    }
    return sum;
}

const run = async (test: boolean) => {
    return {
        p1: await part1(test ? `./${day}/test.txt` : `./${day}/input.txt`),
        p2: await part2(test ? `./${day}/test.txt` : `./${day}/input.txt`)
    }
}

export default run;