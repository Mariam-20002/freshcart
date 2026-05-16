import Checkout from "../Checkout";

export default async function page({
  params,
}: {
  params: Promise<{ cartId: string }>;
}) {
  const cartId = (await params).cartId;

  return <Checkout cartId={cartId}></Checkout>;
}
