import { useState, type FormEvent } from "react"
import { CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { contact, estate } from "@/data/content"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent" | "error"

const fieldClass =
  "mt-2 block w-full border border-border bg-transparent px-4 py-3 text-[15px] font-light text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"

function Field({
  id,
  label,
  optional,
  className,
  ...input
}: { id: string; label: string; optional?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label text-foreground/85">
        {label}
        {optional && <span className="ml-2 text-muted-foreground">(facultatif)</span>}
      </label>
      <input id={id} name={id} required={!optional} className={fieldClass} {...input} />
    </div>
  )
}

/**
 * Contact form. The site has no server, so FormSubmit (formsubmit.co) forwards each message to
 * `contact.email`; the very first message sends that address a link to confirm before mail flows.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    // Bots fill the hidden field; people never see it.
    if (data._honey) return
    if (!contact.email) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: data.nom,
          Prénom: data.prenom,
          Téléphone: data.telephone || "—",
          Email: data.email,
          Message: data.message,
          _replyto: data.email,
          _subject: `${contact.subject} : ${data.prenom} ${data.nom}`,
          _template: "table",
          _captcha: "false",
        }),
      })
      const body = (await res.json().catch(() => null)) as { success?: string | boolean } | null
      if (!res.ok || String(body?.success) !== "true") throw new Error("not sent")
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center border border-accent/50 p-8">
        <CheckCircle2 className="h-8 w-8 text-accent" strokeWidth={1.25} aria-hidden />
        <p className="display mt-6 text-3xl text-foreground">Merci, votre message est envoyé.</p>
        <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-muted-foreground">
          Nous vous répondrons dès que possible, par e-mail ou par téléphone.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label mt-8 text-accent transition-colors hover:text-foreground"
        >
          Écrire un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-6 sm:grid-cols-2" aria-describedby="contact-note">
      <Field id="nom" label="Nom" autoComplete="family-name" />
      <Field id="prenom" label="Prénom" autoComplete="given-name" />
      <Field id="telephone" label="Téléphone" type="tel" autoComplete="tel" optional />
      <Field id="email" label="E-mail" type="email" autoComplete="email" />
      <div className="sm:col-span-2">
        <label htmlFor="message" className="label text-foreground/85">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={cn(fieldClass, "resize-y")} />
      </div>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-px w-px overflow-hidden opacity-0"
      />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-note" className="max-w-sm text-xs font-light leading-relaxed text-muted-foreground">
          Vos coordonnées servent uniquement à vous répondre. Elles ne sont ni conservées sur le site, ni transmises à
          des tiers.
        </p>
        <Button type="submit" variant="gold" disabled={status === "sending"} className="shrink-0">
          {status === "sending" ? "Envoi…" : "Envoyer"} <Send />
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-light text-red-300 sm:col-span-2">
          Le message n'a pas pu être envoyé. Réessayez, ou appelez-nous au{" "}
          <a href={estate.phoneHref} className="text-accent underline">
            {estate.phone}
          </a>
          .
        </p>
      )}
    </form>
  )
}
