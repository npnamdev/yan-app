'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function LocalSwitcher2() {
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();
    const localActive = useLocale();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => { router.replace(pathname, { locale: nextLocale }); });
    };

    return (
        <label className='border-2 rounded'>
            <p className='sr-only'>change language</p>
            <select
                defaultValue={localActive}
                className='bg-transparent py-2'
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value='en'>English</option>
                <option value='vi'>Vietnamese</option>
            </select>
        </label>
    );
}