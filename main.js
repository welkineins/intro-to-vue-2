Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">
    <div class="product-image">
        <img :src="image" style="height: 100px"/>
    </div>
    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Use is premium: {{ premium }}</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor, height: '15px', width: '15px' }"
             @mouseover="updateProduct(index)">
        </div>
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disableButton: !inStock }">Add to cart</button>
        <div class="cart">
            <p> Cart({{ cart }})</p>
        </div>
    </div>
</div>`,
    data: function() {
        return {
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
        };
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
        },
        shipping: function() {
            if (this.premium) {
                return "free";
            } else {
                return "2.99";
            }
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
});