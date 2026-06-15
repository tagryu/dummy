"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "./products";

/* ====================== 데이터 ====================== */

const BENEFITS = [
  {
    ic: "🎁",
    title: "초기 세팅 상품 무상 제공",
    body: "협업 시작 시 셀렉한 초기 세팅 상품을 무상으로 제공해 드립니다.",
  },
  {
    ic: "📦",
    title: "1년간 상품 무상 제공",
    body: "게시물 업로드 시 1년간 상품을 무상 제공 (월 최대 10회).",
  },
  {
    ic: "🚀",
    title: "메인페이지 상단 노출",
    body: "협업 인플루언서는 앱 메인페이지 상단에 우선 노출됩니다.",
  },
];

/* 상품 데이터는 ./products.ts 에서 자동 생성 (public/assets 스캔) */

/* ====================== 페이지 ====================== */

export default function Page() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectedProducts = useMemo(
    () => PRODUCTS.filter((p) => selected.has(p.id)),
    [selected]
  );

  const canSubmit = selected.size > 0 && name.trim();

  const submit = async () => {
    if (!canSubmit || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/influencer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          products: selectedProducts.map((p) => ({ id: p.id, name: p.name })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "제출에 실패했습니다.");
      setDone(true);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e?.message || "제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">TAG</div>
          <div className="nav-links">
            <a href="#benefits">혜택</a>
            <a href="#products">상품 셀렉</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">● 인플루언서 협업 제안</span>
          <h1>
            <span className="grad">태그하고 싶은 상품</span>
            <br />
            을 직접 골라보세요
          </h1>
          <p className="sub">
            TAG가 인플루언서님과 함께합니다. 아래 혜택을 확인하고, 본인과 가장
            잘 어울린다고 느끼는 상품들을 자유롭게 셀렉해 주세요.
          </p>
        </div>
      </header>

      {/* BENEFITS */}
      <section id="benefits">
        <div className="wrap">
          <div className="sec-tag">협업 혜택</div>
          <h2 className="sec-title">인플루언서님께 드리는 혜택</h2>
          <p className="sec-desc">
            함께하는 인플루언서님께 아래 세 가지 혜택을 제공합니다.
          </p>

          <div className="benefits">
            {BENEFITS.map((b, i) => (
              <div className="benefit-card" key={i}>
                <div className="benefit-ic">{b.ic}</div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>

          <p className="benefit-promise">
            초기에 TAG를 믿고 함께해주신 인플루언서분들을 위해, 저희도
            노력하겠습니다. 추가로 드릴 수 있는 혜택도 꾸준히 고민하겠습니다.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="wrap">
          <div className="sec-tag">상품 셀렉</div>
          <h2 className="sec-title">
            나와 어울리는 상품 고르기
            {selected.size > 0 && (
              <span className="badge picked">{selected.size}개 선택</span>
            )}
          </h2>
          <p className="sec-desc">
            마음에 드는, 본인의 무드와 어울린다고 느끼는 상품을 모두 선택해
            주세요. 카드를 누르면 선택/해제됩니다.
          </p>

          <div className="prod-grid">
            {PRODUCTS.map((p) => {
              const on = selected.has(p.id);
              return (
                <button
                  type="button"
                  key={p.id}
                  className={"prod-card" + (on ? " on" : "")}
                  onClick={() => toggle(p.id)}
                  aria-pressed={on}
                >
                  <div className="prod-thumb">
                    {p.imgs[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imgs[0]}
                        alt={p.name}
                        loading="lazy"
                        className="img-main"
                      />
                    ) : (
                      <span className="prod-ph">이미지 준비중</span>
                    )}
                    {p.imgs[1] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imgs[1]}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="img-hover"
                      />
                    )}
                    <span className="prod-check">✓</span>
                  </div>
                  <div className="prod-name">{p.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBMIT */}
      <section id="submit">
        <div className="wrap">
          <div className="sec-tag">셀렉 제출</div>
          <h2 className="sec-title">선택한 상품 제출하기</h2>

          {done ? (
            <div className="submit-done">
              <div className="done-ic">✓</div>
              <h3>제출이 완료되었습니다</h3>
              <p>
                {name}님, 총 <b>{selectedProducts.length}개</b>의 상품을 셀렉해
                주셔서 감사합니다.
              </p>
              <button
                className="btn-ghost"
                type="button"
                onClick={() => setDone(false)}
              >
                다시 수정하기
              </button>
            </div>
          ) : (
            <div className="submit-box">
              <div className="submit-summary">
                <div className="ss-label">선택한 상품</div>
                {selectedProducts.length === 0 ? (
                  <p className="ss-empty">아직 선택한 상품이 없습니다.</p>
                ) : (
                  <div className="ss-chips">
                    {selectedProducts.map((p) => (
                      <span className="ss-chip" key={p.id}>
                        {p.name}
                        <button
                          type="button"
                          aria-label="선택 해제"
                          onClick={() => toggle(p.id)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="submit-form">
                <div className="field">
                  <label>이름</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="성함을 입력해 주세요"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button
                  className="btn-primary"
                  type="button"
                  disabled={!canSubmit || sending}
                  onClick={submit}
                >
                  {sending
                    ? "제출 중…"
                    : `${selected.size}개 상품 셀렉 제출하기`}
                </button>
                {error && <p className="submit-err">{error}</p>}
                {!canSubmit && !error && (
                  <p className="submit-hint">
                    상품 1개 이상 선택 후 이름을 입력하면 제출할 수 있어요.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 모바일 하단 고정 바 */}
      {!done && selected.size > 0 && (
        <div className="select-bar">
          <span>
            <b>{selected.size}개</b> 선택됨
          </span>
          <a href="#submit" className="bar-cta">
            제출하러 가기 →
          </a>
        </div>
      )}

      <footer>
        <div className="wrap">
          TAG · 인플루언서 협업 · tags.kr / app.tags.kr
        </div>
      </footer>
    </>
  );
}
