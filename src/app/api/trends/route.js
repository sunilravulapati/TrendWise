import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

export async function GET() {
  const dummyTrends = [
    {
      title: "India vs South Africa Final",
      searches: "1M+",
      url: "https://trends.google.com/trends/explore?q=India+vs+South+Africa"
    },
    {
      title: "Budget 2025",
      searches: "500K+",
      url: "https://trends.google.com/trends/explore?q=Budget+2025"
    }
  ];

  return NextResponse.json(dummyTrends);
}

