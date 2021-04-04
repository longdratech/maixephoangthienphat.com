module.exports = {
  apps: [
    {
      name: "maixep-fontend",
      script: "npm run",
      args: "deploy",
      watch: true,
      interpreter: "/bin/bash",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
