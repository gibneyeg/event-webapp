import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Need to be logged in to get events' },
        { status: 401 }
      );
    }
    
    const parsedUserId = parseInt(userId);
   
 
    const event = await prisma.event.findUnique({
      where: { id },
    });
   
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Check if the event belongs to the user
    if (event.userId !== parsedUserId) {
      return NextResponse.json(
        { error: 'Unauthorized to access this event' },
        { status: 403 }
      );
    }
   
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    const { title, description, location, startDate, endDate, userId } = data;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Need to be logged in to get events' },
        { status: 401 }
      );
    }
    
    const parsedUserId = parseInt(userId);
    
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Check if the event belongs to the user
    if (existingEvent.userId !== parsedUserId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this event' },
        { status: 403 }
      );
    }
   
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
      },
    });
   
    return NextResponse.json(event);
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
   
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    // Get the user ID from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Need to be logged in to delete event' },
        { status: 401 }
      );
    }
    
    const parsedUserId = parseInt(userId);
    
    // Check if the event exists and belongs to the user
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    if (existingEvent.userId !== parsedUserId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this event' },
        { status: 403 }
      );
    }
   
    await prisma.event.delete({
      where: { id },
    });
   
    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
   
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}