'use client';

import SimpleBar from 'simplebar-react';

import Header from '@/ui/Header';

import LaunchChart from '../Chart';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

export default function DesktopMarketTokenPage() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex max-h-full basis-full flex-col">
        <Header />

        <div className="mb-6 flex h-[calc(100%-5.5rem)] overflow-hidden">
          <div className="mr-4 h-full min-w-[18.5rem]">
            <SimpleBar className="h-full w-full">
              <LeftBar />
            </SimpleBar>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl bg-secondary-bg">
            <LaunchChart />
          </div>

          <div className="ml-4 h-full min-w-[18.5rem]">
            <SimpleBar className="h-full w-full">
              <RightBar />
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
}
