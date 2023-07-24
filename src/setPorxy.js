import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://oi-market.fly.dev",
      changeOrigin: true,
    })
  );
};
