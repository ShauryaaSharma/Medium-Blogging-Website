const SIZE_CLASSES = {
  small: "w-6 h-6 text-xs",
  medium: "w-9 h-9 text-sm",
  big: "w-16 h-16 text-2xl",
} as const;

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: keyof typeof SIZE_CLASSES;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={`${SIZE_CLASSES[size]} shrink-0 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-medium select-none`}
    >
      {initial}
    </div>
  );
}
