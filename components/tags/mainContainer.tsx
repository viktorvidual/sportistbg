export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 flex flex-col gap-6 p-5 justify-center">
      {children}
    </main>
  );
};
