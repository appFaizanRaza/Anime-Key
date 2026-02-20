export default function MovieDetailPage({ params }: { params: { id: string } }) {
  return <div>Movie Detail Page for ID: {params.id}</div>;
}