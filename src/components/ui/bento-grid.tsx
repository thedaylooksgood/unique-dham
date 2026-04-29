import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      // light styles
      "bg-white/40 backdrop-blur-xl border border-saffron/10 shadow-[0_8px_30px_rgba(233,93,36,0.04)]",
      // dark styles
      "dark:bg-sacred-brown/80 dark:border-saffron/20 transform-gpu",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-8">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-10">
        <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-90 group-hover:bg-saffron/20">
          <Icon className="h-7 w-7 text-saffron transition-all duration-300 ease-in-out" />
        </div>
        <h3 className="text-2xl font-display font-semibold text-sacred-brown dark:text-saffron">
          {name}
        </h3>
        <p className="max-w-lg text-base font-body leading-relaxed text-warm-umber/80 dark:text-saffron/70">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden mt-6"
        )}
      >
        <Button variant="link" size="sm" className="pointer-events-auto p-0 text-saffron hover:text-saffron/80 font-display tracking-widest uppercase text-xs" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /></Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <Button variant="link" size="sm" className="pointer-events-auto p-0 text-saffron hover:text-saffron/80 font-display tracking-widest uppercase text-xs" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" /></Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-500 group-hover:bg-saffron/[0.02] group-hover:dark:bg-saffron/5" />
  </div>
)

export { BentoCard, BentoGrid }
