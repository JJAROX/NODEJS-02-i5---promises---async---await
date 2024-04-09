import { totalmem, freemem } from "os"
import { readFile, writeFile, appendFile, readdir } from 'fs';
import path from 'path';
const __dirname = path.resolve()
console.log(freemem());
console.log(totalmem());
let logArray = []
const save = async (repeat) => {
  return new Promise((resolve, reject) => {
    try {
      let number = 0
      const interval = setInterval(() => {
        number++
        console.log(number);
        console.log(repeat);
        const date = new Date()
        let logfile = { totalmem: totalmem(), freemem: freemem() }
        const filepath = path.join(__dirname, "logs", `log_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}.log`)
        const filepath2 = path.join(__dirname, "logs")
        appendFile(filepath, JSON.stringify(logfile), (err) => {
          if (err) throw err
          console.log("plik utworzony");
        })
        if (number === repeat) {
          clearInterval(interval)
          readdir(filepath2, (err, files) => {
            if (err) throw err
            files.forEach((file) => {
              readFile(`${filepath2}/${file}`, "utf-8", (err, data) => {
                if (err) throw err
                logArray.push(JSON.parse(data))
                console.log(logArray)
              })
            })

          })
        }
      }, 1000);


    } catch (error) {
      reject(error.message)
    }
  })
}


const go = async () => {
  const savedFiles = await save(5)
  console.log(all);
}

go()