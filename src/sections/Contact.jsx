import emailjs from "@emailjs/browser";
import { useCallback, useEffect, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState(null); // Alert state

  // Initialize EmailJS outside the render cycle to avoid reinitialization
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  // Memoizing handleChange to avoid unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  // Memoizing handleSubmit to avoid unnecessary re-renders
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const response = await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      console.log("Email sent successfully:", response.text);

      // Show success alert
      setAlert({ type: "success", message: "Your message has been sent successfully!" });

      // Reset form
      setForm({ name: "", email: "", message: "" });

      // Auto-dismiss alert after 5 seconds
      setTimeout(() => setAlert(null), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);

      // Show error alert
      setAlert({ type: "error", message: "Sorry, there was an error sending your message. Please try again." });

      // Auto-dismiss alert after 5 seconds
      setTimeout(() => setAlert(null), 5000);
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  }, [form]);

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Hire Me – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        {/* Alert Section */}
        {alert && (
          <div
            className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}
          >
            {alert.message}
          </div>
        )}

        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>

      {/* Styles for Alerts */}
      <style>
        {`
          .alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: bold;
            z-index: 1000;
            opacity: 0.9;
          }

          .alert-success {
            background-color: #4caf50;
            color: white;
          }

          .alert-error {
            background-color: #f44336;
            color: white;
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
