"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { LogOut, LogIn } from 'lucide-react'
import styles from './UserNav.module.scss'
import { usePathname } from 'next/navigation'
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
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname()
    const supabase = createClient()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
    const userPhoto = user?.user_metadata?.avatar_url;
    const userInitial = user?.email?.charAt(0).toUpperCase();


    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user))
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (isMobile) {
        return (
            <div className={styles.mobileWrapper}>
                {user ? (
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
                    <Link href={`/login?redirect=${pathname}`} className={styles.loginLinkMobile}>
                        <LogIn size={18} />
                        Entrar
                    </Link>
                )}
            </div>
        );
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
                <Link href={`/login?redirect=${pathname}`} className={styles.loginLink}>
                    <LogIn size={16} />
                    Entrar
                </Link>
            )}
        </div>
    )
}