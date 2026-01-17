import { redis } from "../redis.service";

const releaseStockLua = `
for i = 1, #ARGV do
    redis.call("INCRBY", KEYS[i], tonumber(ARGV[i]))
end
return "OK"
`;

export async function releaseStock(items: Array<{ product_id: string; quantity: number, unit_price: number }>) {
  const keys = items.map(i => `stock:${i.product_id}`);
  const args = items.map(i => String(i.quantity));

  try {
    await redis.eval(releaseStockLua, {
      keys,
      arguments: args,
    });

    return { ok: true };
  } catch (err: Error | any ) {
    return { ok: false, error: err.message };
  }
}