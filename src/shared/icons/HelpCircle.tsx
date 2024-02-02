import * as React from 'react';
import { SVGProps } from 'react';

import { cn } from '../styles';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn('h-[0.8125rem] w-3', props.className)}
  >
    <path
      d="M4.54492 5C4.66247 4.66584 4.8945 4.38406 5.1999 4.20457C5.5053 4.02508 5.86437 3.95947 6.21351 4.01936C6.56265 4.07925 6.87933 4.26076 7.10746 4.53177C7.33559 4.80277 7.46045 5.14576 7.45992 5.5C7.45992 6.5 5.95992 7 5.95992 7M5.99997 9H6.00497M11 6.5C11 9.26142 8.76142 11.5 6 11.5C3.23858 11.5 1 9.26142 1 6.5C1 3.73858 3.23858 1.5 6 1.5C8.76142 1.5 11 3.73858 11 6.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
