import { NextResponse } from 'next/server'

export async function GET() {
  const produtos = [{ id: 1, nome: 'Produto A' }]
  return NextResponse.json(produtos)
}