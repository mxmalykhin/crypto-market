import chunk from 'lodash/chunk';

import Column from './Column';
import Property from './Property';
import Square from './Square';
import Value from './Value';

type TAreaProps = {
  data: Array<{
    property: string;
    value: string;
  }>;
};

export default function Area({
  children,
  data,
}: React.PropsWithChildren<TAreaProps>) {
  const dataChunks = chunk(data, 2);

  return (
    <div className="flex flex-col rounded-2xl border border-[#161616] bg-[#0A0A0A] p-[0.9375rem]">
      {children ? (
        <div className="mb-4 flex justify-between">{children}</div>
      ) : null}

      {dataChunks.map((data, index) => (
        <Column key={index}>
          {data.map(({ property, value }) => (
            <Square key={property}>
              <Property>{property}</Property>
              <Value>{value}</Value>
            </Square>
          ))}
        </Column>
      ))}
    </div>
  );
}
