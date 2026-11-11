import Link from 'next/link';
import { business } from '@/lib/business';

/** The best way to reach the business in legal text: the email address, else the enquiry form. */
export default function LegalContact() {
  return business.email
    ? <a href={`mailto:${business.email}`}>{business.email}</a>
    : <Link href="/contact">the enquiry form</Link>;
}
