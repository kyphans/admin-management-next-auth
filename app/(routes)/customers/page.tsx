import { User, columns } from '@/components/primary-table/columns';
import { DataTable } from '@/components/primary-table/data-table';
import React from 'react'

async function getData(): Promise<any> {
  const usersResponse = await fetch('http://localhost:3000/api/users', { cache: 'force-cache' });
  return usersResponse.json();
}

async function CustomerPage() {
  const result = await getData();
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={result} />
    </div>
  );
}

export default CustomerPage