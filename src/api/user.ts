import service from '../utils/request'
import { fetchUrl } from '../config'

export function LoginAPI(data: object) {
    return service({
        url: fetchUrl + '/user/login',
        method: 'POST',
        data
    })
}
