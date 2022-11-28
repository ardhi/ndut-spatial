module.exports = {
  handler: async function (request, reply) {
    const { fs, getNdutConfig } = this.ndut.helper
    const cfg = getNdutConfig('ndutSpatial')
    const fname = `${cfg.dir}/lib/geocode/${request.params.provider}.js`
    if (!fs.existsSync(fname)) throw this.Boom.badData('invalidProvider', { ndut: 'geocode' })
    const mod = require(fname)
    const params = this.ndutApi.helper.prepList(this.ndutRest.helper.translateFilter(request.query), '_array_', true)
    return await mod.geocode.call(this, request, reply, params)
  }
}