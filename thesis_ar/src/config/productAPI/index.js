import {API} from '../../constant/API'
import {AXIOS_INSTANCE} from '../../config/environment.js'
export const productAPI = {
    signup: (email, password, name) => {
      return AXIOS_INSTANCE.post(API.SIGNUP, {email, password,name});
    },
    signuptest: () => {
      return AXIOS_INSTANCE.get(API.SIGNUP);
    },
}