import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // 1. 서비스 통계 (공개 게시글 수, 전체 사용자 수)
    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM Post WHERE isPrivate = 0) as totalPublicPosts,
        (SELECT COUNT(*) FROM User) as totalUsers
    `).get();

    // 2. 최근 게시물 (Recent Posts) - 상위 5개, 본문 제외
    const recentPosts = db.prepare(`
      SELECT p.id, p.title, p.viewCount, p.createdAt, u.name as authorName
      FROM Post p
      JOIN User u ON p.authorId = u.id
      WHERE p.isPrivate = 0
      ORDER BY p.createdAt DESC
      LIMIT 5
    `).all();

    // 3. 인기 게시물 (Popular Posts) - 좋아요 순 상위 5개
    const popularPosts = db.prepare(`
      SELECT 
        p.id, p.title, p.viewCount, p.createdAt, u.name as authorName,
        (SELECT COUNT(*) FROM Like WHERE postId = p.id) as likesCount
      FROM Post p
      JOIN User u ON p.authorId = u.id
      WHERE p.isPrivate = 0
      ORDER BY likesCount DESC, p.createdAt DESC
      LIMIT 5
    `).all();

    // UI 호환성 포맷팅
    const formattedRecentPosts = recentPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      viewCount: post.viewCount,
      createdAt: post.createdAt,
      author: { name: post.authorName }
    }));

    const formattedPopularPosts = popularPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      viewCount: post.viewCount,
      createdAt: post.createdAt,
      author: { name: post.authorName },
      likesCount: post.likesCount
    }));

    return NextResponse.json({
      stats,
      recentPosts: formattedRecentPosts,
      popularPosts: formattedPopularPosts
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
