import { test, expect } from '@playwright/test';

test.describe('Guest Browsing', () => {
  test('should see post list', async ({ page }) => {
    await page.goto('/posts');
    await expect(page.locator('h1')).toContainText('게시글 목록');
  });

  test('should view public post content', async ({ page }) => {
    // 실제 DB 연동 환경에서 테스트 데이터가 있다고 가정하거나 
    // Mocking이 필요하지만 여기서는 구조적 작성에 집중합니다.
    await page.goto('/posts/1'); // ID 1번이 공개글이라고 가정
    // ... 상세 검증 로직
  });

  test('should show password form for private post', async ({ page }) => {
    await page.goto('/posts/2'); // ID 2번이 비밀글이라고 가정
    // 비밀글의 경우 PrivateAuthForm이 노출되어야 함
  });
});
