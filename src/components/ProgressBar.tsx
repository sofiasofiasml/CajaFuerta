export function ProgressBar({ found, total }: { found: number; total: number }) {
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={found}>
      <p className="progress__label">
        <b>{found}/{total}</b> pistas encontradas
      </p>
      <div className="progress__track">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < found ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  );
}
