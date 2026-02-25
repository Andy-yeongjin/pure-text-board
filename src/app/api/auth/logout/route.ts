import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  // 쿠키 만료 시간을 과거로 설정하여 삭제
  response.cookies.set('auth_token', '', { expires: new Date(0), path: '/' });
  return response;
}
