module.exports = async function beforeFindSpatial ({ model, params = {}, filter = {}, options = {} }) {
  const { _ } = this.ndut.helper
  params.where = params.where || {}
  const bbox = params.bbox || _.get(options, 'request.query.bbox')
  if (!bbox) return
  params.where = this.ndutSpatial.helper.asBboxQuery(bbox, params.where)
}
