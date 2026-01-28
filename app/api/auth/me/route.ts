
import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';


export async function GET() {
  const cookieStore = await cookies();
  // 1. Дістаємо саме значення токена
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  try {
    // 2. Передаємо його як Bearer токен
    await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const userRes = await api.get('/users/me', {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(userRes.data);
  } catch (error) {
    console.log("GoIT Error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: apiError.response?.data?.error ?? apiError.message },
      { status: apiError.response?.status || 500 }
    );
  }
}

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