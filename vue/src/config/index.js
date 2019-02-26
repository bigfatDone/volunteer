import Config from '../../config/index'
import { Script } from 'vm';
const baseUrl = Config.dev.proxyTable["/portal2"].target

export default {
  baseUrl
}
