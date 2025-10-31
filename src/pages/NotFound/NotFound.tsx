import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to the Chess Grandmasters directory."
        url="/404"
        keywords="404, page not found, error"
      />
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Page not found</p>
        <Link to="/" className={styles.link}>
          Go back to Grandmasters List
        </Link>
      </div>
    </>
  );
}
