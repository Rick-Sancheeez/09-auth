import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    
    if (accessToken) {
      await api.post('/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch (error) {
  
    console.error('Backend logout failed:', error);
  } finally {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  }

  return NextResponse.json({ message: 'Logged out successfully' });
}