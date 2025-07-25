export const CATEGORIES_PER_PAGE = 3;
export const USERS_PER_PAGE = 3;
export const PRODUCTS_PER_PAGE = 3;
export const ORDERS_PER_PAGE = 3;

const PRODUCTION_DOMAIN = "https://food-ordering-app-hazel.vercel.app/en";

const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
