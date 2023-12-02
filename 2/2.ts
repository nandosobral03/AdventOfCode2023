const fs = require('fs');

type Game = {
    id: number,
    throws: {value: number, color: Color}[][]
}

type Color = 'red' | 'blue' | 'green';


const getGames = (filename: string) => {
    const games = fs.readFileSync(filename, 'utf8').split('\n').map((line: string) => {
        let gameId = parseInt(line.split(":")[0].split(" ")[1]);
        let throws = line.split(":")[1].split(";").map((t: string) => { return t.trim().split(",").map(s => {
         let clean = s.trim();
         return {
             value: parseInt(clean.split(" ")[0]),
             color: clean.split(" ")[1] as Color
         }})
        });
         return {
             id: gameId,
             throws: throws
         }
     }) as Game[];
        return games;
}


const part1 = async (filename: string) => {
    const rules = new Map<Color, number>([['red', 12], ['green', 13], ['blue', 14]]);
    const games = getGames(filename);
    let sum = 0;
    for(let game of games) {
        let isValid = true;
        for(let t of game.throws){
            for(let val of t){
                if(val.value > rules.get(val.color)!){
                    isValid = false;
                    break;
                }
            }
            if(!isValid) break;
        }
        if(isValid) sum+=game.id
    }
    return sum;
}

const part2 = async (filename: string) => {
    const games = getGames(filename);
    let sum = 0;
    for(let game of games) {
        let min = [0, 0, 0]; //R, G, B
        for(let t of game.throws){
            for(let val of t){
                if(val.color === 'red') min[0] = Math.max(min[0], val.value);
                if(val.color === 'green') min[1] = Math.max(min[1], val.value);
                if(val.color === 'blue') min[2] = Math.max(min[2], val.value);
            }
        }
        sum += min.reduce((a, b) => a * b, 1);
    }
    return sum;
}

const run = async (test: boolean) => {
    return {
        p1: await part1(test ? './2/test.txt' : './2/input.txt'),
        p2: await part2(test ? './2/test.txt' : './2/input.txt')
    
    }
}


export default run;