const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  toast.style.display = 'block';
  toast.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Network response was not OK');

    // Some servers may not return proper JSON, so wrap in try/catch
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }

    if (data.success) {
      toast.textContent = 'Message sent!';
      form.reset();
    } else {
      toast.textContent = 'Message failed to send.';
    }

  } catch (err) {
    toast.textContent = 'Message failed to send.';
    console.error(err);
  }

  setTimeout(() => { toast.style.display = 'none'; }, 4000);
});
