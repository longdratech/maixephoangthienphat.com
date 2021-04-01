module.exports = {
    apps : [{
      name: "maixep-web",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
}