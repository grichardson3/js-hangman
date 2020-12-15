const product = {
    name: 'Influence'
}

Object.prototype.hasOwnProperty = () => 'This is new';

// hasOwnProperty
console.log(product.hasOwnProperty('hasOwnProperty'));