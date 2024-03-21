
import { log } from 'console';
import Datastore from 'nedb';

const coll1 = new Datastore({
  filename: 'zadanie01.db',
  autoload: true
});
let miliSecondsArray = []
const save = async (repeat) => {
  return new Promise((resolve, reject) => {
    try {
      let number = 0
      const interval = setInterval(() => {
        number++
        console.log(number);
        console.log(repeat);
        coll1.insert({ s: new Date().getSeconds(), m: new Date().getMilliseconds() }, function (err, newDoc) {
          console.log("dodano dokument (obiekt):")
          console.log(newDoc)
          console.log("unikalne id dokumentu: " + newDoc._id)
          if (number == repeat) {
            clearInterval(interval)
            coll1.find({}, function (err, docs) {
              for (let i = 0; i < docs.length; i++) {
                miliSecondsArray.push(docs[i].m)
              }
              console.log(miliSecondsArray);
            });

          }
        });
      }, 1000);

    } catch (error) {
      reject(error.message)
    }
  })
}


const go = async () => {
  const all = await save(10)
  console.log(all);
}

go()