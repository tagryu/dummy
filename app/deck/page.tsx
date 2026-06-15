"use client";

import { useMemo, useState } from "react";

/* ====================== 데이터 ====================== */

type Ev = { label: string; cls: string };
const EVENTS: Record<string, Ev[]> = {};
const add = (days: string[], ev: Ev) =>
  days.forEach((d) => (EVENTS[d] = [...(EVENTS[d] || []), ev]));

const range = (m: number, a: number, b: number) =>
  Array.from({ length: b - a + 1 }, (_, i) => `2026-${String(m).padStart(2, "0")}-${String(a + i).padStart(2, "0")}`);

add([...range(5, 25, 31), ...range(6, 1, 3)], { label: "UI/UX 개선 · 온보딩 · 어드민 정비", cls: "p-ui" });
add(["2026-06-01"], { label: "대행사 미팅", cls: "p-mkt" });
add(range(6, 4, 5), { label: "샘플 수령(일부)", cls: "p-sample" });
add(range(6, 8, 9), { label: "협찬·촬영·업로드", cls: "p-inf" });
add(range(6, 8, 14), { label: "사전 광고 30만원", cls: "p-ad" });
add(["2026-06-15"], { label: "🚀 인플루언서 게시 · 광고 본격", cls: "p-launch" });

const TODAY = "2026-05-27";
const LAUNCH = "2026-06-15";

const SCENARIOS = [
  { hook: "OOTD로 돈 버는 사람?", target: "인스타에 데일리룩 올리는 2030", msg: "어차피 올리는 코디 사진, 태그만 하면 판매 시 20% 수익", cta: "셀러 시작하기" },
  { hook: "게시물만 올리면 20% 수익이?", target: "부업·N잡 관심층", msg: "팔로워 적어도 OK. 사업자·재고·CS 없이 게시물 → 정산", cta: "수익 구조 보기" },
  { hook: "재고를 쌓지 않아도 셀러가 된다고?", target: "창업 관심 / 재고·자금 부담층", msg: "재고 0원·사입 0원. 배송은 우리가, 당신은 콘텐츠만", cta: "무재고로 시작" },
  { hook: "내 사진이 모델컷이 된다고?", target: "감성 콘텐츠 크리에이터", msg: "내 코디 사진이 상품 페이지 실착 컷이 되고, 그게 수익으로", cta: "내 룩 올리기" },
];

const CHECKS = [
  { ic: "🚚", title: "배송 주체", body: "도매에서 바로 배송하는 구조인지, 남도마켓을 거쳐 배송되는 구조인지.", q: "도매 직배송 vs 남도 경유 + 배송비 단가 확인" },
  { ic: "🖼️", title: "상품 사진 확보", body: "신상마켓에서 셀렉한 상품 이미지는 워터마크 존재.", q: "워터마크 없는 원본 제공 가능 여부 / 자체 촬영 범위 합의" },
  { ic: "🏷️", title: "판매가 배수", body: "도매가의 2.1~2.2배 책정 시 TAG 순수익 20% 확보. (배송비 고객 부담 전제)", q: "단일 2배 vs 카테고리별 1.8~2.2배 차등" },
  { ic: "📦", title: "배송 상태 입력 주체", body: "1번(배송 주체)과 연결. 송장·배송완료 입력 시점이 정산(구매확정) 시점과 직결.", q: "송장 / 배송상태 입력 주체(도매 / 남도 / TAG)" },
];

/* ====================== 페이지 ====================== */

