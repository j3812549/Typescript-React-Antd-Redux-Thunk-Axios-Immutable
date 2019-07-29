import service from 'src/utils/request'
import { fetchUrl } from 'src/config'

export function LoginAPI(data: object) {
    return service({
        url: fetchUrl + '/user/login',
        method: 'POST',
        data
    })
}
