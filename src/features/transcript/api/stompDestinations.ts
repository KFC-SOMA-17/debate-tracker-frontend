export function debateTopicDestination(debateId: number): string {
  return `/topic/debate/${debateId}`;
}

export function debateStartDestination(debateId: number): string {
  return `/app/debate/${debateId}/start`;
}

export function debateStopDestination(debateId: number): string {
  return `/app/debate/${debateId}/stop`;
}

export function debateAudioDestination(debateId: number): string {
  return `/app/debate/${debateId}/audio`;
}
