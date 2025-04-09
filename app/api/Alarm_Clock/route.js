export const config = {
    runtime: 'edge',
    schedule: '0 6 1 * *'
  };

  export async function GET() {
    const reminderMessage = {
      date: new Date().toISOString(),
      message: "Reminder: Check if insurance payment reminder needs to be sent.",
    };
    
    return new Response(JSON.stringify(reminderMessage), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  