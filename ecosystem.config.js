module.exports = {
    apps : [{
      name: "maixep-web",
      script: 'yarn',
      args: 'startup',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
}