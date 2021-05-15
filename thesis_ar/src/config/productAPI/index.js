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
  lecture: (userid) => {
    return AXIOS_INSTANCE.post(API.LECTURE, { userid });
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
  updateDuocChonArContent: (MaNoiDung, MaHanhDong) => {
    return AXIOS_INSTANCE.patch(API.ARCONTENT, { MaNoiDung, MaHanhDong });
  },
  getArContentDuocChon: (maHanhDong) => {
    return AXIOS_INSTANCE.get(API.ARCONTENTDUOCCHON, { params: { maHanhDong: maHanhDong } });
  },
  getMaHanhDongKhoiTao: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.HANHDONGKHOITAO, { params: { maDiemDanhDau: maDiemDanhDau } });
  },
  themHanhDong: (noiDung, maDiemDanhDau) => {
    return AXIOS_INSTANCE.post(API.HANHDONG, { noiDung, maDiemDanhDau });
  },
  getNoiDungARByHanhDong: (maHanhDong) => {
    return AXIOS_INSTANCE.get(API.NOIDUNGARHANHDONG, { params: { maHanhDong: maHanhDong } });
  },
  loadHanhDong: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.HANHDONG, { params: { maDiemDanhDau: maDiemDanhDau } });
  },
  deleteDoiTuongHanhDong: (maHanhDong, maNoiDung) => {
    return AXIOS_INSTANCE.delete(API.HANHDONGDOITUONG, { params: { maHanhDong: maHanhDong, maNoiDung: maNoiDung } });
  },
  loadArContentThat: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.ARCONTENTTHAT, { params: { maDiemDanhDau: maDiemDanhDau } })
  },
  LuuText: (textObject) => {
    return AXIOS_INSTANCE.post(API.NOIDUNGTEXT, { textObject });
  },
  getNoiDungVanBan: (MaNoiDung)=>{
    return  AXIOS_INSTANCE.get(API.NOIDUNGTEXT, { params: { MaNoiDung: MaNoiDung } });
  },
  updateNoiDungAR: (NoiDungAR)=>{
    return AXIOS_INSTANCE.post(API.NOIDUNG, {NoiDungAR});
  },
  new: (userid,lecname,description)=>{
    return AXIOS_INSTANCE.post(API.NEW, {userid,lecname,description});
  },
  getAllMarker: (lecid)=>{
    return AXIOS_INSTANCE.post(API.MARKER, {lecid});
  },
  addMarker: (lecid)=>{
    return AXIOS_INSTANCE.post(API.ADDMARKER, {lecid});
  },
}