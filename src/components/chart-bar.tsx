/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  LastPriceAnimationMode,
  LineType,
  UTCTimestamp,
  createChart,
} from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

// setInterval(() => {
//   console.log("new data");
//   data.push({ time: "2018-12-31", value: Math.random() * 100 });
// }, 1000);

const ADDR = '3FQqnC42Z8ykMxeRnYVj6sGoPmrhVURCG8ot7EPWLYjX';
const ADDR_TYPE = 'token';

function utc(str: string): UTCTimestamp {
  return Math.floor(Date.parse(str) / 1000) as UTCTimestamp;
}

function fewMinAgo(): UTCTimestamp {
  const d = new Date();
  d.setMinutes(d.getMinutes() - 30);
  return Math.floor(d.getTime() / 1000) as UTCTimestamp;
}

function now(): UTCTimestamp {
  const d = new Date();
  return Math.floor(d.getTime() / 1000) as UTCTimestamp;
}

const ChartComponent = () => {
  const [initialData, setInitialData] = useState<
    {
      time: UTCTimestamp;
      open: number;
      high: number;
      low: number;
      close: number;
    }[]
  >([]);

  useEffect(function fetchInitialData() {
    const fetchData = async () => {
      const data = await fetch(
        `https://public-api.birdeye.so/defi/ohlcv?address=${ADDR}&type=1m&time_from=${fewMinAgo()}&time_to=${now()}`,
        {
          headers: {
            'X-API-KEY': '5a95bed7a45d446da5d2b82658f14f3f',
            'x-chain': 'solana',
          },
        },
      ).then((it) => it.json());
      console.log(data);
      setInitialData(
        // @ts-ignore
        data.data.items.map((it) => ({
          time: it.unixTime,
          open: it.o,
          high: it.h,
          low: it.l,
          close: it.c,
        })),
      );
      return data;
    };

    fetchData();
  }, []);

  const series = useRef<any>(null);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (initialData.length === 0) return;
      const newData = await fetch(
        `https://public-api.birdeye.so/defi/ohlcv?address=${ADDR}&type=1m&time_from=${fewMinAgo()}&time_to=${now()}`,
        {
          headers: {
            'X-API-KEY': '5a95bed7a45d446da5d2b82658f14f3f',
            'x-chain': 'solana',
          },
        },
      ).then((it) => it.json());
      // const chartData = series.current.data();
      // const lastCandle = chartData[chartData.length - 1];
      // console.log(
      //   new Date(lastData.time * 1000),
      //   new Date(newData.data.updateUnixTime * 1000)
      // );
      const newCandle = newData.data.items[newData.data.items.length - 1];
      series.current.update({
        time: newCandle.unixTime,
        open: newCandle.o,
        high: newCandle.h,
        low: newCandle.l,
        close: newCandle.c,
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [initialData]);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current!, {
      autoSize: true,
      timeScale: {
        timeVisible: true,
        // secondsVisible: false,
        fixLeftEdge: true,
      },
      rightPriceScale: {
        // minimumWidth: 100,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      priceFormat: {
        precision: 9,
        minMove: 0.000000001,
      },
    });
    newSeries.setData(initialData);
    series.current = newSeries;

    // window.addEventListener("resize", handleResize);

    return () => {
      // window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [initialData]);

  return <div className="flex-1" ref={chartContainerRef} />;
};

export default ChartComponent;
