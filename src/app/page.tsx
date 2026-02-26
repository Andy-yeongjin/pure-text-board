"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  stats: {
    totalPublicPosts: number;
    totalUsers: number;
  };
  recentPosts: any[];
  popularPosts: any[];
}

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 1. 대시보드 데이터 로드
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // 2. 로그인 상태 확인 (세션 쿠키 확인 로직 예시)
    const checkLoginStatus = () => {
      const hasToken = document.cookie.includes("auth_token");
      setIsLoggedIn(hasToken);
    };

    fetchData();
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: "40px 20px" }}>
      {/* 1. Hero Section */}
      <section style={{ textAlign: "center", marginBottom: "80px", padding: "60px 0" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "24px", color: "var(--text-main)", letterSpacing: "-1.5px" }}>
          순수한 가치를 담은 <br />
          <span style={{ color: "var(--primary)" }}>Pure Text Board</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 48px", lineHeight: "1.8" }}>
          이미지, HTML 없이 오직 텍스트만으로 소통하는 미니멀리즘 커뮤니티입니다. <br />
          비밀글 암호화와 실시간 통계로 투명하고 안전한 게시판을 경험해 보세요.
        </p>

        {/* 2. CTA Buttons (Story 2) - 상단 네비게이션과 중복되지 않는 핵심 액션 강조 */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/posts">
            <button style={{ 
              backgroundColor: "var(--primary)", 
              color: "white", 
              padding: "16px 40px", 
              fontSize: "1.125rem",
              boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)"
            }}>
              게시글 전체 보기
            </button>
          </Link>
          {!isLoggedIn && (
            <Link href="/signup">
              <button style={{ 
                backgroundColor: "white", 
                border: "1px solid var(--border-color)", 
                padding: "16px 40px", 
                fontSize: "1.125rem" 
              }}>
                지금 가입하기
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* 3. Stats Section */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "20px", 
        marginBottom: "80px" 
      }}>
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Total Posts
          </h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--primary)" }}>
            {data?.stats.totalPublicPosts || 0}
          </p>
        </div>
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Total Users
          </h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--primary)" }}>
            {data?.stats.totalUsers || 0}
          </p>
        </div>
      </section>

      {/* 4. Content Previews */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" }}>
        {/* Recent Posts */}
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "25px", borderLeft: "4px solid var(--primary)", paddingLeft: "15px" }}>
            최근 게시물
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {data?.recentPosts.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>등록된 게시글이 없습니다.</p>
            ) : (
              data?.recentPosts.map((post: any) => (
                <Link key={post.id} href={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card" style={{ padding: "20px" }}>
                    <h4 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>{post.title}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      <span>{post.author.name} · 조회 {post.viewCount}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Popular Posts */}
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "25px", borderLeft: "4px solid var(--primary)", paddingLeft: "15px" }}>
            인기 게시물
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {data?.popularPosts.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>인기 게시글이 없습니다.</p>
            ) : (
              data?.popularPosts.map((post: any) => (
                <Link key={post.id} href={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card" style={{ padding: "20px" }}>
                    <h4 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>{post.title}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      <span>{post.author.name} · 조회 {post.viewCount} · 좋아요 {post.likesCount}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
