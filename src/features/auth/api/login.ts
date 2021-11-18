import { axios } from '@/lib/axios';
import { LoginCredentialsDTO, LoginResponse } from '../types';

export async function LoginWithEmailAndPassword({
  email,
  password,
}: LoginCredentialsDTO): Promise<LoginResponse> {
  return axios.post('/auth/session', { email, password });
}
