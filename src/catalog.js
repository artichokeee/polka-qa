// Catalog: data/products.csv, columns id;name;price;stock.
export function parseProducts(csv) {
  return csv.trim().split("\n").slice(1).map((line) => {
    const [id, name, price, stock] = line.split(";");
    return { id: Number(id), name, price: Number(price), stock: Number(stock) };
  });
}

export const PHOTO_DIR = "assets";

export const pageTitle = (p) => `${p.name} – Полка`;

export const byPrice = (list, max) => list.filter((p) => p.price <= max);

export const WISHLIST_ICON = "heart-outline";
