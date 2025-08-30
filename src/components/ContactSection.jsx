import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Loader2 } from "lucide-react";

export const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "463bf0d3-f5ae-4aab-b647-529849fc272b"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Form Submitted Successfully!");
        event.target.reset();
      } else {
        console.log("Web3Forms Error:", data);
        setResult(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-background text-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <a
                href="mailto:mdayanbadar123@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                ayanbadar9477@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <a
                href="tel:+919477087319"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                +91 94770 87319
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="text-muted-foreground font-medium">Hyderabad, India</span>
            </div>

            <div className="flex space-x-6 pt-6">
              <a
                href="https://linkedin.com/in/mdayanbadar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/mdayanbadar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/ayanbadar.ig?igsh=MTJsbHhuemtsajhpaQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />

            <input
              type="text"
              name="title"
              placeholder="Subject"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            ></textarea>

            <button
              type="submit"
              className="cosmic-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin h-5 w-5" />}
              {loading ? "Sending..." : "Send Message"}
            </button>

            {result && (
              <p className={`pt-2 animate-fade-in ${result.includes("✅") ? "text-green-500" : "text-red-500"}`}>
                {result}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
