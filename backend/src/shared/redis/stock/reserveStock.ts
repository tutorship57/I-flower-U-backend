import { redis } from "../redis.service";

const reserveStockLua = `
local count = #ARGV

-- 1) check
for i = 1, count do
    local stock = tonumber(redis.call("GET", KEYS[i]))
    local need = tonumber(ARGV[i])

    if stock == nil then
        return {err = "NOT_FOUND:" .. KEYS[i]}
    end

    if stock < need then
        return {err = "OUT_OF_STOCK:" .. KEYS[i]}
    end
end

-- 2) reserve (decrement)
local results = {}
for i = 1, count do
    local need = tonumber(ARGV[i])
    local newStock = redis.call("DECRBY", KEYS[i], need)
    table.insert(results, newStock)
end

return results
`;

export async function reserveStock(items: Array<{ product_id: string; quantity: number, unit_price: number }>) {
  const keys = items.map(i => `stock:${i.product_id}`);
  const args = items.map(i => String(i.quantity));

  try {
    const result = await redis.eval(reserveStockLua, {
      keys,
      arguments: args,
    });

    return { ok: true };

  } catch (err: Error | any) {
    return { ok: false, error: err.message };
  }
}