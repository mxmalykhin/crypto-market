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
      d="M10.3333 4.33337L14 8.00004M14 8.00004L10.3333 11.6667M14 8.00004H2"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
