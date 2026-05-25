import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(form.name.trim())) {
      toast.error(
        "Name must contain only letters and be 3-50 characters long."
      );
      return;
    }

    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 5) {
      toast.error("Message must be at least 5 characters long.");
      return;
    }

    if (form.message.trim().length > 500) {
      toast.error("Message must not exceed 500 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        if (response.status === 400) {
          toast.error(
            data.message || "Please check your input fields and try again."
          );
        } else if (response.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error(data.message || "Failed to send message.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const info = [
    {
      icon: MapPin,
      label: "Location",
      value: "India",
    },

    {
      icon: Mail,
      label: "Email",
      value: "nardevrajput001@gmail.com",
      href: "mailto:nardevrajput001@gmail.com",
    },
  ];

  const socials = [
    {
      icon: Github,
      href: "https://github.com/NardevRajput",
      label: "GitHub",
    },

    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/nardev-rajput-813a83275/",
      label: "LinkedIn",
    },

    {
      icon: Twitter,
      href: "https://x.com/NardevRajput1",
      label: "Twitter",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Amazing Together"
          description="Have a project in mind or a role to fill? Drop me a message."
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-5 sm:p-7 rounded-3xl h-full">
              <h3 className="font-display font-bold text-2xl mb-5">
                Get in touch
              </h3>

              {/* STATUS */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open for Freelance & Opportunities
              </div>

              {/* CONTACT INFO */}
              <div className="space-y-5">
                {info.map((i) => (
                  <a
                    key={i.label}
                    href={i.href || "#"}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <i.icon className="h-5 w-5 text-primary-foreground" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {i.label}
                      </div>

                      <div className="font-medium text-foreground break-all group-hover:text-primary transition-colors">
                        {i.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* SOCIALS */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground mb-4">
                  Find me on
                </div>

                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-card p-5 sm:p-7 rounded-3xl space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>

                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your name"
                  className="bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 h-12"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>

                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@email.com"
                  className="bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 h-12"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>

              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                placeholder="Drop me a message"
                rows={7}
                className="bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-[1.01] shadow-[var(--shadow-elegant)] text-base h-12"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
