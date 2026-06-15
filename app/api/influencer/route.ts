import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// 관리자 조회 비밀번호 (DB RPC와 동일해야 함). 변경 시 양쪽 모두 수정.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "namdo2026";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 인플루언서가 셀렉을 제출
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }

  const name = String(body?.name || "").trim();
  const insta = String(body?.insta || "").trim();
  const products = Array.isArray(body?.products) ? body.products : [];

  if (!name || products.length === 0) {
    return NextResponse.json(
      { ok: false, error: "이름과 상품을 1개 이상 선택해 주세요." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("influencer_submissions").insert({
    name,
    insta,
    products: products.map((p: any) => ({
      id: String(p?.id || ""),
      name: String(p?.name || ""),
    })),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "저장에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

// 관리자(나)만 조회 — 비밀번호 필요 (DB의 SECURITY DEFINER 함수로 RLS 우회)
export async function GET(req: NextRequest) {
  const pw =
    req.headers.get("x-admin-password") ||
    req.nextUrl.searchParams.get("pw") ||
    "";
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "비밀번호 오류" }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("admin_get_submissions", {
    p_pw: pw,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "조회에 실패했습니다." },
      { status: 500 }
    );
  }

  const submissions = (data || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    insta: r.insta,
    products: r.products,
    createdAt: r.created_at,
  }));

  return NextResponse.json({ ok: true, submissions });
}
