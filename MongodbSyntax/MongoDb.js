https://www.mongodb.com/
F: \Program Files(x86) \MongoDB Atlas CLI
F: \Program Files(x86) \mongosh

username = rehanishrat74
password = CiGrTSUnp1pdfyut


110.38.243.149 / 32
My IP Address

F: \Program Files(x86) \mongosh
mongosh "mongodb+srv://clusterrehan.ftufvvt.mongodb.net/" --apiVersion 1 --username rehanishrat74

use shopDB // created database
help
show databases
db // show current db you are in.

db.products.insertOne({ _id: 1, name: "Pen", price: 1.20 }) // one row added in table products. or 1 document
db.products.insertOne({ _id: 2, name: "Pencil", price: 0.80, stock: 12 })

show collections //it will list products
db.products.find() // select * from products
db.products.find({ name: "Pencil" }) // select * from products where name ='Pencil'
db.products.find({ price: { $gt: 1 } }) // select * from products where price > 1
db.products.find({ _id: 1 }, { name: 1 }) // select name from product where _id=1
db.products.find({ _id: 1 }, { name: 1, price: 1 }) // select name,price from product where _id =1
[{ _id: 1, name: 'Pen', price: 1.2 }] // to hide _id, we use projection

db.products.find({ _id: 1 }, { name: 1, price: 1, _id: 0 }) //_id:0 hide , _id:1 show
[{ name: 'Pen', price: 1.2 }]

db.products.updateOne({ _id: 1 }, { $set: { stock: 32 } }) // update products set stock=32 where _id=1


Relationships:
one -> many
----------------
  db.products.insert(
    _id: 3,
    name: "Rubber",
    price: 1.30,
    stock: 43,
    reviews: [
    {
      authorName: "Sally",
      rating: 5,
      review: "Best rubber ever!"
    },
    {
      authorName: "John",
      rating: 5,
      review: "Awesome rubber!"
    }
  ]
  )

