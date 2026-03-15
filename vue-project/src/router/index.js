import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import BrandsView from "../views/BrandsView.vue"
import NewBrandView from "../views/NewBrandView.vue"
import ModelsView from "../views/ModelsView.vue"
import NewModelView from "../views/NewModelView.vue"
import VehiclesView from "../views/VehiclesView.vue"
import ClientsView from "../views/ClientsView.vue"
import RentalsView from "../views/RentalsView.vue"
import NewVehicleView from "../views/NewVehicleView.vue"

const routes = [

{
path:"/",
name:"home",
component:HomeView
},

{
path:"/marcas",
name:"brands",
component:BrandsView
},

{
path:"/nueva-marca",
name:"newBrand",
component:NewBrandView
},

{
path:"/modelos",
name:"models",
component:ModelsView
},

{
path:"/nuevo-modelo",
name:"newModel",
component:NewModelView
},

{
path:"/vehiculos",
name:"vehicles",
component:VehiclesView
},

{
path:"/clientes",
name:"clients",
component:ClientsView
},

{
path:"/alquiler",
name:"rentals",
component:RentalsView
},

{
path: "/nuevo-vehiculo",
name: "newVehicle",
component: NewVehicleView
}

]

const router = createRouter({

history:createWebHistory(),
routes

})

export default router