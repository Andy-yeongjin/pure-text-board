import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
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

export const hasPrivateAccess = (postId: number): boolean => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(`private_access_${postId}`)?.value;
  return !!accessToken;
};
