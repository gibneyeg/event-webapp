import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
    });
    
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, location, startDate, endDate, userId } = data;
    
    // Validate required fields
    if (!title || !startDate || !userId) {
      return NextResponse.json(
        { error: 'Titledfdfgsdzfged' },
        { status: 400 }
      );
    }
    
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        userId: parseInt(userId),
      },
    });
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}