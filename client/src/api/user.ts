import { AxiosResponse } from "axios"
import api from "."
import { IUser } from "../models/IUser"

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
	return api.get<IUser[]>("/users")
}