export default function Page() {
  const [k, setK] = useState(2.1);
  const [W, setW] = useState(10000);
  const [pgRate, setPgRate] = useState(3.6);

  const calc = useMemo(() => {
    const price = Math.round(W * k);
    const pg = Math.round(price * (pgRate / 100));
    const nam = Math.round(price * 0.1);
    const user = Math.round(price * 0.2);
    const dome = W;
    const tag = price - pg - nam - user - dome;
    const pct = (n: number) => (price ? (n / price) * 100 : 0);
    return { price, pg, nam, user, dome, tag, pct, tagPct: pct(tag) };
  }, [k, W, pgRate]);

  const won = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            TAG <span>×</span> 남도마켓
          </div>
          <div className="nav-links">
            <a href="#revenue">수익구조</a>
            <a href="#settle">정산</a>
            <a href="#calendar">런칭 일정</a>
            <a href="#marketing">마케팅</a>
            <a href="#checklist">체크리스트</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">● 협업 미팅 자료 · 2026.05.27</span>
          <h1>
            <span className="grad">TAG × 남도마켓</span>
            <br />
            협업 런칭 플랜
          </h1>
          <p className="sub">
            남도마켓이 연결한 의류 도매처를 TAG 플랫폼에 입점, 6월 15일 정식 오픈 목표.
            본 자료는 수익 구조 · 정산 · 일정 · 마케팅 · 협의 안건을 정리한 회의 자료.
          </p>
          <div className="dday">
            <div className="box">
              <div className="k">목표 오픈</div>
              <div className="v">6.15 <small>월</small></div>
            </div>
            <div className="box">
              <div className="k">D-DAY</div>
              <div className="v">D-19</div>
            </div>
            <div className="box">
              <div className="k">수익 분배(셀러)</div>
              <div className="v">20<small>%</small></div>
            </div>
            <div className="box">
              <div className="k">남도 수익</div>
              <div className="v">10<small>%</small></div>
            </div>
          </div>
        </div>
      </header>

      {/* REVENUE */}
      <section id="revenue">
        <div className="wrap">
          <div className="sec-tag">수익 · 가격 구조</div>
          <h2 className="sec-title">수익구조</h2>
          <p className="sec-desc">
            남도 10% + 셀러 20% 분배 후에도 <b>TAG 순수익 약 20%</b> 확보 기준,
            <b> PG수수료 3.6%</b>와 도매원가 감안 시 <b>도매가의 약 2.1~2.2배</b>가 적정.
            (배송비 고객 부담 전제)
          </p>

          <div className="calc">
            {/* left: controls */}
            <div className="control">
              <label>판매가 배수 (도매가 × ?)</label>
              <div className="mult">
                {k.toFixed(2)}<span>배</span>
              </div>
              <input
                type="range" min={1.8} max={2.2} step={0.05} value={k}
                onChange={(e) => setK(parseFloat(e.target.value))}
              />
              <div className="range-labels">
                <span>1.8배</span><span>2.0배</span><span>2.2배</span>
              </div>

              <div className="field">
                <label>도매원가 (원)</label>
                <input type="number" value={W} step={1000}
                  onChange={(e) => setW(Math.max(0, parseInt(e.target.value || "0")))} />
              </div>
              <div className="field">
                <label>PG 결제수수료 · 기본 3.6% (%)</label>
                <input type="number" value={pgRate} step={0.1}
                  onChange={(e) => setPgRate(Math.max(0, parseFloat(e.target.value || "0")))} />
              </div>

              <div className="tag-net">
                <div className="lab">TAG 순수익 (PG·정산 비용 차감 후)</div>
                <div className={"num" + (calc.tagPct < 18 ? " bad" : "")}>
                  {won(calc.tag)} · {calc.tagPct.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* right: breakdown */}
            <div>
              <div style={{ fontSize: 13, color: "var(--dim)" }}>판매가</div>
              <div style={{ fontSize: 34, fontWeight: 850, letterSpacing: "-0.02em" }}>
                {won(calc.price)}
              </div>

              <div className="bar">
                <div className="seg-dome" style={{ width: calc.pct(calc.dome) + "%" }}>도매</div>
                <div className="seg-tag" style={{ width: calc.pct(calc.tag) + "%" }}>TAG</div>
                <div className="seg-nam" style={{ width: calc.pct(calc.nam) + "%" }}>남도</div>
                <div className="seg-user" style={{ width: calc.pct(calc.user) + "%" }}>셀러</div>
                <div className="seg-pg" style={{ width: calc.pct(calc.pg) + "%" }}>PG</div>
              </div>
              <div className="legend">
                <span><i style={{ background: "#52525b" }} />도매원가</span>
                <span><i style={{ background: "var(--accent-2)" }} />TAG 순수익</span>
                <span><i style={{ background: "var(--accent)" }} />남도 10%</span>
                <span><i style={{ background: "var(--pink)" }} />셀러 20%</span>
                <span><i style={{ background: "var(--warn)" }} />PG수수료</span>
              </div>

              <div className="breakdown">
                <div className="row"><span>도매원가</span><b>{won(calc.dome)} <span className="muted">({calc.pct(calc.dome).toFixed(0)}%)</span></b></div>
                <div className="row"><span>셀러(사용자) 20%</span><b>{won(calc.user)}</b></div>
                <div className="row"><span>남도마켓 10%</span><b>{won(calc.nam)}</b></div>
                <div className="row"><span>PG 결제수수료 {pgRate}%</span><b>{won(calc.pg)}</b></div>
                <div className="row"><span>TAG 순수익</span><b style={{ color: "var(--accent-2)" }}>{won(calc.tag)} ({calc.tagPct.toFixed(1)}%)</b></div>
              </div>
            </div>
          </div>

          <div className="note">
            <b>요점:</b> 기존 "도매 50 + TAG 20 + 남도 10 + 셀러 20" 구조는 PG수수료(3.6%)와
            배송비가 빠져 있어, 2배 책정 시 TAG 실수령은 약 13% 수준. <b>2.1~2.2배</b>로
            조정하면 모든 비용을 흡수하고도 TAG 20% 확보 가능. 무료배송(자사 부담) 구조는
            약 2.77배까지 상승해 가격 경쟁력을 잃으므로 <b>배송비 고객 부담</b>을 권장.
            남도 10%가 <b>PG 차감 전 매출 기준인지</b>는 본 미팅에서 확정 필요.
          </div>
        </div>
      </section>

      {/* SETTLEMENT */}
      <section id="settle">
        <div className="wrap">
          <div className="sec-tag">정산 방식</div>
          <h2 className="sec-title">출금 신청형 정산</h2>
          <p className="sec-desc">
            셀러·파트너 정산은 자동 주기가 아닌 <b>출금 신청형</b>으로 운영. 적립된 수익을
            사용자가 신청하면, 운영팀 검토 후 계좌로 직접 송금.
          </p>
          <div className="grid g3">
            <div className="card">
              <h3>1 · 수익 적립</h3>
              <p>판매 건이 구매확정되면 셀러 계정에 20% 수익 적립.</p>
            </div>
            <div className="card">
              <h3>2 · 출금 신청</h3>
              <p>셀러가 원하는 시점에 출금 신청. 최소 출금 금액 · 검토 기간 정책 필요.</p>
            </div>
            <div className="card">
              <h3>3 · 직접 송금</h3>
              <p>운영팀이 신청 건을 확인 후 계좌로 송금. 환불 · 반품 건은 정산에서 제외.</p>
            </div>
          </div>
          <div className="note">
            <b>확정 필요 항목:</b> 최소 출금 금액, 신청 후 송금까지 처리 기간, 환불·반품에 따른
            정산 회수(클로백) 처리 방식, 정산 명세 제공 방법.
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section id="calendar">
        <div className="wrap">
          <div className="sec-tag">런칭 일정</div>
          <h2 className="sec-title">5월 25일 → 6월 15일 오픈</h2>
          <p className="sec-desc">UI/UX 개선부터 오픈일 인플루언서 게시까지의 주요 일정.</p>

          <Calendar month={5} year={2026} />
          <Calendar month={6} year={2026} />

          <div className="timeline">
            <TL date="5.25 – 6.3" sub="9일간" t="UI/UX 개선 · 온보딩 · 어드민 정비" d="첫 사용자 경험 정비, 신규 셀러 온보딩 플로우 구축, 운영 어드민 정비." cls="p-ui" />
            <TL date="6.1" sub="월" t="마케팅 대행사 미팅" d="광고 운영 · 소재 제작 파트너 미팅." cls="p-mkt" />
            <TL date="6.4 – 6.5" sub="목–금" t="샘플 수령 (일부)" d="입점 도매 상품 샘플 수령, 품질 · 촬영 검토." cls="p-sample" />
            <TL date="6.8 – 6.9" sub="월–화" t="인플루언서 협찬 · 촬영 · 업로드" d="협찬 제품 발송, 콘텐츠 촬영 및 TAG 플랫폼 업로드." cls="p-inf" />
            <TL date="6.8 – 6.14" sub="7일간" t="사전 인스타그램 광고 (30만원)" d="시나리오 4종 소액 A/B 테스트로 반응 좋은 소재 선별." cls="p-ad" />
            <TL date="6.15" sub="월 · 오픈" t="인플루언서 게시 + 광고 본격 집행" d="인스타 피드 · 스토리 업로드, 광고 일 15만원으로 약 30일 집행." cls="p-launch" />
          </div>
        </div>
      </section>

      {/* MARKETING */}
      <section id="marketing">
        <div className="wrap">
          <div className="sec-tag">마케팅</div>
          <h2 className="sec-title">마케팅 전략</h2>

          <ol className="num-list">
            <li>
              <span className="num">1</span>
              <div className="num-body">
                <h3>인플루언서 협찬</h3>
                <p>
                  3~10만 팔로워 마이크로 인플루언서를 <b>현물 협찬 + 본인 판매 20% 수익</b> 구조로
                  묶음. 피드 본문 링크 불가 → <b>프로필 링크 클릭</b> CTA, <b>스토리 링크 스티커</b>
                  필수 포함. 인플루언서별 고유 추적 링크로 성과 측정.
                </p>
              </div>
            </li>

            <li>
              <span className="num">2</span>
              <div className="num-body">
                <h3>마케팅 시나리오 광고</h3>
                <p>
                  사전(6/8~14) 30만원 테스트 → 오픈 후 일 15만원 × 30일 ≈ <b>약 450만원</b>.
                  시나리오 4종을 영상 + 이미지 8개로 시작, 1주 후 상위 2~3개에 예산 집중.
                </p>

                <h4 className="sub-title">인스타그램 콘텐츠 광고</h4>
                <ol className="num-list nested">
                  {SCENARIOS.map((s, i) => (
                    <li key={i}>
                      <span className="num">{i + 1}</span>
                      <div className="num-body">
                        <div className="hook">“{s.hook}”</div>
                        <div className="meta"><b>타겟</b> · {s.target}</div>
                        <div className="meta"><b>메시지</b> · {s.msg}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CHECKLIST */}
      <section id="checklist">
        <div className="wrap">
          <div className="sec-tag">미팅 체크리스트</div>
          <h2 className="sec-title">체크 사항<span className="badge todo">협의 안건</span></h2>
          <div className="check">
            {CHECKS.map((c, i) => (
              <div className="item" key={i}>
                <div className="ic">{c.ic}</div>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                  <p className="q">→ {c.q}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="note">
            <b>오늘 결론 낼 3가지:</b> ① 판매가 배수(2배 단일 vs 1.8~2.2 차등) + 배송비 부담 주체,
            ② 남도 10%의 기준(매출 vs PG 차감 후), ③ 배송 주체와 배송상태 입력 책임.
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          TAG × 남도마켓 협업 미팅 자료 · 2026.05.27 · tags.kr / app.tags.kr
        </div>
      </footer>
    </>
  );
}

/* ====================== 컴포넌트 ====================== */

function TL({ date, sub, t, d, cls }: { date: string; sub: string; t: string; d: string; cls: string }) {
  return (
    <div className="tl-item">
      <div className="tl-date">
        {date}
        <small>{sub}</small>
      </div>
      <div className="tl-body">
        <h4>
          <span className={"pill " + cls} style={{ display: "inline-block", padding: "1px 9px", margin: "0 8px 0 0", fontSize: 11 }}>일정</span>
          {t}
        </h4>
        <p>{d}</p>
      </div>
    </div>
  );
}

function Calendar({ month, year }: { month: number; year: number }) {
  const first = new Date(year, month - 1, 1);
  const startDay = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const heads = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="cal">
      <div className="cal-month">{year}년 {month}월</div>
      <div className="cal-grid">
        {heads.map((h) => (
          <div className="cal-head" key={h}>{h}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div className="cal-cell empty" key={i} />;
          const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const evs = EVENTS[key] || [];
          const isToday = key === TODAY;
          const isLaunch = key === LAUNCH;
          return (
            <div className={"cal-cell" + (evs.length ? " has" : "") + (isToday ? " today" : "") + (isLaunch ? " launch" : "")} key={i}>
              <div className="d">{d}{isToday ? " ·오늘" : ""}</div>
              {evs.map((e, j) => (
                <span className={"pill " + e.cls} key={j} title={e.label}>{e.label}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
