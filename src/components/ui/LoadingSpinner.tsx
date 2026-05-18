type Props = {
  size?: 'sm' | 'md';
};

export function LoadingSpinner({ size = 'md' }: Props) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <span
      className={`${sizeClass} inline-block animate-spin rounded-full border-2 border-white border-t-transparent`}
    />
  );
}
