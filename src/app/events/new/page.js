import EventForm from "@/app/components/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Create New Event</h1>
      <EventForm />
    </div>
  );
}