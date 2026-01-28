import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { api, ApiError } from '../api';


export async function GET() {
  try {
    const cookieStore = await cookies();

    const { data } = await api.get('/notes', {
      headers: {
        //Authorization: `Bearer ${token}`,
        Cookie: cookieStore.toString(),
      }
    });

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}



export async function POST(request: NextRequest) {
	// Отримуємо дані з тіла запиту
  const body = await request.json();
  
  try {
		// Передаємо їх далі на бекенд нотаток
	  const { data } = await api.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });
  
	  return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}