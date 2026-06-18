import { LogoIcon } from "@/shared/ui/icons";
import { IconSlot } from "@/shared/ui/icons/IconSlot";
import { theme } from "@/styles/theme";
import {
  FooterBrand,
  FooterBrandName,
  FooterInner,
  FooterRoot,
  FooterTagline,
} from "./LandingFooter.styles";

export function LandingFooter() {
  return (
    <FooterRoot>
      <FooterInner>
        <FooterBrand>
          <IconSlot $size={theme.spacing[6]}>
            <LogoIcon aria-hidden />
          </IconSlot>
          <FooterBrandName>Debate Tracker</FooterBrandName>
        </FooterBrand>
        <FooterTagline>AI 기반 토론 실시간 요약·분석 서비스</FooterTagline>
      </FooterInner>
    </FooterRoot>
  );
}
