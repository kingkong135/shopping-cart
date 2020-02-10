<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products"
                :key="product.id">
                {{product.title}} - {{product.price}}
            </li>
        </ul>
    </div>
</template>

<script>
    import shop from "@/api/shop";
    export default {
        name: "ProductList",
        data () {
            return {
                products: []
            }
        },

        created () {
            shop.getProducts(products => {
                this.products = products
                console.this.prodcuts;
            })
        }
    }
</script>

<style scoped>

</style>