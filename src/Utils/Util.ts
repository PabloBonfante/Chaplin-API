export default function DateTimeToString(date: Date): string{
    return date.toISOString().split('T')[0];
}