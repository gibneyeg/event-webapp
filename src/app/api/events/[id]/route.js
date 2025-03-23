import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET /api/events/[id] - Get a single event
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    const event = await prisma.event.findUnique({
      where: { id },
    });
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
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

// PUT /api/events/[id] - Update an event
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    const { title, description, location, startDate, endDate } = data;
    
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

// DELETE /api/events/[id] - Delete an event
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    
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