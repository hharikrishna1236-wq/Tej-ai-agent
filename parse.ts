export type Segment =
  | { type: "text"; value: string }
  | { type: "code"; value: string; language: string };

/** Splits message text into plain text and fenced code blocks. */
export function parseContent(content: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /```(\w*)\n([\s\S]*?)```/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    if (match.index > last) segments.push({ type: "text", value: content.slice(last, match.index).trim() });
    segments.push({ type: "code", language: match[1] || "text", value: match[2].replace(/\n$/, "") });
    last = match.index + match[0].length;
  }
  if (last < content.length) segments.push({ type: "text", value: content.slice(last).trim() });
  return segments.filter((s) => s.value.length > 0);
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
