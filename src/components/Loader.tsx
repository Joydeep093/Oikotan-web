import Image from "next/image";
import logo from "@/assets/images/logo/logo.png";

export default function Loader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-4 border-brand-100" aria-hidden="true" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-500 border-r-brand-400" aria-hidden="true" />
          <Image
            src={logo}
            alt="Oikotan logo"
            width={34}
            height={34}
            className="h-8 w-8 rounded-full object-contain"
            priority
          />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-neutral-900">Loading</p>
        </div>
      </div>
    </div>
  );
}