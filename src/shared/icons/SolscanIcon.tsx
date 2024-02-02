import * as React from 'react';
import { SVGProps } from 'react';

import { cn } from '../styles';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
    className={cn('h-4 w-4', props.className)}
  >
    <circle cx={8} cy={8} r={2.263} fill="#BC52DC" />
    <mask id="solscan_mask" fill="#fff">
      <path d="M12 12a5.656 5.656 0 1 0-1.172.899l-.848-1.47a3.96 3.96 0 1 1 .82-.629L12 12Z" />
    </mask>
    <path
      stroke="#69E5B7"
      strokeWidth={3.017}
      d="M12 12a5.656 5.656 0 1 0-1.172.899l-.848-1.47a3.96 3.96 0 1 1 .82-.629L12 12Z"
      mask="url(#solscan_mask)"
    />
  </svg>
);

export default SvgComponent;
