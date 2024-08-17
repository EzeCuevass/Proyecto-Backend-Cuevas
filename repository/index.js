import { ProductRepository } from "./product-repository.js";
import ProductManager from "../daos/products.dao.js";
import { UserRepository } from "./user-repository.js";
import userManager from "../daos/users.dao.js";
import { CartRepository } from "./cart-repository.js";
import CartManager from "../daos/carts.dao.js";
import { TicketRepository } from "./ticket-repository.js";
import ticketManager from "../daos/ticket.dao.js";


export const productRepository = new ProductRepository(new ProductManager)

export const userRepository = new UserRepository(new userManager) 

export const cartRepository = new CartRepository(new CartManager)

export const ticketRepository = new TicketRepository(new ticketManager)