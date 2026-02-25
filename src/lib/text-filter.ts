/**
 * 순수 텍스트 필터링 유틸리티
 */

export const filterPlainText = (text: string): string => {
  if (!text) return '';
  
  // HTML 태그 제거
  let clean = text.replace(/<[^>]*>/g, '');
  
  // 엔티티 디코딩 등 추가 처리가 필요할 수 있음
  return clean.trim();
};

export const isPasswordValid = (password: string): boolean => {
  return password.length >= 4;
};
