export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      {children}
    </article>
  );
}
