import { axios } from '@/lib/axios';
import { LoginCredentialsDTO, LoginResponse } from '../types';

export async function loginWithEmailAndPassword({
  email,
  password,
}: LoginCredentialsDTO): Promise<LoginResponse> {
  return axios.post('/auth/session', { email, password });
}
