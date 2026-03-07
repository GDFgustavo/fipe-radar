export function formatMonthYear(date: Date) {
    const month = date.toLocaleDateString("pt-BR", { month: "long" })
    const year = date.getFullYear()

    return `${`Atualizado em ${month}`} ${year}`
}