import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoIdOrUrl = searchParams.get("url") || searchParams.get("id");

  if (!videoIdOrUrl) {
    return NextResponse.json(
      { error: "Missing 'url' or 'id' parameter" },
      { status: 400 }
    );
  }

  const match = videoIdOrUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  const youtubeId = match ? match[1] : videoIdOrUrl.trim();

  if (!youtubeId || youtubeId.length < 11) {
    return NextResponse.json({ error: "Invalid YouTube ID" }, { status: 400 });
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;
    const res = await fetch(oembedUrl, {
      next: { revalidate: 3600 }, // Cache YouTube metadata for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Video not found on YouTube" },
        { status: 404 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      id: youtubeId,
      title: data.title || "YouTube Video",
      author: data.author_name || "The Everyday University",
      thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    });
  } catch (error) {
    console.error("Error fetching YouTube oEmbed:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube details" },
      { status: 500 }
    );
  }
}
