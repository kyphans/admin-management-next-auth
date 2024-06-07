
import { signIn } from '@/auth';
import { Button } from './ui/button';

export function OAuthSignInBtn({method, label}: {method: string, label: string}) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(method);
      }}>
      <Button variant='outline' className='w-full'>
        {label}
      </Button>
    </form>
  );
}
