export function FormattedDate(props: { date: string }) {
  const newDate = new Date(props.date);
  return (
    <time dateTime={newDate.toISOString()}>
      {newDate.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </time>
  );
}
