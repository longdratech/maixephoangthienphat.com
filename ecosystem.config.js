module.exports = {
  apps: [
    {
      name: "maixep-fontend",
      script: "npm run",
      args: "deploy",
      watch: true,
      interpreter: "/root/.nvm/versions/node/v14.16.0/bin/node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
