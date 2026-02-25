import { test, expect } from '@playwright/test';

test.describe('Secret Posts', () => {
  test('should create a private post and access with password', async ({ page }) => {
    // 1. 로그인 (auth_token 설정되었다고 가정)
    // 2. /posts/new 이동 및 작성
    // 3. /posts/[id] 이동하여 비밀번호 폼 확인
    // 4. 비밀번호 입력 후 본문 노출 확인
  });
});
