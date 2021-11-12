import { Link as RouterLink, LinkProps } from 'react-router-dom';

export function Link({ className, children, ...rest }: LinkProps): JSX.Element {
  return (
    <RouterLink className={className} {...rest}>
      {children}
    </RouterLink>
  );
}
