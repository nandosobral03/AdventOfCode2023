
const args = process.argv.slice(2);
const day = args[0];




const main = async () => {
    const path = require('path');
    const fs = require('fs');
    if(day){
        let file = path.join(__dirname, `./${day}/${day}.ts`);
        // run the day.ts file 
        require(file).default();
    }else{
        for(let i = 1; i <= 25; i++){
            let file = path.join(__dirname, `./${i}/${i}.ts`);
            if(!fs.existsSync(file)) continue;
            console.log(`Day ${i}`)
            console.log("--------------------")
            await require(file).default();
            console.log("--------------------")
        }
    }
}


main();

