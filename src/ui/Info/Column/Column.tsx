export default function Column({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-between py-2 text-sm first:pt-0 last:pb-0">
      {children}
    </div>
  );
}
