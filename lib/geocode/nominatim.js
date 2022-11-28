module.exports = {
  geocode: async function (request, reply, params) {
    const { _, getNdutConfig } = this.ndut.helper
    const { fetchUrl } = this.ndutExtra.helper
    const cfg = getNdutConfig('ndutGeocode')
    const url = `${_.get(cfg, 'provider.nominatim.url', 'https://nominatim.openstreetmap.org')}/search`
    const oparams = { limit: params.limit, format: 'json', q: params.rawQuery }
    const resp = await fetchUrl(url, { params: oparams })
    return _.map(resp, r => {
      return {
        id: Number(r.place_id),
        lat: Number(r.lat),
        lng: Number(r.lon),
        name: r.display_name,
        category: r.class,
        type: r.type
      }
    })
  },
  reverseGeocode: async function (request, reply) {
    const { _, getNdutConfig } = this.ndut.helper
    const { fetchUrl } = this.ndutExtra.helper
    const cfg = getNdutConfig('ndutGeocode')
    const url = `${_.get(cfg, 'provider.nominatim.url', 'https://nominatim.openstreetmap.org')}/reverse`
    const [lon, lat] = _.map(request.params.id.split(','), m => _.trim(m))
    const oparams = { format: 'json', lon, lat }
    const resp = await fetchUrl(url, { params: oparams })
    return {
      id: Number(resp.place_id),
      lat: Number(resp.lat),
      lng: Number(resp.lon),
      name: resp.display_name,
      category: resp.category,
      type: resp.type,
      address: resp.address
    }
  }
}
