import { Link } from '@tanstack/react-router';
import { Boxes, Download, Home, Info, Mail, Share, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import companyLogo from '@/assets/company-logo.png';

const WHATSAPP = '61450995387';

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fab"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}

const items = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Products', to: '/products', icon: Boxes },
  { name: 'About', to: '/about', icon: Info },
  { name: 'Contact', to: '/contact', icon: Mail },
] as const;

export function BottomNav() {
  return (
    <nav aria-label="Bottom navigation" className="bottom-nav">
      {items.map(({ name, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === '/' }}
          className="bottom-nav-item"
          activeProps={{ 'aria-current': 'page' }}
        >
          <Icon className="h-5 w-5" />
          <span>{name}</span>
        </Link>
      ))}
    </nav>
  );
}

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallAppButton({ className = '' }: { className?: string }) {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as { standalone?: boolean }).standalone;
      setIsStandalone(!!standalone);
    }
  }, []);

  if (isStandalone) return null;

  const trigger = () => {
    window.dispatchEvent(new CustomEvent('trigger-pwa-install'));
  };

  return (
    <button
      type="button"
      onClick={trigger}
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary/80 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-secondary hover:text-primary ${className}`}
      title="Install Australian Mining & Manufacturing App"
    >
      <Smartphone className="h-3.5 w-3.5 text-primary" />
      <span>Install App</span>
    </button>
  );
}

export function InstallBanner() {
  const [evt, setEvt] = useState<PromptEvent | null>(null);
  const [mode, setMode] = useState<'none' | 'prompt' | 'ios' | 'manual'>('none');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as { standalone?: boolean }).standalone;

    if (standalone) return;

    const ua = navigator.userAgent;
    const ios =
      /iphone|ipad|ipod/i.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as PromptEvent);
      if (sessionStorage.getItem('install-dismissed') !== '1') {
        setMode('prompt');
      }
    };

    window.addEventListener('beforeinstallprompt', onPrompt);

    // Explicit manual trigger from header/nav
    const onManualTrigger = () => {
      if (evt) {
        setMode('prompt');
      } else if (ios) {
        setMode('ios');
      } else {
        setMode('manual');
      }
    };
    window.addEventListener('trigger-pwa-install', onManualTrigger);

    // Initial check for mobile devices to show install banner if not dismissed
    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem('install-dismissed') !== '1') {
        setMode((current) => (current === 'none' ? (ios ? 'ios' : 'manual') : current));
      }
    }, 2000);

    const onInstalled = () => {
      setMode('none');
      setEvt(null);
    };
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('trigger-pwa-install', onManualTrigger);
      window.removeEventListener('appinstalled', onInstalled);
      clearTimeout(timer);
    };
  }, [evt]);

  if (mode === 'none') return null;

  const dismiss = () => {
    sessionStorage.setItem('install-dismissed', '1');
    setMode('none');
  };

  const install = async () => {
    if (evt) {
      await evt.prompt();
      const choice = await evt.userChoice;
      if (choice.outcome === 'accepted') {
        setMode('none');
      }
      setEvt(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Install AM&M Stone App"
      className="install-banner animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-card shadow-sm">
        <img
          src={companyLogo}
          alt="Australian Mining & Manufacturing logo"
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 text-sm">
        <div className="flex items-center gap-1.5">
          <p className="font-display font-semibold tracking-tight text-foreground">
            Install AM&M Stone
          </p>
          <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-medium text-primary">
            PWA
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
          {mode === 'prompt' ? (
            'Fast offline access to natural stones, blocks, slabs & polishing tools.'
          ) : mode === 'ios' ? (
            <>
              Tap <Share className="inline h-3.5 w-3.5 text-primary" /> Share in Safari, then choose{' '}
              <span className="font-semibold text-foreground">"Add to Home Screen"</span>.
            </>
          ) : (
            'Click your browser menu (⋮) and select "Install Australian Mining & Manufacturing".'
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {mode === 'prompt' && (
          <button
            type="button"
            onClick={install}
            className="install-btn inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Install</span>
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="rounded-md p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
