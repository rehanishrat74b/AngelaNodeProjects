//ex8: exact match within a document
// matches all documents where the value of the field producer is an embedded document
// that contains only the field company with the value 'ABC123' and the field address 
//with the value '123 Street', in the exact order:
db.inventory.find(
  {
    producer:
    {
      company: 'ABC123',
      address: '123 Street'
    }
  }
)
//ex9: Equality Match on Fields within an Embedded Document
db.inventory.find({ 'producer.company': 'ABC123' })
