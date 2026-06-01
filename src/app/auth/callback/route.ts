import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    
      const { data: { session } } = await supabase.auth.getSession();
  
    if (session) {
    return NextResponse.redirect(`${origin}${next}`);
    }
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      let decodedNext = next
      if (decodedNext.startsWith('%2F')) {
        decodedNext = decodeURIComponent(decodedNext)
      }

      if (decodedNext.startsWith('/')) {
        const urlFinal = `${origin}${decodedNext}`
        return NextResponse.redirect(urlFinal)
      }
      
      return NextResponse.redirect(`${origin}/login`)
    }
  }
  
  return NextResponse.redirect(`${origin}/login`)
}