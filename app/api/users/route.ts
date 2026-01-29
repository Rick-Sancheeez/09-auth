import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api/api';
import { cookies } from 'next/headers';

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();

  try {
    const { data } = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("GoIT Error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: apiError.response?.data?.error ?? apiError.message },
      { status: apiError.response?.status || 500 }
    );
  }
}