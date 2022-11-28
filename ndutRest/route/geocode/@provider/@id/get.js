module.exports = {
  handler: async function (request, reply) {
    const { fs, getNdutConfig } = this.ndut.helper
    const cfg = getNdutConfig('ndutSpatial')
    const fname = `${cfg.dir}/lib/geocode/${request.params.provider}.js`
    if (!fs.existsSync(fname)) throw this.Boom.badData('invalidProvider', { ndut: 'geocode' })
    const mod = require(fname)
    return await mod.reverseGeocode.call(this, request, reply)
  }
}