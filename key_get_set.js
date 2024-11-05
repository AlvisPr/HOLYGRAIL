/**
 * This script demonstrates basic usage of the Redis client in Node.js.
 * It performs the following operations:
 * 1. Sets a key-value pair in Redis.
 * 2. Retrieves the value of the key from Redis and logs it.
 * 3. Sets multiple key-value pairs in Redis.
 * 4. Retrieves multiple values from Redis and logs them.
 * 5. Closes the Redis client connection.
 *
 * Redis is an in-memory data structure store, used as a database, cache, and message broker.
 * It supports various data structures such as strings, hashes, lists, sets, and more.
 */
const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});


async function main() {
  try {
    await client.connect(); // Connect to Redis

    await client.set("my_key", "Hello World");
    const value = await client.get("my_key");
    console.log(value);

    await client.mSet("header" ,0, "Left" ,0, "article" ,0, "Right" ,0, "footer" ,0);
    const values = await client.mGet("header", "Left", "article", "Right", "footer");
    console.log(values);
  } catch (err) {
    console.error(err);
  } finally {
    await client.quit(); // Close the client connection after all operations
  }
}

main();