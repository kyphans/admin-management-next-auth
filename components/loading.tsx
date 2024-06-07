export default function LoadingComponent() {
  return (
    <div className='flex w-screen h-screen items-center justify-center gap-5'>
      <span className='border px-4 py-2 rounded-full animate-spin'>K</span>
      <span className='animate-pulse'>Loading ...</span>
    </div>
  );
}
