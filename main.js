var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: '1578366170160_4.png',
        altText: 'hahaha',
        inStock: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: '1578366170160_4.png'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: '1578366211820_6.png'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct: function(variantImage) {
            this.image = variantImage;
        }
    }
});