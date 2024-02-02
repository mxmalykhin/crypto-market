import Column from './Column';
import Property from './Property';
import Value from './Value';

type TAreaProps = {
  data: Array<{
    property: string;
    value?: string;
    value2?: string;
  }>;
};

export default function Area({
  children,
  data,
}: React.PropsWithChildren<TAreaProps>) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#161616] bg-[#0A0A0A] p-[0.9375rem]">
      {data.map(({ property, value, value2 }) => (
        <Column key={property}>
          <Property>{property}</Property>
          <Value>{value}</Value>
          {value2 ? <Value>{value2}</Value> : null}
        </Column>
      ))}

      {children}
    </div>
  );
}
