import { AxiosPromise } from "axios";
import api from ".";
import { AuthResponse } from "../models/response/AuthResponse";

export const login = async (email: string, password: string): Promise<AxiosPromise<AuthResponse>> => {
	return api.post<AuthResponse>('/login', { email, password })
}

export const register = async (email: string, password: string): Promise<AxiosPromise<AuthResponse>> => {
	return api.post<AuthResponse>('/register', { email, password })
}

export const logout = async (): Promise<void> => {
	api.post<AuthResponse>('/logout')
}
