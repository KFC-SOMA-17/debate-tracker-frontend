import type { Agenda, Claim, DebateAgendasResponse, Evidence } from "@/features/issueSummary/types/agendaSummary";

/** 폴링 단계 0~7 (8회). 이후 요청은 7단계 응답 유지. */
export const AGENDA_SUMMARY_MAX_STAGE = 7;

const T = {
  s0: "2026-06-04T22:15:30",
  s10: "2026-06-04T22:15:40",
  s20: "2026-06-04T22:15:50",
  s30: "2026-06-04T22:16:00",
  s40: "2026-06-04T22:16:10",
  s50: "2026-06-04T22:16:20",
  s60: "2026-06-04T22:16:30",
  s70: "2026-06-04T22:16:40",
  s80: "2026-06-04T22:16:50",
} as const;

function evidence(
  evidenceId: number,
  content: string,
  type: Evidence["type"],
  modifiedAt: string,
): Evidence {
  return {
    evidenceId,
    content,
    type,
    createdAt: T.s0,
    modifiedAt,
  };
}

function claim(
  claimId: number,
  content: string,
  stance: Claim["stance"],
  modifiedAt: string,
  evidences: Evidence[],
): Claim {
  return {
    claimId,
    content,
    stance,
    createdAt: T.s0,
    modifiedAt,
    evidences,
  };
}

function agenda(agendaId: number, content: string, modifiedAt: string, claims: Claim[]): Agenda {
  return {
    agendaId,
    content,
    createdAt: T.s0,
    modifiedAt,
    claims,
  };
}

function creativitySubjectivityClaimsStage3(): Claim[] {
  return [
    claim(
      2001,
      "AI는 인간 의도를 확장하는 창작 도구",
      "PROS",
      T.s30,
      [
        evidence(3001, "카메라·편집 도구 도입 초기의 창작성 논쟁", "EXAMPLE", T.s30),
        evidence(3002, "인간 선택·수정에 따른 결과물 방향 결정", "QUOTATION", T.s30),
      ],
    ),
    claim(
      2002,
      "AI 결과물과 인간 창작의 비동일성",
      "CONS",
      T.s30,
      [
        evidence(3003, "모델 내부에서의 세부 판단 자동화", "STATISTICS", T.s30),
        evidence(3004, "유사 프롬프트 대비 결과 예측 난이도", "EXAMPLE", T.s30),
      ],
    ),
  ];
}

function creativitySubjectivityClaimsStage5(): Claim[] {
  return [
    claim(
      2001,
      "AI는 인간 의도를 확장하는 창작 도구",
      "PROS",
      T.s50,
      [
        evidence(3001, "카메라·편집 도구 도입 초기의 창작성 논쟁", "EXAMPLE", T.s50),
        evidence(3002, "인간 선택·수정에 따른 결과물 방향 결정", "QUOTATION", T.s50),
      ],
    ),
    claim(
      2002,
      "AI 결과물과 인간 창작의 비동일성",
      "CONS",
      T.s50,
      [
        evidence(3003, "모델 내부에서의 세부 판단 자동화", "STATISTICS", T.s50),
        evidence(3004, "유사 프롬프트 대비 결과 변동성", "EXAMPLE", T.s50),
      ],
    ),
  ];
}

function copyrightAgendaStage5(): Agenda {
  return agenda(1002, "저작권과 학습 데이터", T.s50, [
    claim(
      2005,
      "학습 데이터 사용 시 투명한 출처 공개 필요",
      "PROS",
      T.s50,
      [
        evidence(
          3005,
          "미공개 학습 데이터 관련 소송·분쟁의 다수 플랫폼 제기",
          "EXAMPLE",
          T.s50,
        ),
      ],
    ),
    claim(
      2006,
      "기술 발전을 위한 합리적 학습 데이터 예외 인정",
      "CONS",
      T.s50,
      [evidence(3006, "과도한 규제에 따른 모델 개발·배포 비용 증가", "STATISTICS", T.s50)],
    ),
  ]);
}

function buildStageAgendas(): Agenda[][] {
  const stage3Claims = creativitySubjectivityClaimsStage3();
  const stage5Claims = creativitySubjectivityClaimsStage5();
  const stage5Agenda2 = copyrightAgendaStage5();

  const stage6Claims: Claim[] = [
    ...stage5Claims,
    claim(
      2003,
      "결과 선택·수정 과정의 창작 행위성",
      "PROS",
      T.s60,
      [evidence(3007, "프롬프트 수정·결과 선별에 따른 사용자 의도 반영", "EXAMPLE", T.s60)],
    ),
  ];

  return [
    [],
    [agenda(1001, "쟁점 추출 중…", T.s10, [])],
    [
      agenda(1001, "창작 주체성", T.s20, [
        claim(
          2001,
          "AI는 인간 의도를 확장하는 창작 도구",
          "PROS",
          T.s20,
          [evidence(3001, "카메라·편집 도구 도입 초기의 창작성 논쟁", "EXAMPLE", T.s20)],
        ),
      ]),
    ],
    [agenda(1001, "창작 주체성", T.s30, stage3Claims)],
    [
      agenda(1001, "창작 주체성", T.s40, stage3Claims),
      agenda(1002, "저작권과 학습 데이터", T.s40, [
        claim(
          2005,
          "학습 데이터 사용 시 투명한 출처 공개 필요",
          "PROS",
          T.s40,
          [evidence(3005, "미공개 학습 데이터 관련 플랫폼 논란", "EXAMPLE", T.s40)],
        ),
        claim(
          2006,
          "기술 발전을 위한 학습 데이터 예외 인정",
          "CONS",
          T.s40,
          [evidence(3006, "과도한 규제에 따른 모델 개발 비용 증가", "STATISTICS", T.s40)],
        ),
      ]),
    ],
    [agenda(1001, "창작 주체성", T.s50, stage5Claims), stage5Agenda2],
    [agenda(1001, "창작 주체성", T.s60, stage6Claims), { ...stage5Agenda2, modifiedAt: T.s60 }],
    [
      agenda(1001, "창작 주체성", T.s70, stage6Claims),
      { ...stage5Agenda2, modifiedAt: T.s70 },
      agenda(1003, "창작 산업 영향", T.s70, [
        claim(
          2007,
          "생성형 AI의 창작자 협업 파트너 가능성",
          "PROS",
          T.s70,
          [evidence(3008, "AI 보조 워크플로를 통한 스튜디오 제작 기간 단축 사례", "EXAMPLE", T.s70)],
        ),
        claim(
          2008,
          "저작권·보상 구조 불명확성에 따른 산업 불안",
          "CONS",
          T.s80,
          [
            evidence(
              3009,
              "저작자 의도와 산출물 간 직접성 약화",
              "QUOTATION",
              T.s80,
            ),
          ],
        ),
      ]),
    ],
  ];
}

const STAGE_AGENDAS = buildStageAgendas();

export function buildAgendaSummaryStage(debateId: number, stage: number): DebateAgendasResponse {
  const clamped = Math.max(0, Math.min(stage, AGENDA_SUMMARY_MAX_STAGE));
  return {
    debateId,
    agendas: STAGE_AGENDAS[clamped] ?? [],
  };
}
