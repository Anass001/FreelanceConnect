export function formatDate(date) {
    const currentDate = new Date();

    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: date.getFullYear() === currentDate.getFullYear() ? undefined : 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
}