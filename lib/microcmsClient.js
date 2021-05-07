import microcmsConfig from '../plugins/microcms'

let instance

const MicrocmsClient = {
  init(axios) {
    instance = {
      getEndPoint: microcmsConfig.getEndPoint,
      getKey: microcmsConfig.getKey,
      axios: axios
    }
  },
  async getLatestNewsAsync() {
    instance.axios.setHeader('X-API-KEY', instance.getKey)
    const response = await instance.axios.$get(instance.getEndPoint)
    return response
  }
}

export default MicrocmsClient
