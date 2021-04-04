module.exports = {
  apps: [
    {
      name: "maixep-fontend",
      script: "/srv/maixephoangthienphat.com/.next/server/pages/_app.js",
      watch: false,
      interpreter: "/root/.nvm/versions/node/v14.16.0/bin/node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
