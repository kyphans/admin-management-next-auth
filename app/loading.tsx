export default function Loading() {
  return (
    <div className='flex w-screen h-screen items-center justify-center gap-5'>
      <span className='border w-10 h-10 flex justify-center items-center rounded-full animate-spin'>K</span>
      <span className='animate-pulse'>Loading ...</span>
    </div>
  );
}
