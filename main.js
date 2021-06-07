var app = new Vue({
    el: '#app',
    data: {
        brand: "Vue Mastery",
        product: 'Socks',
        selectedVariant: 0,
        altText: 'hahaha',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: '1578366170160_4.png',
                variantQuantity: 3
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: '1578366211820_6.png',
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product;
        },
        image: function() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock: function() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});