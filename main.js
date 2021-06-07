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
    </div>

    <product-tabs :reviews="reviews"></product-tabs>
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
                    variantQuantity: 1
                }
            ],
            reviews: []
        };
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
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

Vue.component("product-review", {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            if (this.name && this.review && this.rating) {
                let obj = {
                    name: this.name,
                    rating: this.rating,
                    review: this.review
                }
    
                this.$emit('review-submitted', obj);
                this.name = null;
                this.rating = null;
                this.review = null;
                this.errors = [];
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab" :class="{activeTab: selectedTab === tab}"
                 v-for="(tab, index) in tabs"
                 :key="index"
                 @click="selectedTab = tab">
                 {{tab}}
            </span>
            <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
            <p v-if="reviews.length == 0"> There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        <product-review @review-submitted="addReview" v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    },
    methods: {
        addReview: function(obj) {
            this.reviews.push(obj);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart: function(id) {
            this.cart.push(id);
        }
    }
});