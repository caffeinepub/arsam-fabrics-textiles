import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError, error } = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            Contact Us
          </h1>
          <p className="font-body text-primary-foreground/75 mt-2">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">
                      Address
                    </p>
                    <p className="font-body text-muted-foreground text-sm mt-0.5">
                      ARSAM Fabrics & Textiles Ltd
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">
                      Phone
                    </p>
                    <a
                      href="tel:+923004827509"
                      className="font-body text-muted-foreground text-sm mt-0.5 hover:text-primary transition-colors block"
                    >
                      +92 300 4827509
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:info@arsamfabrics.com"
                      className="font-body text-muted-foreground text-sm mt-0.5 hover:text-primary transition-colors block"
                    >
                      info@arsamfabrics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">
                      Business Hours
                    </p>
                    <p className="font-body text-muted-foreground text-sm mt-0.5">
                      Monday – Saturday: 9am – 6pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Facebook Link */}
              <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/15">
                <p className="font-body text-sm text-foreground font-semibold mb-1">
                  Follow Us on Facebook
                </p>
                <a
                  href="https://www.facebook.com/people/ARSAM-Fabrics-Textile-Pvt-Ltd/100066844298863/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-primary text-sm hover:underline"
                >
                  ARSAM Fabrics & Textile Pvt. Ltd
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div
                  className="bg-card border border-border rounded-xl p-10 text-center"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Thank you for reaching out to ARSAM Fabrics. We'll get back
                    to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary text-primary-foreground"
                    data-ocid="contact.send_another.button"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                  <h2 className="font-display text-xl font-bold text-card-foreground mb-6">
                    Send Us a Message
                  </h2>

                  {isError && (
                    <Alert
                      variant="destructive"
                      className="mb-4"
                      data-ocid="contact.error_state"
                    >
                      <AlertDescription>
                        {error instanceof Error
                          ? error.message
                          : "Failed to send message. Please try again."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="font-body text-sm font-semibold"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder="Your full name"
                          required
                          data-ocid="contact.name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="font-body text-sm font-semibold"
                        >
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="your@email.com"
                          required
                          data-ocid="contact.email.input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="font-body text-sm font-semibold"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="+92 000 000 0000"
                        data-ocid="contact.phone.input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="font-body text-sm font-semibold"
                      >
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        data-ocid="contact.message.textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      data-ocid="contact.form.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
