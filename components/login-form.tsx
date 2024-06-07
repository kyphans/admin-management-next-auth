'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email("That doesn't look like an email address"),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export function LoginForm() {
  const [loading, setLoading] = useState({
    google: false,
    github: false
  });

  const handleSubmit = async (method: string) => {
    try {
      setLoading(()=>{
        return {
          ...loading,
          [method]: true
        }
      });
      await signIn(method);
    }
    finally {
      setLoading(()=>{
        return {
          ...loading,
          [method]: false
        }
      });
    }

  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await signIn("credentials", values);
  }

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='m@example.com'
                          required
                          autoComplete='new-email'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <div className='flex items-center'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Link
                          className='ml-auto inline-block text-sm underline'
                          href='#'>
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id='password'
                          placeholder='********'
                          required
                          autoComplete='new-password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='w-full' type='submit'>
                  Login
                </Button>
                <Button
                  className='w-full'
                  variant='outline'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit('google');
                  }}>
                  {loading['google'] ? 'Loading...' : 'Login with Google'}
                </Button>
                <Button
                  className='w-full'
                  variant='outline'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit('github');
                  }}>
                  {loading['github'] ? 'Loading...' : 'Login with GitHub'}
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            {"Don't have an account? "}
            <Link className='underline' href='/sign-up'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <div className='h-full flex justify-center items-center'>
          <Image
            priority
            alt='placeholder'
            className='rounded-lg shadow-xl'
            src={'/icons/placeholder.svg'}
            width={500}
            height={500}
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
    </div>
  );
}
