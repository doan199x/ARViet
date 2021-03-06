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
    return FILEUPLOAD_AXIOS_INSTANCE.post('/marker', formData);
  },
  uploadArContentTemp: (formData) => {
    return FILEUPLOAD_AXIOS_INSTANCE.post('/arcontent/temp', formData);
  },
  getMarker: (markerID) => {
    return AXIOS_INSTANCE.get('/marker', { params: { markerID: markerID } })
  },
  setMarkerScale: (markerScale, markerID) => {
    return AXIOS_INSTANCE.post('/marker/scale', { markerScale, markerID });
  },
  getTempARContent: (markerID) => {
    return AXIOS_INSTANCE.get('/arcontent', { params: { markerID: markerID } });
  },
  addNewInstanceARContent: (actionID, contentID) => {
    return AXIOS_INSTANCE.post('/arcontent/newinstance', { actionID, contentID });
  },
  getTempARContentByActionID: (actionID) => {
    return AXIOS_INSTANCE.get('/arcontent/actionid', { params: { actionID: actionID } });
  },
  getMarkerID: (markerID) => {
    return AXIOS_INSTANCE.get('/action/init', { params: { markerID: markerID } });
  },
  addAction: (name, markerID) => {
    return AXIOS_INSTANCE.post('/action', { name, markerID });
  },
  getAllARContentByActionID: (actionID) => {
    return AXIOS_INSTANCE.get('/arcontent/all', { params: { actionID: actionID } });
  },
  getAllARContentChoosen: (actionID) => {
    return AXIOS_INSTANCE.get('/arcontent/choosen', { params: { actionID: actionID } });
  },
  loadMarker: (markerID) => {
    return AXIOS_INSTANCE.get('/action', { params: { markerID: markerID } });
  },
  deleteARContent: (contentID) => {
    return AXIOS_INSTANCE.delete('/arcontent', { params: { contentID: contentID } });
  },
  deleteMarker: (markerID, lessonID) => {
    return AXIOS_INSTANCE.delete('/marker', { params: { markerID: markerID, lessonID: lessonID } });
  },
  deleteAction: (actionID, markerID) => {
    return AXIOS_INSTANCE.delete('/action', { params: { actionID: actionID, markerID: markerID } });
  },
  loadArContentThat: (maDiemDanhDau) => {
    return AXIOS_INSTANCE.get(API.ARCONTENTTHAT, { params: { maDiemDanhDau: maDiemDanhDau } })
  },
  saveText: (textObject, textUpdatedContentID) => {
    return AXIOS_INSTANCE.post('arcontent/text', { textObject, textUpdatedContentID });
  },
  getTextARContent: (contentID) => {
    return AXIOS_INSTANCE.get('arcontent/text', { params: { contentID: contentID } });
  },
  updateARContent: (ARContent) => {
    return AXIOS_INSTANCE.patch('/arcontent', { ARContent });
  },
  changeAction: (actionID, actionNameChange, markerID) => {
    return AXIOS_INSTANCE.patch('/action', { actionID, actionNameChange, markerID });
  },
  new: (userid, lecname, description) => {
    return AXIOS_INSTANCE.post(API.NEW, { userid, lecname, description });
  },
  getAllMarker: (lecid) => {
    return AXIOS_INSTANCE.post(API.MARKER, { lecid });
  },
  addMarker: (lecid) => {
    return AXIOS_INSTANCE.post(API.ADDMARKER, { lecid });
  },
  getMarkerByLessonID: (lecid) => {
    return AXIOS_INSTANCE.get('/marker/getall', { params: { lecid: lecid } });
  },
  getTempByActionID: (actionID) => {
    return AXIOS_INSTANCE.get('/arcontent/gettemp', { params: { actionID: actionID } });
  },
  deleteLecture: (lecid) => {
    return AXIOS_INSTANCE.post(API.DELETE, { lecid });
  },
  getLessonName: (lessonID) => {
    return AXIOS_INSTANCE.post('lecture/name', { lessonID });
  },
  getARContentByContentID: (contentID) => {
    return AXIOS_INSTANCE.get('/arcontent/contentID', { params: { contentID: contentID } });
  }
}