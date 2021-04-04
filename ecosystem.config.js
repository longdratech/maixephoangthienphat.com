module.exports = {
  apps: [
    {
      name: "maixep-fontend",
      watch: false,
      interpreter: "/root/.nvm/versions/node/v14.16.0/bin/node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
