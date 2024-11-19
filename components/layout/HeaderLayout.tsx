import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocalSwitcher from '../LocalSwitcher';
import { ModeToggle } from '../ModeToggle';

export default function HeaderLayout() {
    const t = useTranslations('HeaderLayout');

    return (
        <div className="bg-black  text-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-xl font-bold">
                    <Link className="hover:text-gray-300" href="/">MyLogo</Link>
                </div>
                <nav className="flex space-x-6">
                    <Link className="hover:text-gray-300" href="/">{t('home')}</Link>
                    <Link className="hover:text-gray-300" href="/about">{t('about')}</Link>
                </nav>

                <LocalSwitcher />
                <ModeToggle />
            </div>
        </div>
    );
}