import type { ReactNode } from "react";
import { Card, Footer, Header } from "./SetupStepCard.styles";

interface SetupStepCardProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  className?: string;
}

export function SetupStepCard({ header, children, footer, className }: SetupStepCardProps) {
  return (
    <Card className={className}>
      <Header>{header}</Header>
      <div>{children}</div>
      <Footer>{footer}</Footer>
    </Card>
  );
}
