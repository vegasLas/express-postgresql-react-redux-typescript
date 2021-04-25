import { ObjectInInfoType } from '../redux/info-reducer';
import { instance } from './axios'


export const InfoRestApi = {
    getInfo() {
        return instance.get<ObjectInInfoType[]>("info").then(res => res.data)
    }
}