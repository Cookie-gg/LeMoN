import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.cookies.token === undefined) return NextResponse.redirect('/login');
  return NextResponse.next();
}
