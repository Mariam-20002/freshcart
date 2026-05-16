'use client'

export default function error({ error }: { error: Error }) {
  return (
    <h2 className="my-5">
      {error.message}
    </h2>
  );
}