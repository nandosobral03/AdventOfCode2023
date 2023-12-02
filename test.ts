
const main_test = async () => {
    const args = process.argv.slice(2);
    const day = args[0];
    const path = require('path');
    const fs = require('fs');
    if(day){
        let file = path.join(__dirname, `./${day}/${day}.ts`);
        // run the day.ts file 
        const {p1,p2} = await require(file).default(true);
        console.log(`Part 1: ${p1}`);
        console.log(`Part 2: ${p2}`);
    }else{
        for(let i = 1; i <= 25; i++){
            let file = path.join(__dirname, `./${i}/${i}.ts`);
            if(!fs.existsSync(file)) continue;
            console.log(`Day ${i}`)
            console.log("--------------------")
            const {p1,p2} = await require(file).default(true);
            console.log(`Part 1: ${p1}`);
            console.log(`Part 2: ${p2}`);
            console.log("--------------------")
        }
    }
}


main_test();

