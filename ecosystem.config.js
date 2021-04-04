module.exports = {
  apps: [
    {
      name: "maixep-web",
      script: "yarn",
      args: "deploy:prod",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
