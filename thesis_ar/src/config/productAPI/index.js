import {API} from '../../constant/API'
import {AXIOS_INSTANCE} from '../../config/environment.js'
export const productAPI = {
    signup: (fullname, id, email,password) => {
      return AXIOS_INSTANCE.post(API.SIGNUP, {fullname, id, email,password});
    },
}