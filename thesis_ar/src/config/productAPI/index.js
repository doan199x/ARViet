import { API } from '../../constant/API'
import { AXIOS_INSTANCE, FILEUPLOAD_AXIOS_INSTANCE } from '../../config/environment.js'
export const productAPI = {
  signup: (fullname, id, email, password) => {
    return AXIOS_INSTANCE.post(API.SIGNUP, { fullname, id, email, password });
  },
  signin: (email, password) => {
    return AXIOS_INSTANCE.post(API.SIGNIN, { email, password });
  },
  checkToken: () => {
    return AXIOS_INSTANCE.post(API.CHECKTOKEN);
  },
  uploadMarker: (formData) => {
    return FILEUPLOAD_AXIOS_INSTANCE.post(API.MARKER, formData);
  },
  uploadArContent: (formData) => {
    return FILEUPLOAD_AXIOS_INSTANCE.post(API.ARCONTENT, formData);
  },
  getMarker: (maBaiGiang, maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.MARKER, { params: { maBaiGiang: maBaiGiang, maDiemDanhDau: maDiemDanhDau } })
  },
  getArContent: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.ARCONTENT, { params: { maDiemDanhDau: maDiemDanhDau } });
  },
  updateDuocChonArContent: (MaNoiDung) => {
    return AXIOS_INSTANCE.patch(API.ARCONTENT, MaNoiDung);
  },
  getArContentDuocChon: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.ARCONTENTDUOCCHON, { params: { maDiemDanhDau: maDiemDanhDau } });
  },
}