import VueRouter from "vue-router";
import ProductList from "@/components/ProductList";
import Product from "@/components/Product";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: ProductList,
        },
        {
            path: '/products',
            component: Product
        }
    ]
})

export default router