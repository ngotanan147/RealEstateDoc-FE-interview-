const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require('uuid');

var database = { products: [] };

// Generate data for database.json
for (var i = 1; i <= 500; i++) {
  database.products.push({
    id: uuidv4(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    category: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    image: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.number.int({ max: 9999 }),
    isDeleted: false
  });
}

console.log(JSON.stringify(database));
