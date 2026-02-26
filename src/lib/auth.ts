import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// .env 또는 기본 시크릿 키 사용
const JWT_SECRET = process.env.JWT_SECRET || 'shared-secret-key'; 

export interface AuthUser {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
}

export const getAuthUser = (): AuthUser | null => {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
};

export const hasPrivateAccess = (postId: string): boolean => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(`private_access_${postId}`)?.value;
  return !!accessToken;
};
