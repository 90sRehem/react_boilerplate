import { axios } from '@/lib/axios';
import { LoginResponse } from '../types';

export async function getRefreshToken(
  refreshToken: string,
): Promise<LoginResponse> {
  return axios.post(`auth/refresh_token `, { refreshToken });
}
