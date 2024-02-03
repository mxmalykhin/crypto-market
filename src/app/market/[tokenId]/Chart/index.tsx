'use client';

import { ColorType, CrosshairMode, createChart } from 'lightweight-charts';
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import SeriesTypes from './SeriesTypes';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const candlestickData = [
  {
    time: '2018-10-19',
    open: 180.34,
    high: 180.99,
    low: 178.57,
    close: 179.85,
  },
  {
    time: '2018-10-22',
    open: 180.82,
    high: 181.4,
    low: 177.56,
    close: 178.75,
  },
  {
    time: '2018-10-23',
    open: 175.77,
    high: 179.49,
    low: 175.44,
    close: 178.53,
  },
  {
    time: '2018-10-24',
    open: 178.58,
    high: 182.37,
    low: 176.31,
    close: 176.97,
  },
  {
    time: '2018-10-25',
    open: 177.52,
    high: 180.5,
    low: 176.83,
    close: 179.07,
  },
  {
    time: '2018-10-26',
    open: 176.88,
    high: 177.34,
    low: 170.91,
    close: 172.23,
  },
  {
    time: '2018-10-29',
    open: 173.74,
    high: 175.99,
    low: 170.95,
    close: 173.2,
  },
  {
    time: '2018-10-30',
    open: 173.16,
    high: 176.43,
    low: 172.64,
    close: 176.24,
  },
  {
    time: '2018-10-31',
    open: 177.98,
    high: 178.85,
    low: 175.59,
    close: 175.88,
  },
  {
    time: '2018-11-01',
    open: 176.84,
    high: 180.86,
    low: 175.9,
    close: 180.46,
  },
  {
    time: '2018-11-02',
    open: 182.47,
    high: 183.01,
    low: 177.39,
    close: 179.93,
  },
  {
    time: '2018-11-05',
    open: 181.02,
    high: 182.41,
    low: 179.3,
    close: 182.19,
  },
  {
    time: '2018-11-06',
    open: 181.93,
    high: 182.65,
    low: 180.05,
    close: 182.01,
  },
  {
    time: '2018-11-07',
    open: 183.79,
    high: 187.68,
    low: 182.06,
    close: 187.23,
  },
  {
    time: '2018-11-08',
    open: 187.13,
    high: 188.69,
    low: 185.72,
    close: 188.0,
  },
  {
    time: '2018-11-09',
    open: 188.32,
    high: 188.48,
    low: 184.96,
    close: 185.99,
  },
  {
    time: '2018-11-12',
    open: 185.23,
    high: 186.95,
    low: 179.02,
    close: 179.43,
  },
  {
    time: '2018-11-13',
    open: 177.3,
    high: 181.62,
    low: 172.85,
    close: 179.0,
  },
  {
    time: '2018-11-14',
    open: 182.61,
    high: 182.9,
    low: 179.15,
    close: 179.9,
  },
  {
    time: '2018-11-15',
    open: 179.01,
    high: 179.67,
    low: 173.61,
    close: 177.36,
  },
  {
    time: '2018-11-16',
    open: 173.99,
    high: 177.6,
    low: 173.51,
    close: 177.02,
  },
];

function generateLineData(
  count: number,
  startDate: string,
): { time: string; value: number }[] {
  const data = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < count; i++) {
    data.push({
      time: formatDate(currentDate),
      value: parseFloat((Math.random() * 100 + 100).toFixed(2)),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

function assertIsDivRef(
  ref: MutableRefObject<HTMLDivElement | null>,
): asserts ref is MutableRefObject<HTMLDivElement> {
  if (!ref || !('current' in ref) || !(ref.current instanceof HTMLDivElement)) {
    throw new Error(`Div ref expected`);
  }
}

type TChartProps = {
  data?: Array<{ time: string; value: number }>;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };

  seriesType?: 'line' | 'candle';
};

function Chart(props: TChartProps) {
  const {
    // data = initialData,
    colors: {
      // backgroundColor = '#1A1A1A',
      // lineColor = '#6E16E1',
      // textColor = 'black',
      // areaTopColor = '#AA6CFC',
      // areaBottomColor = '#000000',
    } = {},
    seriesType,
  } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    assertIsDivRef(chartContainerRef);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const candleChartStyle = {
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#000',
        },
        textColor: '#D1D4DC',
      },
      grid: {
        vertLines: {
          color: '#111212',
        },
        horzLines: {
          color: '#111212',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#282929',
      },
      timeScale: {
        borderColor: '#282929',
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    };

    const lineChartStyle = {
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#000',
        },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: {
          visible: !1,
        },
        horzLines: {
          visible: !1,
        },
      },
      watermark: {
        color: 'rgba(0, 0, 0, 0)',
      },
    };

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      ...(seriesType === 'candle' ? candleChartStyle : lineChartStyle),
    });

    chart.timeScale().fitContent();

    const series =
      seriesType === 'candle'
        ? chart.addCandlestickSeries()
        : chart.addAreaSeries({
            topColor: 'rgb(101, 31, 255, 0.56)',
            bottomColor: '#000000',
            lineColor: 'rgb(101, 31, 255)',
          });

    const updateData = () => {
      const newDate = new Date();
      newDate.setMinutes(newDate.getMinutes() - (newDate.getMinutes() % 5));

      if (seriesType === 'candle') {
        // const newData = generateCandlestickData(
        //   1,
        //   newDate.toISOString().split('T')[0] +
        //     ' ' +
        //     newDate.toTimeString().split(' ')[0],
        // )[0];
        // series.update(newData);
      }

      if (seriesType === 'line') {
        const newData = generateLineData(
          1,
          newDate.toISOString().split('T')[0] +
            ' ' +
            newDate.toTimeString().split(' ')[0],
        )[0];
        series.update(newData);
      }
    };

    if (seriesType === 'candle') {
      // const initialCandlestrickData = generateCandlestickData(10, '2020-01-01');
      series.setData(candlestickData || []);
    }

    if (seriesType === 'line') {
      const initialLineData = generateLineData(10, '2020-01-01');
      series.setData(initialLineData || []);
    }

    window.addEventListener('resize', handleResize);

    // const intervalId = setInterval(updateData, 1000);

    return () => {
      // clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [seriesType]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
}

export default function LaunchChart(props: TChartProps) {
  const [seriesType, setSeriesType] = React.useState<'line' | 'candle'>('line');

  const handleClickedSeriesType = useCallback((type: 'line' | 'candle') => {
    setSeriesType(type);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="z-5 relative h-full">
        <Chart {...props} seriesType={seriesType} />
      </div>

      <SeriesTypes type={seriesType} onClick={handleClickedSeriesType} />
    </div>
  );
}
