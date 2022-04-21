const { faker } = require('@faker-js/faker');


module.exports = () => {
    const data = { search: [] }
    for (let i = 0; i < 100; i++) {
        const url = faker.internet.url();

        const color = faker.commerce.color();
        const department = faker.commerce.department();
        const productName = faker.commerce.productName();
        const price = faker.commerce.price();
        const productAdjective = faker.commerce.productAdjective();
        const productMaterial = faker.commerce.productMaterial();
        const product = faker.commerce.product();
        const productDescription = faker.commerce.productDescription();

        data.search.push({ url, color, department, productName, price, productAdjective, productMaterial, product, productDescription })
    }
    return data
}