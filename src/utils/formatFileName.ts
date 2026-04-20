export function formatFileName(brand: string, model: string) {
    const fullString = `${brand} ${model}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const slug = fullString
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .split(/\s+/)
        .slice(0, 4)
        .join("-")
        .toLowerCase();

    const date = new Date().toISOString().split('T')[0];

    return `fiperadar-${slug}-${date}`;
};