// components/ContactForm.tsx
'use client';

import { useForm, ValidationError } from '@formspree/react';

interface formspreeProps{
    formId: string;
}

const ContactForm = ({formId}: formspreeProps) => {
    console.log("form id", formId);
  const [state, handleSubmit] = useForm("mvgknzag"); // zameniti sa tvojim ID-jem

  if (state.succeeded) {
    return <p className="space-y-6 max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-xl text-green-600 text-lg font-semibold text-center my-10">Hvala vam na vašoj poruci!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 -top-2 max-w-6xl mx-auto bg-white/10 p-8 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Kontaktirajte nas!</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Ime</label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full border border-white text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border border-white text-white  rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">Predmet</label>
        <input
          id="subject"
          type="text"
          name="subject"
          className="w-full border border-white text-white  rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-1">Poruka</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full border border-white text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <div className='flex justify-center items-center'>
      <button
        type="submit"
        disabled={state.submitting}
        className="bg-black/70  text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors duration-300"
      >
        Pošalji poruku
      </button>
      </div>
      
    </form>
    
  );
};

export default ContactForm;
