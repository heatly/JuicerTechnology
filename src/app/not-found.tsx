import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container grid min-h-[70vh] place-items-center pt-32 text-center">
      <div>
        <Logo variant="mark" animated className="mx-auto h-20" />
        <p className="eyebrow mt-4">404</p>
        <h1 className="h-display mt-3 text-5xl md:text-7xl">This page got <span className="text-juice">squeezed out.</span></h1>
        <p className="mx-auto mt-5 max-w-md text-muted">The page you wanted doesn't exist or has moved. Head back and keep exploring.</p>
        <ButtonLink href="/" className="mt-8">Back to home</ButtonLink>
      </div>
    </section>
  );
}
