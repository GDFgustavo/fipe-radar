'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Select from '@/components/ui/select'

import styles from './MyMonitorings.module.scss'
const options = [
    { value: 'desc', label: 'Mais recentes' },
    { value: 'asc', label: 'Mais antigos' }
]

export function Filter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentOrder = searchParams.get('ordem') || 'desc'
    const currentValue = options.find(opt => opt.value === currentOrder) || options[0]

    const handleChange = (selectedOption: any) => {
        if (!selectedOption) return

        const params = new URLSearchParams(searchParams.toString())
        params.set('ordem', selectedOption.value)

        router.push(`${pathname}?${params.toString()}`)

        router.refresh()
    }

    return (
        <div className={styles.selectWrapper}>
            <Select
                instanceId="order-select-fipe"
                options={options}
                value={currentValue}
                onChange={handleChange}
                placeholder="Ordenar por..."
                isSearchable={false}
            />
        </div>
    )
}