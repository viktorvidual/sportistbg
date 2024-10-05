export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4 justify-center">
      {children}
    </main>
  );
};
