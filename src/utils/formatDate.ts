export function formatMonthYear(date: Date) {
    const month = date.toLocaleDateString("pt-BR", { month: "long" })
    const year = date.getFullYear()

    return `${`Atualizado em ${month}`} ${year}`
}

export function formatDate() {
    return new Date().toLocaleDateString('pt-BR')

}