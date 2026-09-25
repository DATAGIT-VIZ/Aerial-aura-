// Mux video helpers
// Set MUX_TOKEN_ID and MUX_TOKEN_SECRET in .env.local before activating.

export const MUX_PLAYBACK_BASE = "https://stream.mux.com";
export const MUX_IMAGE_BASE    = "https://image.mux.com";

export function muxPlaybackUrl(playbackId: string): string {
  return `${MUX_PLAYBACK_BASE}/${playbackId}.m3u8`;
}

export function muxPosterUrl(playbackId: string, time = 0): string {
  return `${MUX_IMAGE_BASE}/${playbackId}/thumbnail.webp?time=${time}`;
}

export function muxGifUrl(playbackId: string, start = 0, end = 3): string {
  return `${MUX_IMAGE_BASE}/${playbackId}/animated.gif?start=${start}&end=${end}&fps=15&width=640`;
}
