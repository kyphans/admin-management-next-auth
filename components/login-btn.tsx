'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ButtonAuth({route, children}: Readonly<{route: string, children: React.ReactNode;}>) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(route, { scroll: false })}>
      {children}
    </Button>
  );
}

export default ButtonAuth;
