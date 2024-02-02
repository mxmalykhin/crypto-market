import * as React from 'react';
import { SVGProps } from 'react';

import { cn } from '../styles';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 33"
    fill="none"
    {...props}
    className={cn('h-[1.8125rem] w-[1.8125rem]', props.className)}
  >
    <path
      fill="url(#a)"
      d="M26.863 12.281v11.41L14.17 31.017 1.472 23.691V9.032l12.699-7.333 9.754 5.634 1.472-.85L14.171 0 0 8.183V24.54l14.17 8.182 14.172-8.182V11.43l-1.48.85Z"
    />
    <path
      fill="url(#b)"
      d="M10.618 23.698H8.494v-7.12h7.079a2.548 2.548 0 0 0 2.331-3.507 2.428 2.428 0 0 0-.555-.811 2.456 2.456 0 0 0-1.777-.743H8.494V9.35h7.085a4.715 4.715 0 0 1 4.686 4.685 4.551 4.551 0 0 1-.828 2.655 4.614 4.614 0 0 1-2.038 1.67c-.82.26-1.675.39-2.534.383h-4.247v4.954Z"
    />
    <path
      fill="url(#c)"
      d="M20.216 23.521h-2.478l-1.91-3.333a8.073 8.073 0 0 0 2.215-.453l2.173 3.787Z"
    />
    <path
      fill="url(#d)"
      d="m25.383 9.91 1.465.814 1.466-.814V8.19l-1.466-.85-1.465.85v1.72Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={28.317}
        x2={-1.733}
        y1={8.192}
        y2={20.209}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C200FB" />
        <stop offset={0.49} stopColor="#3772FF" />
        <stop offset={0.49} stopColor="#3773FE" />
        <stop offset={1} stopColor="#5AC4BE" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={28.317}
        x2={-1.733}
        y1={8.192}
        y2={20.209}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C200FB" />
        <stop offset={0.49} stopColor="#3772FF" />
        <stop offset={0.49} stopColor="#3773FE" />
        <stop offset={1} stopColor="#5AC4BE" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={28.317}
        x2={-1.733}
        y1={8.192}
        y2={20.209}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C200FB" />
        <stop offset={0.49} stopColor="#3772FF" />
        <stop offset={0.49} stopColor="#3773FE" />
        <stop offset={1} stopColor="#5AC4BE" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={28.317}
        x2={-1.733}
        y1={8.192}
        y2={20.209}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C200FB" />
        <stop offset={0.49} stopColor="#3772FF" />
        <stop offset={0.49} stopColor="#3773FE" />
        <stop offset={1} stopColor="#5AC4BE" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgComponent;
