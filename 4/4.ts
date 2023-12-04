const fs = require('fs');
const day = 4;

const getCards = (filename: string) => {
    let lines = fs.readFileSync(filename, { encoding: 'utf-8' })
                .split('\n')
                .map((line:string) => 
                        line.split(":")[1]
                            .trim()
                            .split("|").map((x:string) => x.trim()));
    lines = lines.map((line:string[]) => line.map((x:string) => x.split(" ").filter((y:string) => y !== "").map(x => parseInt(x))));
    return lines;
}

const part1 = async (filename: string) => {
    let lines = getCards(filename);
    let sum = 0;
    for(let card of lines){
        let total = 0;
        let winningSet = new Set(card[0]);
        for(let num of card[1]){
            if(winningSet.has(num)) total++
        }
        if(total > 0){
            sum+= 2**(total-1)
        }
    }
    return sum;
}

const part2 = async (filename: string) => {
    let lines = getCards(filename);
    let copies = lines.map((x: any) => 1);
    for(let x = 0; x < lines.length; x++){
        let card = lines[x];
        let total = 0;
        let winningSet = new Set(card[0]);
        for(let num of card[1]){
            if(winningSet.has(num)) total++
        }
        for(let i = 1; i <= total; i++){
            copies[x+i] += copies[x];
        }
    }
    return copies.reduce((a: number, b: number) => a+b, 0);
}

const run = async (test: boolean) => {
    return {
        p1: await part1(test ? `./${day}/test.txt` : `./${day}/input.txt`),
        p2: await part2(test ? `./${day}/test2.txt` : `./${day}/input.txt`)
    }
}

export default run;