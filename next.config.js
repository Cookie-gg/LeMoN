module.exports = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `
    @import '../foundation/functions.scss';
      @import '../foundation/mixins.scss';
      @import '../foundation/colors.scss';
      @import '../foundation/variables.scss';`,
  }
}