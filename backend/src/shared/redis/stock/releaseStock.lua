-- releaseStock.lua
for i = 1, #ARGV do
    redis.call("INCRBY", KEYS[i], tonumber(ARGV[i]))
end
return "OK"
-- KEYS: list of stock keys