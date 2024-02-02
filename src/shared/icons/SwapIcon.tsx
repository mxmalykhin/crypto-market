import * as React from 'react';
import { SVGProps } from 'react';

import { cn } from '../styles';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn('h-3 w-3', props.className)}
  >
    <path
      d="M11.3333 0.666687L14 3.33335L11.3333 6.00002"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7.33331V5.99998C2 5.29274 2.28095 4.61446 2.78105 4.11436C3.28115 3.61426 3.95942 3.33331 4.66667 3.33331H14"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66667 15.3333L2 12.6667L4.66667 10"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8.66669V10C14 10.7073 13.719 11.3855 13.219 11.8856C12.7189 12.3857 12.0406 12.6667 11.3333 12.6667H2"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
