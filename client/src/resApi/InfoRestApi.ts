import { infoType } from '../redux/info-reducer';
import { instance } from './axios'

type InfoGetType = infoType

export const InfoRestApi = {
    getInfo() {
        return instance.get<InfoGetType>("info").then(res => res.data)
    }
}