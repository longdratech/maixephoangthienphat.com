module.exports = {
  apps: [
    {
      name: "maixep-backend",
      watch: false,
      interpreter: "/root/.nvm/versions/node/v14.16.0/bin/node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
