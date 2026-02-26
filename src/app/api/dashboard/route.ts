import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. 서비스 통계 (공개 게시글 수, 전체 사용자 수)
    const statsResult = await client.fetch(`{
      "totalPublicPosts": count(*[_type == "post"]),
      "totalUsers": count(*[_type == "user"])
    }`);

    // 2. 최근 게시물 (Recent Posts) - 상위 5개
    const recentPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...5] {
        "_id": _id,
        "title": title,
        "viewCount": viewCount,
        "createdAt": publishedAt,
        "author": author-> { name }
      }
    `);

    // 3. 인기 게시물 (Popular Posts) - 좋아요 순 상위 5개
    // Sanity에서는 count 기반 정렬이 어려우면 서버에서 가공하거나 GROQ 9.0+ 기능을 써야 함
    // 여기서는 조회수 기반으로 대체하거나, 좋아요 문서를 조인하여 셈
    const popularPosts = await client.fetch(`
      *[_type == "post"] | order(viewCount desc)[0...5] {
        "_id": _id,
        "title": title,
        "viewCount": viewCount,
        "createdAt": publishedAt,
        "author": author-> { name },
        "likesCount": count(*[_type == "like" && post._ref == ^._id])
      }
    `);

    // UI 호환성 포맷팅
    const formattedRecentPosts = recentPosts.map((post: any) => ({
      id: post._id,
      title: post.title,
      viewCount: post.viewCount || 0,
      createdAt: post.createdAt,
      author: { name: post.author?.name || 'Anonymous' }
    }));

    const formattedPopularPosts = popularPosts.map((post: any) => ({
      id: post._id,
      title: post.title,
      viewCount: post.viewCount || 0,
      createdAt: post.createdAt,
      author: { name: post.author?.name || 'Anonymous' },
      likesCount: post.likesCount
    }));

    return NextResponse.json({
      stats: statsResult,
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
