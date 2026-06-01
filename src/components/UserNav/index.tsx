"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { LogOut, LogIn } from 'lucide-react'
import styles from './UserNav.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useClickOutside } from '@/hooks/useClickOutside'

const RenderAvatar = ({ userPhoto, userInitial }: { userPhoto?: string | null, userInitial: string }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <div className={styles.avatarContainer}>
            {userPhoto && !hasError ? (
                <Image
                    src={userPhoto}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className={styles.avatar}
                    referrerPolicy="no-referrer"
                    unoptimized
                    onError={() => setHasError(true)}
                />
            ) : (
                <div className={styles.avatar}>
                    {userInitial}
                </div>
            )}
        </div>
    );
};

export function UserNav({ isMobile = false }) {
    const supabase = createClient()
    const pathname = usePathname()
    const [user, setUser] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
    const userPhoto = user?.user_metadata?.avatar_url;
    const userInitial = user?.email?.charAt(0).toUpperCase();
    const searchParams = useSearchParams()

    const currentParams = searchParams.toString();
    const returnPath = currentParams ? `${pathname}?${currentParams}` : pathname;
    const loginUrl = `/login?redirect=${encodeURIComponent(returnPath)}`;

    useEffect(() => {
        async function inicializarAutenticacao() {
            try {
                const { data } = await supabase.auth.getUser()
                setUser(data.user)
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            } finally {
                setLoading(false)
            }
        }

        inicializarAutenticacao()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (isMobile) {
        return (
            <div className={styles.mobileWrapper}>
                {loading ? (
                    <div className={styles.menuItemSkeleton} />
                ) : user ? (
                    <>
                        <div className={styles.userInfoMobile}>
                            <RenderAvatar key={userPhoto || 'default'} userPhoto={userPhoto} userInitial={userInitial} />
                            <div className={styles.textDetails}>
                                <p className={styles.infoName}>{user.name}</p>
                                <p className={styles.infoEmail}>{user.email}</p>
                            </div>
                        </div>
                        <button
                            className={`${styles.menuItem} ${styles.destructive}`}
                            onClick={() => supabase.auth.signOut()}
                        >
                            <LogOut size={16} />
                            <span>Sair</span>
                        </button>
                    </>
                ) : (
                    <Link href={loginUrl} className={styles.loginLinkMobile}>
                        <LogIn size={18} />
                        Entrar
                    </Link>
                )}
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.avatarSkeleton} />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {user ? (
                <div ref={dropdownRef} className={styles.dropdownWrapper}>
                    <button className={styles.trigger} onClick={() => setIsOpen(prev => !prev)}>
                        <RenderAvatar key={userPhoto || 'default'} userPhoto={userPhoto} userInitial={userInitial} />
                    </button>

                    {isOpen && (
                        <div className={styles.menuContent}>
                            <div className={styles.userInfo}>
                                <p className={styles.infoName}>{user.name}</p>
                                <p className={styles.infoEmail}>{user.email}</p>
                            </div>
                            <div className={styles.separator} />
                            <Link href="/meus-monitoramentos">
                                <button className={styles.menuItem}>
                                    <span>Meus monitoramentos</span>
                                </button>
                            </Link>
                            <button
                                className={styles.menuItem}
                                onClick={() => supabase.auth.signOut()}
                            >
                                <LogOut size={16} />
                                <span>Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link href={loginUrl} className={styles.loginLink}>
                    <LogIn size={16} />
                    Entrar
                </Link>
            )}
        </div>
    )
}