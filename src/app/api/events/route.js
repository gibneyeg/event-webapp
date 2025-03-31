import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
    });
   
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received event data:', data);
    
    const { title, description, location, startDate, endDate, userId } = data;
   
    if (!title || !startDate) {
      return NextResponse.json(
        { error: 'Title and start date are required' },
        { status: 400 }
      );
    }


    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required to create an event' },
        { status: 400 }
      );
    }
    
    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        userId: Number(userId), 
      },
    });
   
    console.log('Created event:', event);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: `Failed to create event: ${error.message}` },
      { status: 500 }
    );
  }
}