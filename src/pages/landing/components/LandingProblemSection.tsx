import { ProblemInner, ProblemSection } from "./LandingProblemSection.styles";
import { LANDING_PROBLEM_ITEMS } from "../landingContent";
import { LandingCardGrid, LandingInfoCard, LandingSectionHeader } from "./LandingShared";

export function LandingProblemSection() {
  return (
    <ProblemSection>
      <ProblemInner>
        <LandingSectionHeader
          label="Problem"
          title="기존 토론의 한계"
          description="대학생 토론 참여는 늘고 있지만, 실력 향상을 위한 체계적인 도구가 없었습니다."
        />
        <LandingCardGrid>
          {LANDING_PROBLEM_ITEMS.map((item) => (
            <LandingInfoCard
              key={item.title}
              variant="muted"
              icon={<span aria-hidden>{item.icon}</span>}
              title={item.title}
              description={item.description}
            />
          ))}
        </LandingCardGrid>
      </ProblemInner>
    </ProblemSection>
  );
}
