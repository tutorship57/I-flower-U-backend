-- reserveStock.lua
-- KEYS: list of stock keys
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

