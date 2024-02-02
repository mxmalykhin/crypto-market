import * as React from 'react';
import { SVGProps } from 'react';

import { cn } from '../styles';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn('h-4 w-4', props.className)}
  >
    <path
      d="M2.66666 4H13.3333M2.66666 8H13.3333M2.66666 12H13.3333"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
