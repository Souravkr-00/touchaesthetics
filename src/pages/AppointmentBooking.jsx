import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function AppointmentBooking() {
  // Initialize EmailJS
  useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("zB_bhd03Tc8V5OIFE");
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    treatmentType: '',
    date: '',
    time: '',
    notes: '',
    agreement: false
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare the template parameters
    const templateParams = {
      to_email: "toucheaesthetics0@gmail.com", // Replace with your email
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      treatment: formData.treatmentType === 'facial' ? 'Facial Treatment' :
                formData.treatmentType === 'hairSpa' ? 'Hair Spa' :
                formData.treatmentType === 'massage' ? 'Relaxing Massage' :
                formData.treatmentType === 'manicure' ? 'Manicure & Pedicure' :
                formData.treatmentType === 'skinConsultation' ? 'Skin Consultation' :
                formData.treatmentType === 'hairConsultation' ? 'Hair Consultation' : '',
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    };

    try {
      // Replace with your actual service ID and template ID from EmailJS
      const result = await emailjs.send(
        'service_fcjpgu8',
        'template_b43pjzm',
        templateParams
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      alert('Appointment request submitted! We will contact you to confirm your booking.');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        treatmentType: '',
        date: '',
        time: '',
        notes: '',
        agreement: false
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      alert('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const treatments = [
    { id: 'facial', name: 'Facial Treatment' },
    { id: 'hairSpa', name: 'Hair Spa' },
    { id: 'massage', name: 'Relaxing Massage' },
    { id: 'manicure', name: 'Manicure & Pedicure' },
    { id: 'skinConsultation', name: 'Skin Consultation' },
    { id: 'hairConsultation', name: 'Hair Consultation' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column */}
          <div className="md:w-2/5 bg-gradient-to-br from-yellow-50 to-orange-100 p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-orange-800">Radiance</h1>
              <p className="text-orange-700 mt-2">Luxury skin & hair treatments tailored just for you</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Our Signature Treatments</h3>
              <ul className="space-y-3">
                {treatments.map(treatment => (
                  <li key={treatment.id} className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-orange-200 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-orange-700">{treatment.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 text-orange-700">
              <p className="text-sm">Questions about our services?</p>
              <p className="font-medium">Call us at (555) 123-4567</p>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="md:w-3/5 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-orange-800">Book Your Appointment</h2>
              <p className="text-orange-600">Schedule your treatment session</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-orange-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-orange-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-orange-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-orange-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="treatmentType" className="block text-sm font-medium text-orange-700">Treatment Type</label>
                <select
                  id="treatmentType"
                  name="treatmentType"
                  value={formData.treatmentType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                >
                  <option value="">Select a treatment</option>
                  {treatments.map(treatment => (
                    <option key={treatment.id} value={treatment.id}>{treatment.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-orange-700">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-orange-700">Preferred Time</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-orange-700">Special Requests / Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-orange-100 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                  placeholder="Tell us about any special requirements..."
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="agreement"
                    name="agreement"
                    type="checkbox"
                    checked={formData.agreement}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-orange-400 focus:ring-orange-300 border-orange-200 rounded"
                  />
                  <label htmlFor="agreement" className="ml-2 block text-sm text-orange-600">
                    I understand that a 24-hour cancellation notice is required
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-orange-300' : 'bg-orange-400 hover:bg-orange-500'} text-white font-medium py-3 px-4 rounded-md shadow transition duration-150 ease-in-out`}
              >
                {loading ? 'Submitting...' : 'Book Appointment'}
              </button>
              
              {submitStatus === 'success' && (
                <p className="mt-4 text-center text-sm text-green-600">
                  Your appointment request was sent successfully!
                </p>
              )}
              
              {submitStatus === 'error' && (
                <p className="mt-4 text-center text-sm text-red-600">
                  There was an error submitting your request. Please try again.
                </p>
              )}
              
              <p className="mt-4 text-center text-sm text-orange-600">
                We'll confirm your appointment via email or phone within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}