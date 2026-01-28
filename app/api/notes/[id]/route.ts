import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';


type Props = {
  params: Promise<{ id: string }>;
};


export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
	  const { data } = await api(`/notes/${id}`, {
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

export async function DELETE(request: NextRequest) {
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

