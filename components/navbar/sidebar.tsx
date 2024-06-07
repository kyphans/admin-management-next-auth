'use client';

import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { APP_PATH } from '@/constant';
import { useRouter, usePathname } from 'next/navigation';

export type SideBarItem = Readonly<{
  href: string;
  icon: React.FC<{ className: string }>;
  label: React.ReactNode;
  badge?: number;
  className?: string;
}>;

const sideBarItems: SideBarItem[] = [
  { href: APP_PATH.ROUTES.DASHBOARD, icon: HomeIcon, label: 'Dashboard' },
  { href: '#', icon: ShoppingCartIcon, label: 'Orders', badge: 6 },
  { href: '#', icon: PackageIcon, label: 'Products' },
  { href: APP_PATH.ROUTES.CUSTOMERS, icon: UsersIcon, label: 'Customers' },
  { href: '#', icon: LineChartIcon, label: 'Analytics' }
];

const Sidebar = ({ isMobileView }: { isMobileView?: boolean }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [indexItemActivated, setIndexItemActivated] = useState(() => {
    const index = sideBarItems.findIndex((item) => item.href === currentPath);
    return index != -1 ? index : 0
  });

  const activatedClassName = 'bg-muted text-primary';

  return (
    <nav
      className={
        isMobileView
          ? 'grid gap-2 text-lg font-medium'
          : 'grid items-start px-2 text-sm font-medium lg:px-4'
      }>
      {sideBarItems.map(
        ({ href, icon: Icon, label, badge, className }, index) => (
          <Link
            key={index}
            className={cn(
              isMobileView
                ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              indexItemActivated === index && activatedClassName,
              className
            )}
            onClick={() => setIndexItemActivated(index)}
            href={href}>
            <Icon className='h-4 w-4' />
            {label}
            {!!badge && (
              <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                {badge}
              </Badge>
            )}
          </Link>
        )
      )}
    </nav>
  );
};

export default Sidebar;

function HomeIcon(props: { className?: string }) {
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
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  );
}

function LineChartIcon(props: { className?: string }) {
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
      <path d='M3 3v18h18' />
      <path d='m19 9-5 5-4-4-3 3' />
    </svg>
  );
}

function PackageIcon(props: { className?: string }) {
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
      <path d='m7.5 4.27 9 5.15' />
      <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
      <path d='m3.3 7 8.7 5 8.7-5' />
      <path d='M12 22V12' />
    </svg>
  );
}

function ShoppingCartIcon(props: { className?: string }) {
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
      <circle cx='8' cy='21' r='1' />
      <circle cx='19' cy='21' r='1' />
      <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
    </svg>
  );
}

function UsersIcon(props: { className?: string }) {
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
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
