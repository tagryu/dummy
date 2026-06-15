"use client";

import { useState } from "react";

type Submission = {
  id: string;
  name: string;
  insta: string;
  products: { id: string; name: string }[];
  createdAt: string;
};

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [items, setItems] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/influencer", {
        headers: { "x-admin-password": pw },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "조회 실패");
      setItems(data.submissions);
    } catch (e: any) {
      setError(e?.message || "오류가 발생했습니다.");
      setItems(null);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${String(
      d.getHours()
    ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">TAG</div>
          <div className="nav-links">
            <a href="/">제안 페이지</a>
          </div>
        </div>
      </nav>

      <section style={{ borderTop: "none" }}>
        <div className="wrap">
          <div className="sec-tag">관리자 · 비공개</div>
          <h2 className="sec-title">
            인플루언서 셀렉 제출 내역
            {items && (
              <span className="badge picked">{items.length}건</span>
            )}
          </h2>

          {!items && (
            <div className="admin-login">
              <div className="field">
                <label>관리자 비밀번호</label>
                <input
                  type="password"
                  value={pw}
                  placeholder="비밀번호"
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && load()}
                />
              </div>
              <button className="btn-primary" type="button" onClick={load} disabled={loading || !pw}>
                {loading ? "확인 중…" : "조회하기"}
              </button>
              {error && <p className="submit-err">{error}</p>}
            </div>
          )}

          {items && items.length === 0 && (
            <p className="sec-desc" style={{ marginTop: 24 }}>
              아직 제출된 내역이 없습니다.
            </p>
          )}

          {items && items.length > 0 && (
            <div className="admin-list">
              {items.map((s) => (
                <div className="admin-item" key={s.id}>
                  <div className="admin-head">
                    <div>
                      <b className="admin-name">{s.name}</b>
                      <span className="admin-insta">{s.insta}</span>
                    </div>
                    <span className="admin-date">{fmt(s.createdAt)}</span>
                  </div>
                  <div className="admin-prod-count">
                    선택 상품 {s.products.length}개
                  </div>
                  <div className="ss-chips">
                    {s.products.map((p) => (
                      <span className="ss-chip" key={p.id} style={{ paddingRight: 12 }}>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
