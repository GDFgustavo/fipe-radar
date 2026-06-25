import Link from 'next/link'

export default function NotFound() {
    return (
        <div
            className='container'
            style={{ minHeight: '50vh', padding: '3rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1', flexDirection: 'column', }}
        >
            <h1
                style={{
                    backgroundColor: 'var(--secondary)',
                    fontSize: '24px',
                    color: 'var(--foreground)',
                    padding: '8px',
                    borderRadius: '5px',
                }}
            >
                Eita! Algo deu errado :(
            </h1>
            <p style={{ fontSize: '16px', margin: '1rem 0', color: 'var(--foreground)' }}>
                <Link href="/"><span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--foreground)' }}>clique aqui</span></Link> e volte para a página
                principal.
            </p>
        </div>
    )
}