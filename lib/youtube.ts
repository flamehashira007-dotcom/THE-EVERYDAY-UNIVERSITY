/**
 * Utility functions for YouTube URLs and metadata
 */

export function extractYouTubeId(input?: string | null): string {
  if (!input) return "";
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

export function getYouTubeThumbnail(youtubeId?: string, quality: "maxres" | "sd" | "hq" = "maxres"): string {
  if (!youtubeId) return "/card-compressed.avif";
  const filename = quality === "maxres" ? "maxresdefault.jpg" : quality === "sd" ? "sddefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${youtubeId}/${filename}`;
}
