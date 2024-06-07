'use client';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { type User } from 'next-auth';

const UserInfoSettings = ({ data }: { data?: User }) => {
  const src = data?.image ?? '/icons/placeholder.svg';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full' size='icon' variant='secondary'>
          <Image
            priority
            alt='avatar'
            className='rounded-lg shadow-xl'
            src={src}
            width={20}
            height={20}
            style={{
              objectFit: 'cover'
            }}
          />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{data?.name ?? 'My account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfoSettings;