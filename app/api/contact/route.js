export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
  
    console.log('Received:', { name, email, message });
  
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/thank-you',
      },
    });
  }
  
  export async function GET() {
    return new Response(JSON.stringify({
      message: "Please submit the form using POST.",
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  