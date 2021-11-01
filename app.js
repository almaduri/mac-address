const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.znyyn.mongodb.net/${dbName}`);

const macList = [
  "0c:a8:a7:31:a2:94",
  "10:89:fb:1d:5f:b8",
  "14:5e:69:7f:47:e3",
  "18:02:ae:71:8a:bf",
  "18:02:ae:78:53:65",
  "18:02:ae:a0:ce:47",
  "20:3b:69:8c:34:cd",
  "20:3b:69:96:50:bd",
  "20:64:cb:c5:60:e1",
  "20:74:54:9b:97:99",
  "20:74:54:a2:96:17",
  "20:74:54:c0:b4:bd",
  "28:31:66:70:34:4f",
  "28:31:66:73:de:63",
  "28:31:66:80:78:35",
  "28:31:66:84:02:fd",
  "2c:d0:66:09:0f:94",
  "2c:d0:66:1d:4e:86",
  "2c:ff:ee:9d:aa:c3",
  "30:94:35:66:a8:15",
  "30:af:ce:09:87:fb",
  "30:af:ce:23:ff:65",
  "34:e9:11:12:c5:47",
  "34:e9:11:33:e6:41",
  "3c:a6:16:ec:6a:b3",
  "3c:b6:b7:39:86:f9",
  "5c:66:6c:cf:c4:af",
  "68:bf:c4:12:c1:6e",
  "68:bf:c4:ef:cd:5c",
  "6c:24:a6:d6:64:ff",
  "6c:24:a6:e6:fa:13",
  "70:78:8b:b1:08:71",
  "70:b7:aa:ba:11:77",
  "70:b7:aa:c2:ca:75",
  "7c:2a:db:c2:47:b8",
  "98:c8:b8:87:ed:b1",
  "9c:6b:72:69:d3:07",
  "a0:22:de:12:00:47",
  "a4:d9:90:72:55:d7",
  "b8:c7:4a:a5:9c:eb",
  "c0:2e:25:a5:d2:91",
  "c4:e3:9f:d0:33:59",
  "c8:16:da:1a:5a:1f",
  "c8:16:da:51:6a:dd",
  "d0:28:ba:11:4b:d7",
  "e0:1f:88:57:bf:cc",
  "f8:e7:a0:0e:c5:ed",
  "f8:e7:a0:60:f4:93",
  "14:5e:69:a0:32:15",
  "2c:d0:66:1e:de:dc",
  "a4:d9:90:41:4d:ef",
  "c0:87:eb:b9:7c:41",
  "60:30:d4:b9:68:22",
  "c8:f2:30:09:44:d4",
  "98:c8:b8:9c:cb:97",
  "f0:6d:78:3e:6d:e7",
  "d8:1e:dd:40:bc:5b",
  "70:78:8b:cc:ff:35",
  "b4:31:61:94:12:05",
  "c0:47:54:9e:24:21",
  "20:3b:69:7a:42:bb",
  "18:02:ae:7b:db:bd",
  "6e:45:c0:69:ea:69",
  "20:74:54:ba:56:8f",
  "38:6a:77:b6:d7:0f"
]

const macSchema = {
  mac_address: String,
  detail: String
}

const Mac = mongoose.model('Mac', macSchema)

const macResult = []

for(const mac of macList) {
  const macAdd = new Mac({
    mac_address: mac,
    detail: '-'
  })

  macResult.push(macAdd)
}


app.get('/', (req, res) => {

  Mac.find({}, (err, foundItems) => {
    
    if(foundItems.length === 0) {
      Mac.insertMany(macResult, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully saved default items to Database');
          res.redirect('/');
        }
      })

    } else {
      const sortedItems = [...foundItems].sort((a, b) => {
  
        const macA = a.mac_address.toUpperCase(); // ignore upper and lowercase
        const macB = b.mac_address.toUpperCase(); // ignore upper and lowercase
  
        if (macA < macB) {
          return -1;
        } else if (macA > macB) {
          return 1;
        }
  
        return 0;
      })
  
      res.render("list", { macAddresses: sortedItems });
    }

  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});