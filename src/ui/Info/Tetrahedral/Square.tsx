export default function Square({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-6/12 flex-col justify-end pl-7 first:pl-0">
      {children}
    </div>
  );
}
