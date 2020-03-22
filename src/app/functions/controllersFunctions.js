const statusEnum = require("../enum/statusEnum")

module.exports = {
  getIndexFilterByStatus(status){
    return (statusEnum[status.toLowerCase()]!==statusEnum.all)? { status : statusEnum[status] } : {};
  },
  getIdsArrayByStream(stream, separator){
    return stream.split(separator);
  }
};
