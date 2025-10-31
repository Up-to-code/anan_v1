import type { NextRequest } from 'next/server';
import { GET as baseGET, POST as basePOST } from './router';

export async function GET(req: NextRequest) {
  console.debug('[UPLOADTHING][GET]', req.url);
  return baseGET(req);
}

export async function POST(req: NextRequest) {
  const url = req.url;
  const contentType = req.headers.get('content-type') || '';
  console.debug('[UPLOADTHING][POST]', { url, contentType });
  return basePOST(req);
}


