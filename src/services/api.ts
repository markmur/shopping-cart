import { Product } from "../types";

const CACHE_KEY = "shop.cache";

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } catch {
    return [];
  }
}

function updateCache(results: Product[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(results));
  return results;
}

export function fetchProducts(limit: number = 10): Promise<Product[]> {
  const cache = getCache();

  if (cache.length) {
    return Promise.resolve(cache);
  }

  return fetch(`https://fakestoreapi.com/products?limit=${limit}`)
    .then((res) => res.json())
    .then(updateCache);
}
