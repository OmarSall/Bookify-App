const jsonServer = require(require.resolve("json-server")); // <– bezpieczne i niezależne od środowiska

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log("✅ JSON Server is running at http://localhost:3000");
});
