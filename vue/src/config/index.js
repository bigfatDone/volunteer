import Config from '../../config/index'
import { Script } from 'vm';
const baseUrl = Config.dev.proxyTable["/volunteer"].target

export default {
  baseUrl
}
