import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Loader2,
  Copy,
  Check,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const EMAIL = "ayanbadar9477@gmail.com";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/mdayanbadar", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/MdAyanBadar", icon: Github },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ayanbadar.ig?igsh=MTJsbHhuemtsajhpaQ%3D%3D&utm_source=qr",
    icon: Instagram,
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-background/70 text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

const Field = ({ label, id, children }) => (
  <label htmlFor={id} className="block text-left">
    <span className="block text-sm font-medium mb-1.5">{label}</span>
    {children}
  </label>
);

export const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.target);
    formData.append("access_key", "463bf0d3-f5ae-4aab-b647-529849fc272b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus({ ok: true, text: "Thanks — your message is on its way. I'll get back to you soon." });
        event.target.reset();
      } else {
        setStatus({ ok: false, text: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ ok: false, text: `Couldn't send right now. You can email me directly at ${EMAIL}.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-background text-foreground">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Building something with LLMs, agents, or document AI — or hiring for an AI
          engineering role? I'd like to hear about it.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl border border-border bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden"
        >
          <div className="relative p-6 md:p-10 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b lg:border-b-0 lg:border-r border-border overflow-hidden">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            <div className="relative text-left">
              <h3 className="text-2xl font-bold mb-2">Let's talk</h3>
              <p className="text-muted-foreground mb-8">
                The quickest way to reach me is email. The form works too — it lands in the
                same inbox.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/60">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="block font-medium text-[15px] break-words hover:text-primary transition-colors"
                    >
                      ayanbadar9477@<wbr />gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied" : "Copy"}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <a
                  href="tel:+919477087319"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/60 hover:border-primary/40 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium">+91 94770 87319</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/60">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Based in</div>
                    <div className="font-medium">Hyderabad, India · IST (UTC+5:30)</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Elsewhere
                </div>
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-background/60 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 md:p-10 space-y-5">
            <h3 className="text-2xl font-bold text-left mb-1">Send a message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name" id="contact-name">
                <input id="contact-name" type="text" name="name" placeholder="Your name" autoComplete="name" required className={inputClass} />
              </Field>
              <Field label="Email" id="contact-email">
                <input id="contact-email" type="email" name="email" placeholder="you@company.com" autoComplete="email" required className={inputClass} />
              </Field>
            </div>

            <Field label="Subject" id="contact-subject">
              <input id="contact-subject" type="text" name="title" placeholder="What's this about?" className={inputClass} />
            </Field>

            <Field label="Message" id="contact-message">
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me a bit about the project or role…"
                required
                className={`${inputClass} resize-y min-h-32`}
              />
            </Field>

            <div className="flex">
              <button
                type="submit"
                disabled={loading}
                className="cosmic-button w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                {loading ? "Sending…" : "Send message"}
              </button>
            </div>

            <div aria-live="polite">
              {status && (
                <div
                  className={`flex items-start gap-2 p-3 rounded-xl text-sm text-left border ${
                    status.ok
                      ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
                  }`}
                >
                  {status.ok ? (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
