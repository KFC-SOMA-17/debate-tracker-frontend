export function truncateAgendaTabLabel(content: string | undefined, maxLength = 12): string {
  const text = content?.trim() || "쟁점";
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}…`;
}
