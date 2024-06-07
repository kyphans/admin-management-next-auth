import { auth } from '@/auth';
import Sidebar from '@/components/navbar/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserInfoSettings from '@/components/user-info-setting';
import { type Session } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Logo = () => {
  return (
    <Link className='flex items-center gap-2 font-semibold' href='/'>
      <Package2Icon className='h-6 w-6' />
      <span className=''>Acme Inc</span>
    </Link>
  );
}

export default async function RoutesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await auth();
  console.log('session', session);

  if (!session?.user) {
    redirect('/sign-in');
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      {/* Sidebar for medium screen */}
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Logo />
          </div>
          <div className='flex-1'>
            <Sidebar />
          </div>
          <div className='mt-auto p-4'>{/* Sidebar item in bottom */}</div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          {/* Sidebar for small screen */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className='shrink-0 md:hidden'
                size='icon'
                variant='outline'>
                <MenuIcon className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col' side='left'>
              <Logo />
              <Sidebar isMobileView={true} />
              <div className='mt-auto'>{/* Sidebar item in bottom */}</div>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1'>
            <form>
              <div className='relative'>
                <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
                  placeholder='Search products...'
                  type='search'
                />
              </div>
            </form>
          </div>
          <UserInfoSettings data={session?.user} />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

function MenuIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function Package2Icon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z' />
      <path d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9' />
      <path d='M12 3v6' />
    </svg>
  );
}

function SearchIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
