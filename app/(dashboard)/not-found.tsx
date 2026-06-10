import NotFoundContent from '@/src/components/not-found-content';

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <NotFoundContent compact />
    </div>
  );
}
