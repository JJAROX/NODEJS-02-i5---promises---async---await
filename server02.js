import { totalmem, freemem } from "os"

const save = async (repeat) => {
  return new Promise((resolve, reject) => {
    try {
      let number = 0
      const interval = setInterval(() => {
        number++
        console.log(number);
        console.log(repeat);
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