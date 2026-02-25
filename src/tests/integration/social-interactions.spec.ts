import { test, expect } from '@playwright/test';

test.describe('Social Interactions', () => {
  test('should toggle like', async ({ page }) => {
    // 1. 게시글 상세 페이지 이동
    // 2. 좋아요 버튼 클릭 및 카운트 증가 확인
    // 3. 다시 클릭하여 카운트 감소 확인
  });

  test('should add and soft delete comment', async ({ page }) => {
    // 1. 댓글 작성
    // 2. 삭제 버튼 클릭
    // 3. "삭제된 댓글입니다" 문구 노출 확인
  });
});
