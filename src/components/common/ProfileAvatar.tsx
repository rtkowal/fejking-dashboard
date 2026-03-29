import { useState } from 'react';

interface Props {
  url: string;
  handle: string;
  size?: number;
}

export default function ProfileAvatar({ url, handle, size = 36 }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {handle.replace('@', '').charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={handle}
      loading="lazy"
      onError={() => setError(true)}
      className="rounded-full shrink-0 bg-slate-100"
      style={{ width: size, height: size }}
    />
  );
}
