"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { SITE, SOCIAL_LINKS } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { GlowCard } from "@/components/effects/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const socialIconMap = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  mail: Mail,
};

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding border-t border-white/[0.06]">
      <div className="section-container">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something meaningful"
          description="Open to internships, collaborations, and conversations about data-driven business."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you are hiring for a data analyst role, exploring a
              collaboration, or simply want to discuss analytics — I would be glad
              to connect. Reach out at my personal email below; I read and
              respond to every message myself.
            </p>

            <div className="mt-8">
              <p className="text-sm font-medium">Personal Email</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-primary transition-colors hover:text-primary/80"
              >
                {SITE.email}
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                Straight to my inbox — expect a reply within 24 hours.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium">College Email</p>
              <a
                href={`mailto:${SITE.collegeEmail}`}
                className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {SITE.collegeEmail}
              </a>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium">Phone</p>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {SITE.phone}
              </a>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium">Location</p>
              <p className="mt-1 text-muted-foreground">{SITE.location}</p>
            </div>

            <div className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = socialIconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-[color,border-color,box-shadow] duration-300 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <GlowCard variant="mixed">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
              className="glass glow-border space-y-5 rounded-2xl p-6 sm:p-8"
            >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-medium">Message sent</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your email client should open shortly. If it does not, email me
                  directly at {SITE.email}.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    required
                  />
                </div>
                <Button type="submit" variant="glow" className="w-full">
                  <Send className="h-4 w-4" />
                  Send message
                </Button>
              </>
            )}
          </motion.form>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
