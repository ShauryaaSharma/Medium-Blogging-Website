export function Quote() {
  return (
    <div className="h-screen bg-[#f4f3ec] flex flex-col justify-center px-16">
      <blockquote className="font-serif text-3xl leading-snug text-gray-900 max-w-lg">
        “The customer service I received was exceptional. The support team
        clearly cared about the effectiveness of their product and helped me
        significantly.”
      </blockquote>
      <div className="mt-6">
        <p className="font-semibold text-gray-900">Jules Winnfield</p>
        <p className="text-gray-600 text-sm">CEO, Acme Inc</p>
      </div>
    </div>
  );
}
