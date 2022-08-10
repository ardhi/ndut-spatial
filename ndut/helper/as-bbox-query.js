module.exports = function (bbox, query, lngField = 'lng', latField = 'lat') {
  const { _ } = this.ndut.helper
  let bounds
  if (_.isString(bbox)) bounds = _.map(bbox.split(','), b => Number(_.trim(b)))
  else if (_.isArray(bbox) && bbox.length === 2) bounds = _.flatten(bbox)
  else bounds = bbox
  const lng = _.set({}, lngField, { between: [bounds[0], bounds[2]] })
  const lat = _.set({}, latField, { between: [bounds[1], bounds[3]] })
  if (_.isString(query)) {
    try {
      query = JSON.parse(query || '{}')
    } catch (err) {}
  }
  return _.merge({}, query || {}, lng, lat)
}
