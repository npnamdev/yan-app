
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import DatePickerWithRange from '@/components/date-picker-with-range';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/">Trang chủ</Link>
      <br />
      <Link href="/manage">Trang quản trị</Link>
      <br />
      <Link href="/sign-in">Trang đăng nhập</Link>
      <br />
      <DatePickerWithRange className="[&>button]:w-[260px]" />
    </div>
  );
}