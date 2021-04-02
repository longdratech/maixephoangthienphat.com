module.exports = {
    apps : [{
      name: "maixep-web",
      script: 'yarn',
      args: 'build start',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
}