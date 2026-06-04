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
        evidence(3001, "카메라와 편집 도구의 초기 창작성을 둘러싼 논쟁", "EXAMPLE", T.s30),
        evidence(3002, "창작 과정에서 인간의 선택과 수정이 결과물의 방향을 결정", "QUOTATION", T.s30),
      ],
    ),
    claim(
      2002,
      "AI 결과물은 인간 창작과 동일하지 않음",
      "CONS",
      T.s30,
      [
        evidence(3003, "생성 과정의 세부 판단은 모델 내부에서 자동화된다", "STATISTICS", T.s30),
        evidence(3004, "유사한 프롬프트에서도 예측하기 어려운 결과가 나올 수 있다", "EXAMPLE", T.s30),
      ],
    ),
  ];
}

function creativitySubjectivityClaimsStage5(): Claim[] {
  return [
    claim(
      2001,
      "AI는 인간 의도를 확장하는 창작 도구이다",
      "PROS",
      T.s50,
      [
        evidence(3001, "카메라와 편집 도구의 초기 창작성을 둘러싼 논쟁", "EXAMPLE", T.s50),
        evidence(3002, "창작 과정에서 인간의 선택과 수정이 결과물의 방향을 결정한다", "QUOTATION", T.s50),
      ],
    ),
    claim(
      2002,
      "AI 결과물은 인간 창작과 동일하지 않다",
      "CONS",
      T.s50,
      [
        evidence(3003, "생성 과정의 세부 판단은 모델 내부에서 자동화되는 경우가 많다", "STATISTICS", T.s50),
        evidence(3004, "유사한 프롬프트에서도 예측하기 어려운 결과가 생성될 가능성이 있다", "EXAMPLE", T.s50),
      ],
    ),
  ];
}

function copyrightAgendaStage5(): Agenda {
  return agenda(1002, "저작권과 학습 데이터", T.s50, [
    claim(
      2005,
      "학습 데이터 사용에는 투명한 출처 공개가 필요하다",
      "PROS",
      T.s50,
      [
        evidence(
          3005,
          "미공개 학습 데이터를 둘러싼 소송·분쟁이 여러 플랫폼에서 제기되었다",
          "EXAMPLE",
          T.s50,
        ),
      ],
    ),
    claim(
      2006,
      "기술 발전을 위해 합리적인 학습 데이터 예외를 인정해야 한다",
      "CONS",
      T.s50,
      [evidence(3006, "과도한 규제는 모델 개발·배포 비용을 크게 늘릴 수 있다", "STATISTICS", T.s50)],
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
      "결과 선택과 수정 과정도 창작 행위이다",
      "PROS",
      T.s60,
      [evidence(3007, "프롬프트 수정과 결과 선별은 사용자의 의도를 반영한다", "EXAMPLE", T.s60)],
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
          [evidence(3001, "카메라·편집 도구 도입 초기에도 창작성 논쟁이 있었다", "EXAMPLE", T.s20)],
        ),
      ]),
    ],
    [agenda(1001, "창작 주체성", T.s30, stage3Claims)],
    [
      agenda(1001, "창작 주체성", T.s40, stage3Claims),
      agenda(1002, "저작권과 학습 데이터", T.s40, [
        claim(
          2005,
          "학습 데이터 사용에는 투명한 출처 공개가 필요하다",
          "PROS",
          T.s40,
          [evidence(3005, "미공개 학습 데이터 논란이 다수 플랫폼에서 제기됨", "EXAMPLE", T.s40)],
        ),
        claim(
          2006,
          "기술 발전을 위해 학습 데이터 예외를 인정해야 한다",
          "CONS",
          T.s40,
          [evidence(3006, "과도한 규제는 모델 개발 비용을 크게 늘린다", "STATISTICS", T.s40)],
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
          "생성형 AI는 창작자의 새로운 협업 파트너가 될 수 있다",
          "PROS",
          T.s70,
          [evidence(3008, "일부 스튜디오는 AI 보조 워크플로로 제작 기간을 단축했다", "EXAMPLE", T.s70)],
        ),
        claim(
          2008,
          "저작권·보상 구조가 불명확해 산업 전반의 불안이 커지고 있다",
          "CONS",
          T.s80,
          [
            evidence(
              3009,
              "저작자의 의도와 산출물 사이의 직접성이 약화될 수 있다",
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
